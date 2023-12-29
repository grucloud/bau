import { Context } from "@grucloud/bau-ui/context";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { history } = window;
  const { form, article, footer } = bau.tags;

  const Toggle = toggle(context, { variant: "solid", color: "primary" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const toggleName = "toggle-url";

    const toggleValueFromUrl =
      new URLSearchParams(window.location.search).get(toggleName) == "pressed"
        ? "true"
        : "false";

    const onsubmit = (event: any) => {
      event.preventDefault();
      const buttonEl = document.getElementsByName(toggleName)[0];
      alert(buttonEl.getAttribute("aria-pressed"));
    };

    const onclick = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(toggleName);
      if (event.target.getAttribute("aria-pressed") == "true") {
        search.append(toggleName, "pressed");
      }
      history.replaceState(
        "",
        "",
        `?${search.toString()}${window.location.hash}`
      );
    };

    return form(
      { onsubmit },
      article(
        Toggle(
          {
            name: toggleName,
            "aria-pressed": toggleValueFromUrl,
            onclick,
          },
          "Toggle Me"
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
