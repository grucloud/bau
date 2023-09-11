import rubico from "rubico";
const { get } = rubico;
import formatDistance from "date-fns/formatDistance";

import { type Context } from "@grucloud/bau-ui/context";
import chip from "@grucloud/bau-ui/chip";
import button from "@grucloud/bau-ui/button";
import tableContainer from "@grucloud/bau-ui/tableContainer";

import providerLogo from "../providerLogo";
import resourceTable from "./resourceTable";

export default function (context: Context) {
  const { bau, css } = context;
  const { div, section, table, tbody, th, tr, td, span } = bau.tags;

  const Chip = chip(context, { size: "sm" });

  const className = css`
    & th {
      text-align: left;
    }
  `;

  const TableContainer = tableContainer(context);

  const ProviderLogo = providerLogo(context);
  const Button = button(context);

  const ResourceTable = resourceTable(context);

  return function InfraDetail(props: any) {
    const { name, providerName, providerAuth, gitRepository, Jobs } = props;
    const lastJob = Jobs[0];
    const lastUpdated = get("updatedAt")(lastJob);
    const svgContent = get("result.svg")(lastJob);
    const lives = get("result.list.result.results[0].results")(lastJob);

    const svgContainerEl = div({});
    svgContainerEl.innerHTML = svgContent;

    return section(
      {
        class: className,
      },
      TableContainer(
        table(
          tbody(
            tr(th("Name"), td(name)), //
            tr(th("Provider"), td(ProviderLogo({ providerName }))),
            tr(th("Region"), td(Chip(providerAuth.AWS_REGION))),
            tr(
              th("Git Repository"),
              td(
                gitRepository
                  ? Button({
                      target: "_blank",
                      href: gitRepository.url,
                      label: "Open GitHub",
                    })
                  : "Not assigned"
              )
            ),
            tr(
              th("Last Scan"),
              td(
                lastUpdated
                  ? span(
                      formatDistance(
                        new Date(get("Jobs[0].updatedAt")(props)),
                        new Date()
                      ),
                      " ago"
                    )
                  : "Not scanned yet"
              )
            )
          )
        )
      ),
      lives && ResourceTable(lives),
      svgContent && svgContainerEl
    );
  };
}
