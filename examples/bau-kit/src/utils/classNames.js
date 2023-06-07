export function classNames(...cn) {
  return cn.filter((className) => className != undefined).join(" ");
}
