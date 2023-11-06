import { Context } from "@grucloud/bau-ui/context";

import form from "@grucloud/bau-ui/form";
import button from "@grucloud/bau-ui/button";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";

import page from "../../components/page";
import orgDetailContent from "../../components/org/orgDetailContent";
import projectList from "../../components/project/projectList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h2, div } = bau.tags;
  const { getByIdQuery } = stores.org;

  const Page = page(context);
  const Form = form(context);
  const ButtonAdd = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const OrgDetailContent = orgDetailContent(context);
  const ProjectList = projectList(context);

  return function OrgDetailPage(props: any) {
    const { org_id } = props;
    getByIdQuery.run(org_id);
    stores.project.getAllByOrgQuery.run({ org_id });

    const tabDefs: Tabs = [
      {
        name: "summary",
        Header: () => "Organisation Details",
        Content: () =>
          div(
            OrgDetailContent(getByIdQuery),
            h2("Danger Zone"),
            div(
              ButtonDelete(
                { href: `${config.base}/org/${org_id}/destroy` },
                "Danger Zone"
              )
            )
          ),
      },
      {
        name: "projects",
        Header: () => "Projects",
        Content: () =>
          div(
            ButtonAdd(
              {
                href: `${config.base}/org/${org_id}/projects/create`,
              },
              "+ New Project"
            ),
            div(ProjectList(stores.project.getAllByOrgQuery))
          ),
      },
    ];

    const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

    return Page(Form(Tabs(props)));
  };
}
