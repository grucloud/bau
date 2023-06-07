export const header = ({ tr, bau }) => {
  const { header, h1 } = bau.tags;
  return () => header(h1(tr("Admin")));
};
