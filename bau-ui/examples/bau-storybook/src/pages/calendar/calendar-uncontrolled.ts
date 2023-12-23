import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import calendar from "@grucloud/bau-ui/calendar";

export default (context: Context) => {
  const { bau } = context;
  const { form, footer, article, label } = bau.tags;

  const Calendar = calendar(context);
  const ButtonSubmit = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        label(
          "Start date:",
          Calendar({
            name: "start",
            min: "2023-01-01",
            max: "2024-12-31",
            required: true,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
