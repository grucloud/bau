export const main = (context) => {
  const { tr, bau } = context;
  const { div, p, main, h1 } = bau.tags;

  return function Main() {
    return main(
      h1(tr("bau Kit Landing Page ")),
      p("This is an example of a minimal site ")
    );
  };
};
