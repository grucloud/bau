//import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";

export default function (context: Context) {
  const { bau, stores, css } = context;
  const { span, header, div } = bau.tags;
  // const Button = button(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });

  const className = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > header {
      display: flex;
      gap: 2rem;
      align-items: center;
      & > .title {
        font-weight: 700;
        font-size: 1.3rem;
      }
    }
  `;

  const Details = ({ name }: any) => div(name);

  return function InfraDetailPage({ id }: any) {
    const { getByIdQuery } = stores.infra;
    getByIdQuery.run(id);
    return Form(
      { class: className },
      header(span({ class: "title" }, "Infrastructure Details")),
      () => getByIdQuery.data.val && Details(getByIdQuery.data.val),
      Spinner({
        visibility: getByIdQuery.loading,
      })
    );
  };
}
