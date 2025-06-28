import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.replace("/")} />
        <Appbar.Content title="Browser" />
      </Appbar.Header>
      <WebView source={{ uri: "" }} />
    </>
  );
}
