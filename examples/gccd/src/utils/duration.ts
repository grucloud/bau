import rubico from "rubico";
const { pipe, all } = rubico;

import rubicox from "rubico/x";
const { append, unless, isEmpty } = rubicox;

const pluralize = (str: string) => (num: number) =>
  num > 0 ? `${num} ${str}${num > 1 ? "s" : ""}` : "";

export const duration = (updated_at: string, created_at: string) =>
  pipe([
    () =>
      (new Date(updated_at).valueOf() - new Date(created_at).valueOf()) / 1000,
    all({
      hours: pipe([
        (seconds: number) => Math.floor(seconds / 3600),
        pluralize("hour"),
        unless(isEmpty, append(" ")),
      ]),
      minutes: pipe([
        (seconds: number) => Math.floor((seconds % 3600) / 60),
        pluralize("minute"),
        unless(isEmpty, append(" ")),
      ]),
      remainingSeconds: pipe([
        (seconds: number) => Math.round(seconds % 60),
        pluralize("second"),
      ]),
    }),
    ({ hours, minutes, remainingSeconds }: any) =>
      `${hours}${minutes}${remainingSeconds}`,
  ])();
