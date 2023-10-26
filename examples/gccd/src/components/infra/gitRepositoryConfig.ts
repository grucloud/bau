// import { Context } from "@grucloud/bau-ui/context";
// import form from "@grucloud/bau-ui/form";
// import input from "@grucloud/bau-ui/input";
// import autocomplete from "@grucloud/bau-ui/autocomplete";
// import radioButton from "@grucloud/bau-ui/radioButton";

// import buttonsFooter from "./buttonsFooter";
// import buttonPrevious from "./buttonPrevious";
// import buttonNext from "./buttonNext";
// // TODO to delete
// export default (context: Context) => {
//   const { bau, stores, css } = context;
//   const { section, h1, header, p, label, div, fieldset, legend, ol, li } =
//     bau.tags;
//   const { listRepoQuery, listBranchesQuery } = stores.gitHub;

//   const Form = form(context);
//   const Autocomplete = autocomplete(context, { variant: "outline" });
//   const Input = input(context);
//   const RadioButton = radioButton(context);

//   const ButtonPrevious = buttonPrevious(context);
//   const ButtonNext = buttonNext(context);
//   const ButtonsFooter = buttonsFooter(context);

//   const checkedGitProviderState = bau.state("github");
//   const oninput = (event: any) => {
//     checkedGitProviderState.val = event.target.id;
//   };
//   const className = css`
//     & ol {
//       padding-left: 0;
//       > li {
//         margin-bottom: 1rem;
//       }
//     }
//     & label {
//       display: flex;
//     }
//   `;
//   const GitProvider = () =>
//     fieldset(
//       {
//         class: css`
//           display: inline-flex;
//           flex-direction: row;
//           gap: 1rem;
//           border: 1px solid var(--color-emphasis-500);
//           & label {
//             flex-direction: row;
//           }
//         `,
//       },
//       legend("Git Provider"),
//       label(
//         "GitHub",
//         RadioButton({
//           id: "github",
//           name: "gitProvider",
//           checked: true,
//           value: checkedGitProviderState,
//           oninput,
//         })
//       ),
//       label(
//         "Other Git Provider",
//         RadioButton({
//           id: "other",
//           name: "gitProvider",
//           value: checkedGitProviderState,
//           oninput,
//         })
//       )
//     );

//   const GitRepositoryUrlGitHub = ({ username }: any) =>
//     label("Repository URL", () =>
//       Autocomplete({
//         options: listRepoQuery.data.val ?? [],
//         Option: (opt) => div(opt.name),
//         getOptionValue: ({ clone_url }: any) => clone_url,
//         getOptionLabel: ({ clone_url }: any) => clone_url,
//         label: "Repositories",
//         placeholder: "Search repository",
//         name: "repository",
//         required: true,
//         onSelect: (item: any) => {
//           listBranchesQuery.run({
//             username,
//             repo: item.name,
//           });
//         },
//         loading: listRepoQuery.loading.val,
//       })
//     );

//   const GitRepositoryUrlStandard = () =>
//     label(
//       "Repository URL",
//       Input({
//         autofocus: true,
//         placeholder:
//           "Git repository URL: https://git-codecommit.us-east-2.amazonaws.com/v1/repos/MyDemoRepo",
//         name: "repository",
//         minLength: 3,
//         required: true,
//       })
//     );

//   const GitRepositoryUrl =
//     ({ username }: any) =>
//     () =>
//       checkedGitProviderState.val == "github"
//         ? GitRepositoryUrlGitHub({ username })
//         : GitRepositoryUrlStandard();

//   const GitBranchGitHub = () =>
//     label("Branch", () =>
//       Autocomplete({
//         options: listBranchesQuery.data.val ?? [],
//         Option: (opt) => div(opt.name),
//         getOptionLabel: ({ name }: any) => name,
//         label: "Branches",
//         placeholder: "Search branches",
//         name: "branch",
//         required: true,
//         loading: listBranchesQuery.loading.val,
//       })
//     );

//   const GitBranchStandard = () =>
//     label(
//       "Branch",
//       Input({
//         placeholder: "Git Branch",
//         name: "branch",
//         minLength: 3,
//         required: true,
//       })
//     );

//   //TODO
//   const GitBranch = () => () =>
//     checkedGitProviderState.val == "github"
//       ? GitBranchGitHub()
//       : GitBranchStandard();

//   return function GitRepositoryConfig({
//     onclickPrevious,
//     onclickGitRepository,
//     gitCredential,
//   }: any) {
//     listRepoQuery.run({ username: gitCredential.username });

//     const onsubmit = (event: any) => {
//       const { repository, branch } = event.target.elements;
//       event.preventDefault();
//       onclickGitRepository({
//         url: repository.value,
//         branch: branch.value,
//       });
//     };

//     return Form(
//       {
//         onsubmit,
//         name: "form-git-repository-config",
//         class: className,
//       },
//       header(
//         h1("Git Repository"),
//         p(
//           "Provide information about the git repository. The resources inventory and generated code are stored on your source code git repository."
//         )
//       ),
//       section(
//         ol(
//           li(GitProvider()),
//           li(GitRepositoryUrl(gitCredential)),
//           li(GitBranch())
//         )
//       ),
//       ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
//     );
//   };
// };
