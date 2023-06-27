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
  return div(h1("Fetch Data example"), () => {
    if (errorState.val) {
      return span(
        "Error Loading Data: status ",
        errorState.val.status,
        " status text: ",
        errorState.val.statusText
      );
    } else if (loadingState.val) {
      return "Loading";
    } else {
      return div("Star Count: ", dataState.val.stargazers_count);
    }
  });
};

document.getElementById("app").replaceChildren(App({}));
