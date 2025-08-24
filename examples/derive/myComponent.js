export default function (context) {
  const { bau, css } = context;
  const { h1, button, article } = bau.tags;

  // Create reactive state (equivalent to Vue's ref)
  const msg = bau.state("");
  const count = bau.state(0);

  // Create derived state (equivalent to Vue's computed)
  const myComputedVal = bau.derive(() => {
    if (!msg.val) return "";
    if (!count.val) return "";
    return `${msg.val}, ${count.val}`;
  });

  // Define the click handler
  function onClick() {
    console.log("myComputedVal");
    if (!msg.val) {
      msg.val = "hello world";
      return;
    }
    count.val += 1;
  }

  return function myComponent() {
    return article(h1(myComputedVal), button({ onclick: onClick }, "Click"));
  };
}
