// import { BaseColor } from "@/config/base-colors";
// import { PresetTheme } from "@/config/preset-themes";
//
// type Config = {
//   style: "new-york";
//   theme: BaseColor["name"] | PresetTheme["name"];
//   radius: number;
//   packageManager: "npm" | "yarn" | "pnpm" | "bun";
//   translatedLanguage: ("vi" | "en")[];
// };
//
// const defaultConfig: Config = {
//   style: "new-york",
//   theme: "blue",
//   radius: 0.5,
//   packageManager: "bun",
//   translatedLanguage: ["vi"],
// };
//
// interface ConfigStore extends Config {
//   setConfig: (config: Config) => void;
// }
//
// const useConfigStore = create<ConfigStore>()(
//   persist(
//     (set) => ({
//       ...defaultConfig,
//       setConfig: (config: Config) => set(config),
//     }),
//     {
//       name: "config-v2",
//       storage: createJSONStorage(() => localStorage),
//       // Không persist phương thức setConfig
//       partialize: ({ setConfig: _, ...config }) => config,
//     },
//   ),
// );
//
// export function useConfig(): [Config, (config: Config) => void] {
//   const { setConfig, ...config } = useConfigStore();
//   return [config as Config, setConfig];
// }
