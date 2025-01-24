import type { StarlightPlugin } from "@astrojs/starlight/types";
import { validateConfig, type StarlightUtilsConfig } from "./config";
import integration from "./integration";

function plugin(userConfig?: StarlightUtilsConfig): StarlightPlugin {
  const utilsConfig = validateConfig(userConfig);
  return {
    name: "starlight-utils",
    hooks: {
      setup({ addIntegration, config, updateConfig }) {
        addIntegration(integration(utilsConfig));
        const componentOverrides: typeof config.components = {};
        componentOverrides.Sidebar =
          "@befide/starlight-utils/components/Sidebar.astro";
        if (utilsConfig?.navLinks?.leading) {
          componentOverrides.SiteTitle =
            "@befide/starlight-utils/components/SiteTitle.astro";
        }
        updateConfig({
          components: {
            ...componentOverrides,
            ...config.components,
          },
        });
      },
    },
  };
}

export default plugin;
