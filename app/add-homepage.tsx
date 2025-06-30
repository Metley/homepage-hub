import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";

export default function Index() {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [errorNameMessage, setErrorNameMessage] = useState<string>("");
  const [errorUrlMessage, setErrorUrlMessage] = useState<string>("");

  const router = useRouter();

  const handleChangeName = (input: string) => {
    setName(input);
    if (input.length <= 0) {
      setErrorNameMessage("Name field required");
    } else {
      setErrorNameMessage("");
    }
  };

  const handleChangeUrl = (input: string) => {
    setUrl(input);
    if (input.slice(0, 7) === "http://" || input.slice(0, 8) === "https://") {
      setErrorUrlMessage("");
    } else {
      setErrorUrlMessage("URL must start with http:// or https://");
    }
  };

  const handleAddHomepage = async () => {
    const addObject = { name, url };

    try {
      const currentList = JSON.parse(
        (await AsyncStorage.getItem("homepage-list")) || "[]"
      );
      const newList = [...currentList, addObject];
      await AsyncStorage.setItem("homepage-list", JSON.stringify(newList));
    } catch (error) {
      console.error(error);
    }

    router.replace("/");
  };
  const handleCancelHomepage = () => {
    router.replace("/");
  };

  const handleFetchImage = async () => {
    const response = await fetch(url.toLowerCase() + "/favicon.ico");

    if (response.headers.get("content-type") === "image/x-icon") {
      setImage(url.toLowerCase() + "/favicon.ico");
    } else {
      setImage(
        "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png&color=000000"
      );
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add Homepage" />
      </Appbar.Header>
      <View style={styles.imageContainer}>
        <Image src={image} width={100} height={100} style={styles.image} />
      </View>
      <View style={styles.container}>
        <TextInput
          label="Name"
          onChangeText={(input) => handleChangeName(input)}
          style={styles.input}
        />
        <TextInput
          label="URL"
          placeholder="http://"
          onChangeText={(input) => handleChangeUrl(input.toLowerCase())}
          autoCapitalize="none"
        />
        <HelperText type="error">
          {errorNameMessage} {errorUrlMessage}
        </HelperText>
        <View>
          <Button
            mode="contained"
            onPress={handleAddHomepage}
            disabled={errorNameMessage.length > 0 || errorUrlMessage.length > 0}
            style={styles.button}
          >
            Add
          </Button>
          <Button
            mode="outlined"
            onPress={handleCancelHomepage}
            style={styles.button}
          >
            Cancel
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  imageContainer: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
});
