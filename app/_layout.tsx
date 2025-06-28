import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <MaterialCommunityIcons
              name="plus"
              size={32}
              onPress={() => router.navigate("/add-homepage")}
            />
          ),
        }}
      /> */}
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="browser" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-homepage"
        options={{ title: "Add", headerShown: false }}
      />
    </Stack>
  );
}
