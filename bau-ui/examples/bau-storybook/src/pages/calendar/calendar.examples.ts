import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import calendarGridItem from "./calendar-grid-item.ts";

import calendarUncontrolled from "./calendar-uncontrolled.ts";
// @ts-ignore
import codeUncontrolled from "./calendar-uncontrolled.ts?raw";

import calendarControlled from "./calendar-controlled.ts";
// @ts-ignore
import codeControlled from "./calendar-controlled.ts?raw";

export const calendarSpec = {
  title: "Calendar",
  package: "calendar",
  description: "The calendar component uses the native input date type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",
  importStatement: `import calendar from "@grucloud/bau-ui/calendar";`,
  examples: [
    {
      title: "Uncontrolled Calendar",
      description: "A simple calendar.",
      code: codeUncontrolled,
      createComponent: calendarUncontrolled,
    },
    {
      title: "Controlled Calendar",
      description: "A controlled calendar.",
      code: codeControlled,
      createComponent: calendarControlled,
    },
  ],
  gridItem: calendarGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(calendarSpec);
};
