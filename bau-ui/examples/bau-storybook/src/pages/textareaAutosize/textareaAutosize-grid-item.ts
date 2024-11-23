import textareaAutosize from "@grucloud/bau-ui/textareaAutosize";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const TextareaAutosize = textareaAutosize(context, options);

  return (props: any) => TextareaAutosize({ ...props });
};
