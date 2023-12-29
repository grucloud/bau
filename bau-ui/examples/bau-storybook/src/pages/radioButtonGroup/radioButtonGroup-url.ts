import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { form, article, footer } = bau.tags;

  const radioButtonGroupName = "myRadio";

  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const search = new URLSearchParams(window.location.search);

    const oninput = ({ target }: { target: HTMLInputElement }) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(target.name);
      search.append(target.name, target.value);
      window.history.replaceState(
        "",
        "",
        `?${search.toString()}${window.location.hash}`
      );
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          oninput,
          name: radioButtonGroupName,
          value: search.get(radioButtonGroupName),
          radios: [
            { value: "one", Label: () => "One" },
            { value: "two", Label: () => "Two" },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
