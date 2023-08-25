import { Context } from "@grucloud/bau-ui/context";

import pageExample from "../pageExample.ts";

import calendarGridItem from "./calendar-grid-item.ts";

import calendarDefault from "./calendar-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./calendar-example-default.ts?raw";

export const calendarSpec = {
  title: "Calendar",
  package: "calendar",
  description: "The calendar component uses the native input date type.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",
  importStatement: `import calendar from "@grucloud/bau-ui/calendar";`,
  examples: [
    {
      title: "Default",
      description: "A simple calendar.",
      code: codeExampleDefault,
      createComponent: calendarDefault,
    },
  ],
  gridItem: calendarGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(calendarSpec);
};
