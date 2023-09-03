import { Context } from "@grucloud/bau-ui/context";
import infraList from "../components/infraList";

export default function (context: Context) {
  const { bau, stores } = context;
  const { section } = bau.tags;

  const InfraList = infraList(context);

  const onclickItem =
    ({ id }: any) =>
    () => {
      debugger;
      console.log("onclickItem", id);
    };

  return function Main({}) {
    stores.infra.getAll();
    return section({}, InfraList({ onclickItem }));
  };
}
