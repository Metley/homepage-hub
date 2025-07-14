import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

import { WebView } from "react-native-webview";

export default function BrowserScreen() {
  // const [name, setName] = useState<string>();
  // const [url, setUrl] = useState<string>();
  const { url, name } = useLocalSearchParams<{
    url: string;
    name: string;
  }>();
  const [navbar, setNavbar] = useState<boolean>();

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    fetchAppSetting();
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("inset-swipe");
    StatusBar.setHidden(true, "fade");
  }, []);

  const fetchAppSetting = async () => {
    try {
      const appSettingStorage = await AsyncStorage.getItem("setting");
      if (appSettingStorage !== null) {
        const appSetting = JSON.parse(appSettingStorage);
        setNavbar(appSetting.navBar);
      } else {
        console.log("Failed to retrieve setting");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {navbar && (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => router.replace("/")} />
            <Appbar.Content title={name} />
          </Appbar.Header>
        )}

        <WebView source={{ uri: url }} mixedContentMode="always" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
