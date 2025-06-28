import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <MaterialCommunityIcons
              name="plus"
              size={32}
              onPress={() => router.replace("/add-homepage")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="browser"
        options={{
          title: "Browser",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
