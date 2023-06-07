export const header = ({ tr, bau }) => {
  const { header, h1 } = bau.tags;
  return function Header() {
    return header(h1(tr("Landing Page")));
  };
};
