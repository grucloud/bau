import { State } from "@grucloud/bau";

import { Context } from "@grucloud/bau-ui/context";

type Query = {
  data: State<any>;
  error: State<any>;
  loading: State<boolean>;
  completed: State<boolean>;
  run: (...args: any[]) => any;
  reset: () => void;
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

    const reset = async () =>
      bau.batch(() => {
        error.val = "";
        loading.val = false;
        completed.val = false;
        data.val = options?.initialState ?? "";
      });

    const run = async (...args: any[]) => {
      if (loading.val) {
        return;
      }
      try {
        bau.batch(() => {
          error.val = "";
          loading.val = true;
          completed.val = false;
        });

        const result = await action(...args);

        bau.batch(() => {
          data.val = result;
          completed.val = true;
          loading.val = false;
        });
        return result;
      } catch (exception: any) {
        bau.batch(() => {
          error.val = exception.message;
          completed.val = true;
          loading.val = false;
        });

        throw exception;
      }
    };
    return { loading, data, error, completed, run, reset };
  };
}
