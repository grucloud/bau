import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, {
    tabDefs,
    class: css`
      & ul {
        justify-content: center;
        & li {
          flex-grow: 1;
        }
      }
    `,
  });

  return () => {
    return Tabs({});
  };
};
