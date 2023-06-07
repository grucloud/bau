export default function (context) {
  const { bau, tr } = context;
  const { div } = bau.tags;
  return () => div(tr("NotFound"));
}
