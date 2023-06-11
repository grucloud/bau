import component from "./component";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;

  const Component = component(context);

  return () => section(h2(tr("Component Examples")), h3("Info"));
};
