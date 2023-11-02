// import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
// import { Context } from "@grucloud/bau-ui/context";

// import stepStepProviderSelection from "./cloud-config/stepProviderSelection";
// import importProject from "./cloud-config/importProject";

// import configAws from "./cloud-config/configAws";
// import configAzure from "./cloud-config/configAzure";
// import configGoogle from "./cloud-config/configGoogle";

// export default (context: Context) => {
//   const { bau, css } = context;
//   const { section, div, p } = bau.tags;
//   const Stepper = stepper(context);
//   const StepProviderSelection = stepStepProviderSelection(context);
//   const ConfigAws = configAws(context);
//   const ConfigAzure = configAzure(context);
//   const ConfigGoogle = configGoogle(context);
//   const ImportProject = importProject(context);

//   const providerNameState = bau.state("");
//   const activeStepIndex = bau.state(0);

//   // For testing
//   // const providerNameState = bau.state("AWS");
//   // const activeStepIndex = bau.state(1);

//   const Header = ({ name }: any) => name;

//   return function StepperCloudConfig() {
//     const onclickProvider = (providerName: string) => () => {
//       providerNameState.val = providerName;
//       activeStepIndex.val++;
//     };

//     const onclickImportExistingInfra = () => {
//       activeStepIndex.val++;
//     };

//     const onclickImportFromTemplate = () => {
//       //TODO
//       activeStepIndex.val++;
//     };

//     const ConfigPage = () => {
//       switch (providerNameState.val) {
//         case "AWS":
//           return ConfigAws({ onclickPrevious, onclickNext });
//         case "Azure":
//           return ConfigAzure({ onclickPrevious, onclickNext });
//         case "Google":
//           return ConfigGoogle({ onclickPrevious, onclickNext });
//         default:
//           break;
//       }
//     };

//     const stepperDefs: StepperPage[] = [
//       {
//         name: "Provider Selection",
//         Header,
//         Content: () => StepProviderSelection({ onclickProvider }),
//         enter: async () => {
//           providerNameState.val = "";
//         },
//       },
//       {
//         name: "Import",
//         Header: () => "Import Project",
//         Content: () =>
//           ImportProject({
//             providerName: providerNameState.val,
//             onclickPrevious,
//             onclickImportExistingInfra,
//             onclickImportFromTemplate,
//           }),
//       },
//       {
//         name: "Configuration",
//         Header: () => `Configuration ${providerNameState.val}`,
//         Content: ConfigPage,
//       },
//       {
//         name: "Scan",
//         Header,
//         Content: () => div(p("My stepper 3 Content")),
//       },
//     ];

//     const onclickPrevious = () => {
//       if (activeStepIndex.val > 0) {
//         activeStepIndex.val--;
//       }
//     };

//     const onclickNext = () => {
//       if (stepperDefs.length > activeStepIndex.val + 1) {
//         activeStepIndex.val++;
//       }
//     };

//     return section(
//       {
//         class: css`
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         `,
//       },
//       Stepper({ stepperDefs, activeStepIndex })
//     );
//   };
// };
