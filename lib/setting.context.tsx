import { Setting, ThemePreference } from "@/types/setting.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";

type SettingContextType = {
  setting: Setting | null;
  setSetting: (pref: Setting) => void;
  theme: MD3Theme;
  setThemePreference: (pref: ThemePreference) => void;
  isDark: boolean;
  getSetting: () => Promise<void | null>;
};

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [themePreference, setThemePreference] = useState("System");
  const colorScheme = useColorScheme();

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    try {
      const settingStorage = await AsyncStorage.getItem("setting");
      if (settingStorage !== null) {
        const setting = JSON.parse(settingStorage);
        setSetting(setting);
      } else {
        const defaultSetting: Setting = {
          theme: "System",
          navBar: false,
          viewStyle: "App",
          sortPrefrence: "CUSTOM",
        };
        setSetting(defaultSetting);
        await AsyncStorage.setItem("setting", JSON.stringify(defaultSetting));
      }
    } catch (error) {
      const defaultSetting: Setting = {
        theme: "System",
        navBar: false,
        viewStyle: "App",
        sortPrefrence: "CUSTOM",
      };
      setSetting(defaultSetting);
      await AsyncStorage.setItem("setting", JSON.stringify(defaultSetting));
    }
  };

  const resolvedTheme =
    themePreference.toLocaleLowerCase() === "system"
      ? colorScheme
      : themePreference;

  const isDark = resolvedTheme?.toLocaleLowerCase() === "dark";

  const theme = useMemo(
    () => (isDark ? MD3DarkTheme : MD3LightTheme),
    [isDark]
  );

  return (
    <SettingContext.Provider
      value={{
        setting,
        setSetting,
        getSetting,
        theme,
        isDark,
        setThemePreference,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export function useSettingContext() {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error("useSetting must be inside of the SettingProvider");
  }

  return context;
}
