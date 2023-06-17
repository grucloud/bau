import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, span } = bau.tags;

// State creation
const dataState = bau.state("");
const loadingState = bau.state(false);
const errorState = bau.state(false);

async function fetchJSON(request) {
  try {
    loadingState.val = true;
    const response = await fetch(request, {});
    if (response.ok) {
      const json = await response.json();
      dataState.val = json;
    } else {
      errorState.val = response;
    }
  } catch (error) {
    errorState.val = error;
  } finally {
    loadingState.val = false;
  }
}

const App = () => {
  // Dot not await here
  fetchJSON(`https://api.github.com/repos/grucloud/bau`);
  return div(
    h1("Fetch Data example"),
    bau.bind({
      deps: [dataState, loadingState, errorState],
      render: () => (data, loading, error) => {
        if (error) {
          return span(
            "Error Loading Data: status ",
            error.status,
            " status text: ",
            error.statusText
          );
        } else if (loading) {
          return "Loading";
        } else {
          return div("Star Count: ", data.stargazers_count);
        }
      },
    })
  );
};

document.getElementById("app").replaceChildren(App({}));
