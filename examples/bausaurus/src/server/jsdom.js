import jsdom from "jsdom";

export default function createJSDOM() {
  const { JSDOM } = jsdom;
  // See https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("error", (error) => {
    console.log(error);
  });
  return new JSDOM(``, { virtualConsole });
}
