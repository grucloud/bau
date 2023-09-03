import { Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau } = context;

  return function UseQuery(action: any) {
    const isLoading = bau.state(false);
    const data = bau.state("");
    const error = bau.state("");

    const run = async (...args: any[]) => {
      try {
        isLoading.val = true;
        const result = await action(...args);
        data.val = result;
        return result;
      } catch (exception: any) {
        error.val = exception.message;
      } finally {
        isLoading.val = false;
      }
    };
    return { isLoading, data, error, run };
  };
}
