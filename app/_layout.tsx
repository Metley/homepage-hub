import { SettingProvider } from "@/lib/setting.context";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

const AppContent = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="browser" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-homepage"
          options={{ title: "Add", headerShown: false }}
        />
        <Stack.Screen
          name="setting"
          options={{ title: "Setting", headerShown: false }}
        />
      </Stack>
    </View>
  );
};

export default function RootLayout() {
  const theme = useColorScheme() === "dark" ? MD3DarkTheme : MD3LightTheme;
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView>
        <SettingProvider>
          <AppContent />
        </SettingProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
