function getRenderer() {
  return {
    name: "@grucloud/bau-astro",
    clientEntrypoint: "@grucloud/bau-astro/client.js",
    serverEntrypoint: "@grucloud/bau-astro/server.js",
  };
}

async function getViteConfiguration(_options) {
  const config = {
    optimizeDeps: {
      include: ["@grucloud/bau-astro/client.js", "@grucloud/bau"],
      exclude: ["@grucloud/bau-astro/server.js", "jsdom"],
    },
    plugins: [],
    ssr: {
      external: [],
      noExternal: [],
    },
  };
  return config;
}
export default function () {
  return {
    name: "@grucloud/bau-astro",
    hooks: {
      "astro:config:setup": async ({
        command,
        addRenderer,
        updateConfig,
        config,
      }) => {
        addRenderer(getRenderer());
        updateConfig({ vite: await getViteConfiguration() });
      },
    },
  };
}
