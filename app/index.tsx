import { HomePage } from "@/types/homepage.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
import { Appbar, Card } from "react-native-paper";

export default function Index() {
  const [homepageList, setHomepageList] = useState<HomePage[]>();
  const router = useRouter();
  const cardGap = 16;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  useEffect(() => {
    fetchHomepages();
  }, []);

  const fetchHomepages = async () => {
    try {
      const currentList = JSON.parse(
        (await AsyncStorage.getItem("homepage-list")) || "[]"
      );
      setHomepageList(currentList);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = (url: string) => {
    if (url.length > 0) {
      return "http://" + url.toLowerCase() + "/favicon.ico";
    } else {
      return "https://img.icons8.com/?size=100&id=73&format=png&color=000000";
    }
  };

  const resetDatabase = async () => {
    await AsyncStorage.clear();
    await fetchHomepages();
  };

  const Item = ({ homepage }) => (
    <Card
      style={styles.card}
      onPress={() => {
        console.log(homepage.url + "/favicon.ico");
      }}
    >
      <Image
        src={getImage(homepage.url)}
        height={48}
        width={48}
        style={styles.image}
      />
      <Card.Title style={styles.title} title={homepage.name} />
    </Card>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="plus"
          onPress={() => router.navigate("/add-homepage")}
        />
      </Appbar.Header>

      <FlatList
        numColumns={2}
        data={homepageList}
        renderItem={({ item }) => <Item homepage={item} />}
        contentContainerStyle={{}}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexWrap: "wrap",
  },
  card: {
    marginBottom: 18,
    margin: 10,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: "40%",
    height: "auto",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    alignItems: "center",
  },
});
