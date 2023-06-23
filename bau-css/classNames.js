export default function classNames(...cn) {
  return cn.filter((className) => className).join(" ");
}
