// import { Context } from "@grucloud/bau-ui/context";
// import form from "@grucloud/bau-ui/form";
// import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
// import button from "@grucloud/bau-ui/button";

// import page from "../../components/page";
// import gitRepositoryCreateForm from "../../components/gitRepository/gitRepositoryCreateForm";
// const stepperName = "git_credential";

// export default function (context: Context) {
//   const { bau, window, css } = context;
//   const { h1, footer } = bau.tags;
//   const pushState = (url: string) => window.history.pushState("", "", url);

//   const Page = page(context);
//   const Form = form(context);
//   const Stepper = stepper(context, {
//     class: css`
//       gap: 1rem;
//       &.stepper {
//         flex-direction: row;
//         & > ul {
//           flex-direction: column;
//           & > li {
//             flex-direction: row;
//             gap: 0.5rem;
//             justify-content: space-around;
//           }
//         }
//       }
//     `,
//   });
//   const nextUrl = NextUrl(context, stepperName);

//   const ButtonPrevious = button(context, {
//     variant: "outline",
//     color: "primary",
//   });

//   const GitAuthenticationCreateFrom = gitAuthenticationCreateFrom(context);
//   const GitRepositoryCreateForm = gitRepositoryCreateForm(context);

//   return function GitCredentialCreatePage(props: any) {
//     const { org_id, project_id, workspace_id, onSubmitted } = props;

//     const stepperDefs: StepperPage[] = [
//       {
//         name: "provider",
//         Header: () => "Git provider",
//         Content: () => GitCredentialSelect({}),
//       },
//       {
//         name: "method",
//         Header: () => "Authentication Method",
//         Content: () =>
//           Form(
//             GitAuthenticationMethod(),
//             footer(ButtonPrevious({ href: nextUrl("provider") }, "Previous"))
//           ),
//       },
//       {
//         name: "setup",
//         Header: () => "Setup",
//         Content: ({ previousStep, nextStep }: any) =>
//           GitAuthenticationCreateFrom({
//             org_id,
//             previousHref: nextUrl(previousStep.name),
//             onSubmitted: ({ git_credential_id }: any) =>
//               pushState(nextUrl(nextStep.name, { git_credential_id })),
//           }),
//       },
//       {
//         name: "repo",
//         Header: () => "Repository",
//         Content: ({ previousStep }: any) =>
//           GitRepositoryCreateForm({
//             org_id,
//             project_id,
//             workspace_id,
//             // provider: new URLSearchParams(window.location.search).get(
//             //   "provider"
//             // ),
//             git_credential_id: new URLSearchParams(window.location.search).get(
//               "git_credential_id"
//             ),
//             previousHref: nextUrl(previousStep.name),
//             onSubmitted,
//           }),
//       },
//     ];

//     return Page(
//       h1("Create new Git credentials"),
//       Stepper({ stepperDefs, stepperName })
//     );
//   };
// }
