import { State } from "@grucloud/bau";

import { Context } from "@grucloud/bau-ui/context";

type Query = {
  data: State<any>;
  error: State<any>;
  loading: State<boolean>;
  completed: State<boolean>;
  run: (...args: any[]) => any;
};

export default function (context: Context) {
  const { bau } = context;

  type UseQueryOptions = {
    initialState: any;
  };

  return function UseQuery(action: any, options?: UseQueryOptions): Query {
    const loading = bau.state(false);
    const completed = bau.state(false);
    const data = bau.state(options?.initialState ?? "");
    const error = bau.state("");

    const run = async (...args: any[]) => {
      if (loading.val) {
        return;
      }
      return bau.batch(async () => {
        try {
          error.val = "";
          loading.val = true;
          completed.val = false;
          const result = await action(...args);
          data.val = result;
          return result;
        } catch (exception: any) {
          error.val = exception.message;
          throw exception;
        } finally {
          completed.val = true;
          loading.val = false;
        }
      });
    };
    return { loading, data, error, completed, run };
  };
}
