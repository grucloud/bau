import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, label } = bau.tags;

  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const calendarState = bau.state("2023-08-08");

  const Calendar = calendar(context);
  const CalendarCutom = calendar(context, {
    class: css`
      background-color: lightseagreen;
    `,
  });

  return () =>
    section(
      { id: "calendar" },
      h2(tr("Calendar")),
      div("Date: ", calendarState),
      h3("Basic Calendar"),
      Container(
        label(
          { for: "start" },
          "Start date:",
          Calendar({
            id: "start",
            value: calendarState.val,
            oninput: (event: any) => {
              calendarState.val = event.target.value;
            },
          })
        )
      ),
      h3("Calendar min and max"),
      Container(
        label(
          "End date:",
          Calendar({
            min: "2023-01-01",
            max: "2023-12-31",
            value: calendarState.val,
            oninput: (event: any) => {
              calendarState.val = event.target.value;
            },
          })
        )
      ),
      h3("Calendar custom"),
      Container(CalendarCutom({}))
    );
};
