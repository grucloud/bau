export const useQuery = ({ bau, run }) => {
  const isLoading = bau.state(false);
  const data = bau.state();
  const error = bau.state();

  const runAction = async (...args) => {
    try {
      isLoading.val = true;
      const result = await run(...args);
      data.val = result;
    } catch (e) {
      error.val = e;
    } finally {
      isLoading.val = false;
    }
  };
  // TODO
  runAction();
  return { isLoading, data, error, runAction };
};
