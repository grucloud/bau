import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import page from "../../components/page";
import orgDetailContent from "../../components/org/orgDetailContent";
import projectList from "../../components/project/projectList";
import gitCredentialList from "../../components/gitCredential/gitCredentialList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, h2, header } = bau.tags;
  const { getByIdQuery } = stores.org;

  const Page = page(context);
  const Form = form(context);
  const Spinner = spinner(context, { size: "lg" });
  const ButtonAdd = button(context, {
    color: "primary",
    variant: "solid",
  });
  const ButtonDelete = button(context, { variant: "outline", color: "danger" });

  const OrgDetailContent = orgDetailContent(context);
  const ProjectList = projectList(context);
  const GitCredentialList = gitCredentialList(context);

  return function OrgDetailPage({ org_id }: any) {
    getByIdQuery.run(org_id);
    stores.project.getAllByOrgQuery.run({ org_id });
    stores.gitCredential.getAllByOrgQuery.run({ org_id });

    return Page(
      Form(
        header(h1("Organisation Details")),
        () =>
          !getByIdQuery.loading.val && OrgDetailContent(getByIdQuery.data.val),
        header(
          h2("Projects"),
          ButtonAdd(
            {
              href: `${config.base}/org/${org_id}/projects/create`,
            },
            "+ New Project"
          )
        ),
        ProjectList(stores.project.getAllByOrgQuery),
        header(
          h2("Git Connections"),
          ButtonAdd(
            {
              href: `${config.base}/org/${org_id}/git_credential/create`,
            },
            "+ New Git Connections"
          )
        ),
        () =>
          !stores.gitCredential.getAllByOrgQuery.loading.val &&
          GitCredentialList(stores.gitCredential.getAllByOrgQuery.data.val),
        h2("Danger Zone"),
        ButtonDelete(
          { href: `${config.base}/org/${org_id}/destroy` },
          "Danger Zone"
        )
      ),
      Spinner({
        visibility: getByIdQuery.loading,
      })
    );
  };
}
