export default function ({ bau }) {
  const { div, span } = bau.tags;

  return function App() {
    return div("Main");
  };
}
