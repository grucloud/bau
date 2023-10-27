const config = {
  general: {
    title: "GruCloud",
    base: "",
    loginPath: "/login",
    routeAfterLogin: "/",
    description: "",
    apiUrl: "/api/v1/",
    socialAuth: ["github", "gitlab", "google", "facebook"],
    //    socialAuth: ["github", "facebook", "google", "gitlab"],
    engine: "docker",
    wsUrl: (window: Window) => `ws://${window.location.hostname}:9000/ws`,
  },
  development: {
    env: "development",
    disableUsernamePasswordAuth: true,
  },
  production: {
    env: "production",
    disableUsernamePasswordAuth: true,
    engine: "ecs",
    wsUrl: (window: Window) => `wss://${window.location.host}/ws`,
  },
};

// @ts-ignore
export default { ...config.general, ...config[process.env.NODE_ENV] };
