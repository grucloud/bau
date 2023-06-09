export const asyncView = ({ context, getModule, Loader }) => {
  const { tr, bau } = context;
  const { div } = bau.tags;
  const loading = bau.state(false);
  const error = bau.state("");
  const view = bau.state("");

  const fetchModule = async () => {
    try {
      loading.val = true;
      const module = await getModule();
      view.val = module.default(context);
    } catch (e) {
      error.val = tr("Error loading");
    } finally {
      loading.val = false;
    }
  };

  return function AsyncView() {
    fetchModule();
    return div(
      () => (loading.val ? Loader() : ""),
      error,
      (view) => (view.val ? view.val() : "")
    );
  };
};
