const config = {
  general: {
    title: "GruCloud",
    base: "",
    loginPath: "/login",
    routeAfterLogin: "/",
    description: "",
    apiUrl: "/api/v1/",
    socialAuth: ["github", "facebook"],
    //    socialAuth: ["github", "facebook", "google"],
  },
  development: {
    env: "development",
    disableUsernamePasswordAuth: false,
  },
  production: {
    env: "production",
    disableUsernamePasswordAuth: true,
  },
};

// @ts-ignore
export default { ...config.general, ...config[process.env.NODE_ENV] };
