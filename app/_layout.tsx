import { SettingProvider, useSettingContext } from "@/lib/setting.context";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, useTheme } from "react-native-paper";
const AppContent = () => {
  const router = useRouter();
  const themeTest = useTheme();

  const { theme } = useSettingContext();

  return (
    <PaperProvider theme={theme}>
      <View
        style={[
          styles.container,
          { backgroundColor: themeTest.colors.background },
        ]}
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
    </PaperProvider>
  );
};

function RouteSetting({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <SettingProvider>
      <GestureHandlerRootView>
        <RouteSetting>
          <AppContent />
        </RouteSetting>
      </GestureHandlerRootView>
    </SettingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
