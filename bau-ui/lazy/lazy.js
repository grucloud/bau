import spinner from "../spinner";
import alert from "../alert";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const Spinner = spinner(context, { size: "lg" });
  const Alert = alert(context, { color: "danger" });

  const loadingDefault = () =>
    div(
      {
        class: css`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `,
      },
      Spinner({ visibility: true })
    );

  const errorDefault = (error) => Alert(error.message);

  return function Lazy({
    getModule,
    loading = loadingDefault,
    error = errorDefault,
    props = {},
  }) {
    const componentState = bau.state(undefined);
    const loadingState = bau.state(true);
    const errorState = bau.state(false);

    getModule()
      .then((module) => {
        componentState.val = module.default(context);
        loadingState.val = false;
      })
      .catch((error) => {
        errorState.val = error.message;
      });

    return div(() => {
      if (errorState.val) {
        return error({ message: errorState.val });
      }
      if (loadingState.val) {
        return loading();
      }
      if (componentState.val) {
        return componentState.val(props);
      }
    });
  };
}
