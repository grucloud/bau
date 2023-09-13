import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import infraDetail from "../../components/infra/infraDetail";

export default function (context: Context) {
  const { bau, stores, css, window, config } = context;
  const { h1, header, div } = bau.tags;

  const ButtonEdit = button(context, { variant: "outline", color: "neutral" });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const InfraDetail = infraDetail(context);
  const Paper = paper(context);
  const LoadingButton = loadingButton(context);

  const className = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > header {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: space-between;
    }
  `;

  return function InfraDetailPage({ id }: any) {
    const { getByIdQuery, scanQuery } = stores.infra;
    getByIdQuery.run(id);

    const onclickEdit = () => {
      const detail = getByIdQuery.data.val;
      if (!detail) return;
      const state = {
        id: detail.id,
        name: detail.name,
        providerType: detail.providerType,
        providerName: detail.providerName,
        providerAuth: {
          ...detail.providerAuth,
          credentials: { ...detail.providerAuth?.credentials },
        },
      };
      window.history.pushState(
        state,
        "",
        `${detail.id}/edit/${detail.providerType}`
      );
    };

    const onclickScan = () => {
      scanQuery.run({ id });
    };

    return Paper(
      Form(
        { class: className },
        header(
          h1({ class: "title" }, "Infrastructure Details"),
          div(
            {
              class: css`
                display: flex;
                gap: 1rem;
              `,
            },
            LoadingButton(
              {
                variant: "solid",
                color: "primary",
                loading: scanQuery.loading,
                onclick: onclickScan,
              },
              "Scan"
            ),
            ButtonEdit({ onclick: onclickEdit }, "Edit"),
            ButtonDelete(
              { href: `${config.base}/infra/details/${id}/destroy` },
              "Remove"
            )
          )
        ),
        () => getByIdQuery.data.val && InfraDetail(getByIdQuery.data.val),
        Spinner({
          visibility: getByIdQuery.loading,
        })
      )
    );
  };
}
