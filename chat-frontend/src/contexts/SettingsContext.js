// provider === component
import { createContext } from "react";
import { defaultSettings } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";
import getColorPresets, {
  colorPresets,
} from "../utils/getColorPresets";

const initialState = {
  ...defaultSettings,

  onToggleMode: () => {},
  onChangeMode: () => {},

};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
  });

  

  // Mode

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };


  return (
    <SettingsContext.Provider
      value={{
        ...settings, // Mode
        onToggleMode,
        
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),

      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext};

export default SettingsProvider;