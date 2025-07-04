import { HomePage } from "@/types/homepage.context";
import { Setting, SortPrefrence } from "@/types/setting.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Appbar,
  Avatar,
  Card,
  Divider,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";

export default function Index() {
  const [homepageList, setHomepageList] = useState<HomePage[]>([]);
  const [appSetting, setAppSetting] = useState<Setting>();

  const [sortType, setSortType] = useState<SortPrefrence>("CUSTOM");
  const [viewStyle, setViewStyle] = useState<string>("App");

  const router = useRouter();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const sortTypeList: string[] = [
    "ADDED - ASCENDING",
    "ADDED - DESCENDING",
    "NAME - ASCENDING",
    "NAME - DESCENDING",
    "CUSTOM",
  ];

  useEffect(() => {
    fetchHomepages();
    fetchAppSetting();
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

  const fetchAppSetting = async () => {
    try {
      const appSettingStorage = await AsyncStorage.getItem("setting");
      if (appSettingStorage !== null) {
        const appSetting = JSON.parse(appSettingStorage);
        setSortType(appSetting.sortPrefrence);
        setViewStyle(appSetting.viewStyle);
        setAppSetting(appSetting);
      } else {
        console.log("Failed to retrieve setting");
      }
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

  const handleFetchImage = async (url: string) => {
    const response = await fetch(url.toLowerCase() + "/favicon.ico");

    if (response.headers.get("content-type") === "image/x-icon") {
      return url.toLowerCase() + "/favicon.ico";
    } else {
      return "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png&color=000000";
    }
  };

  const resetDatabase = async () => {
    await AsyncStorage.clear();
    await fetchHomepages();
  };

  const Item = ({ homepage }: { homepage: HomePage }) => (
    <Card
      style={styles.card}
      onPress={() => {
        console.log(homepage.image);
      }}
    >
      <Image src={homepage.image} height={48} width={48} style={styles.image} />
      <Card.Title
        style={styles.title}
        title={homepage.name}
        left={(props) => (
          <Image
            {...props}
            src={getImage(homepage.url)}
            height={48}
            width={48}
            style={styles.image}
          />
        )}
      />
    </Card>
  );

  const handleSortTypeChange = (type: string) => {
    switch (type) {
      case "ADDED - ASCENDING":
        return function (a: HomePage, b: HomePage) {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        };
      case "ADDED - DESCENDING":
        return function (a: HomePage, b: HomePage) {
          return (
            (new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()) *
            -1
          );
        };
      case "NAME - ASCENDING":
        return function (a: HomePage, b: HomePage) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        };
      case "NAME - DESCENDING":
        return function (a: HomePage, b: HomePage) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        };
      case "CUSTOM":
        return function (a: HomePage, b: HomePage) {
          return a.custom_position - b.custom_position;
        };
      default:
        break;
    }
  };

  const sortedHomepageList = homepageList?.sort(handleSortTypeChange(sortType));

  const HomeCard = ({ homepage }: { homepage: HomePage }) => (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/browser",
          params: { url: homepage.url, name: homepage.name },
        })
      }
      style={styles.card}
    >
      {homepage.image !==
      "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png&color=000000" ? (
        <Avatar.Image
          style={{ backgroundColor: theme.colors.background }}
          size={48}
          source={{ uri: homepage.image }}
        />
      ) : (
        <Avatar.Text
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.outline,
            borderWidth: 1,
          }}
          size={48}
          label={homepage.name[0]}
        />
      )}

      <Text numberOfLines={1} style={styles.title}>
        {homepage.name}
      </Text>
    </TouchableOpacity>
  );

  const HomeCardListItem = ({ homepage }: { homepage: HomePage }) => (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/browser",
          params: { url: homepage.url, name: homepage.name },
        })
      }
      style={styles.cardListItem}
    >
      {homepage.image !==
      "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png&color=000000" ? (
        <Avatar.Image
          style={{ backgroundColor: theme.colors.background }}
          size={48}
          source={{ uri: homepage.image }}
        />
      ) : (
        <Avatar.Text
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.outline,
            borderWidth: 1,
          }}
          size={48}
          label={homepage.name[0]}
        />
      )}

      <Text numberOfLines={1} style={styles.titleListItem}>
        {homepage.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header>
        <Appbar.Action icon="cog" onPress={() => router.navigate("/setting")} />
        <Appbar.Content title="Home" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="sort-variant" onPress={openMenu} />}
          >
            <Menu.Item
              leadingIcon="sort"
              onPress={() => {
                setSortType("CUSTOM");
                closeMenu();
              }}
              title="Custom"
            />
            <Divider />

            <Menu.Item
              leadingIcon="sort-ascending"
              onPress={() => {
                setSortType("ADDED - ASCENDING");
                closeMenu();
              }}
              title="Date Added"
            />
            <Menu.Item
              leadingIcon="sort-descending"
              onPress={() => {
                setSortType("ADDED - DESCENDING");
                closeMenu();
              }}
              title="Date Added"
            />
            <Divider />
            <Menu.Item
              leadingIcon="sort-alphabetical-ascending"
              onPress={() => {
                setSortType("NAME - ASCENDING");
                closeMenu();
              }}
              title="Name"
            />
            <Menu.Item
              leadingIcon="sort-alphabetical-descending"
              onPress={() => {
                setSortType("NAME - DESCENDING");
                closeMenu();
              }}
              title="Name"
            />
          </Menu>
        </View>

        <Appbar.Action
          icon="plus"
          onPress={() => router.navigate("/add-homepage")}
        />
      </Appbar.Header>

      <View style={{}}>
        {viewStyle === "App" ? (
          <FlatList
            numColumns={4}
            data={sortedHomepageList}
            renderItem={({ item }) => <HomeCard homepage={item} />}
            contentContainerStyle={{}}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            scrollEnabled={true}
          />
        ) : (
          <ScrollView>
            {sortedHomepageList.map((item, index) => (
              <HomeCardListItem key={index} homepage={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    width: "24%",
    height: 75,
  },
  cardListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  image: {
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginTop: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleListItem: {
    marginLeft: 8,
  },
});
