import { State } from "@grucloud/bau";

import { Context } from "@grucloud/bau-ui/context";

type Query = {
  data: State<any>;
  error: State<any>;
  loading: State<boolean>;
  run: (...args: any[]) => any;
};

export default function (context: Context) {
  const { bau } = context;

  return function UseQuery(action: any): Query {
    const loading = bau.state(false);
    const data = bau.state("");
    const error = bau.state("");

    const run = async (...args: any[]) => {
      try {
        loading.val = true;
        const result = await action(...args);
        data.val = result;
        return result;
      } catch (exception: any) {
        error.val = exception.message;
      } finally {
        loading.val = false;
      }
    };
    return { loading, data, error, run };
  };
}
