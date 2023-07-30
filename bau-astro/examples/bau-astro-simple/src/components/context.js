import Bau from "@grucloud/bau/bau.js";

const getWindow = async () => {
  if (typeof window == "undefined") {
    const jsdom = await import("jsdom");
    const { JSDOM } = jsdom.default;
    // See https://github.com/jsdom/jsdom/issues/2230
    const virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", (error) => {
      console.log(error);
    });
    const { window } = new JSDOM(``, {
      virtualConsole,
      pretendToBeVisual: true,
    });
    return window;
  } else {
    return window;
  }
};

const context = {
  bau: Bau({ window: await getWindow() }),
};
export default context;
