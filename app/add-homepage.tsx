import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

export default function Index() {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const router = useRouter();

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

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="title" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput label="Name" onChangeText={setName} style={styles.input} />
        <TextInput
          label="URL"
          placeholder="http://"
          onChangeText={setUrl}
          style={styles.input}
        />
        <View>
          <Button mode="contained" onPress={handleAddHomepage}>
            Add
          </Button>
          <Button mode="outlined" onPress={handleCancelHomepage}>
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
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
});
