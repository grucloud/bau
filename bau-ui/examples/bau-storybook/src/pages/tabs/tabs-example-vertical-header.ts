import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, {
    tabDefs,
    class: css`
      flex-direction: row;
      & ul {
        border-right: 2px solid var(--color-primary);
        border-bottom: none;
        margin-right: 1rem;
        flex-direction: column;
        align-items: flex-start;
      }
    `,
  });

  return () => Tabs({});
};
