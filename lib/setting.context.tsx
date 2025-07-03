import { Setting } from "@/types/setting.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type SettingContextType = {
  setting: Setting | null;
};

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [setting, setSetting] = useState<Setting | null>(null);

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
        };
        setSetting(defaultSetting);
        await AsyncStorage.setItem("setting", JSON.stringify(defaultSetting));
      }
    } catch (error) {
      const defaultSetting: Setting = {
        theme: "System",
        navBar: false,
        viewStyle: "App",
      };
      setSetting(defaultSetting);
      await AsyncStorage.setItem("setting", JSON.stringify(defaultSetting));
    }
  };

  return (
    <SettingContext.Provider value={{ setting }}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error("useSetting must be inside of the SettingProvider");
  }

  return context;
}
