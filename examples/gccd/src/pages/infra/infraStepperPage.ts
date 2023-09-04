import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "../../components/infra/stepProviderSelection";
//import importProject from "../components/infraSteps/importProject";

import configAws from "../../components/infra/configAws";
import configAzure from "../../components/infra/configAzure";
import configGoogle from "../../components/infra/configGoogle";
import infraSettings from "../../components/infra/infraSettings";
import gitCredentialConfig from "../../components/infra/gitCredentialConfig";
import gitRepositoryConfig from "../../components/infra/gitRepositoryConfig";

export default (context: Context) => {
  const { bau, css, stores } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const StepProviderSelection = stepStepProviderSelection(context);
  const InfraSettings = infraSettings(context);
  const ConfigAws = configAws(context);
  const ConfigAzure = configAzure(context);
  const GitCredentialConfig = gitCredentialConfig(context);
  const GitRepositoryConfig = gitRepositoryConfig(context);

  const ConfigGoogle = configGoogle(context);

  // const ImportProject = importProject(context);

  const providerNameState = bau.state("");
  const activeStepIndex = bau.state(0);
  let _settings: object;
  // For testing
  // const providerNameState = bau.state("AWS");
  // const activeStepIndex = bau.state(1);

  const Header = ({ name }: any) => name;

  const onclickPrevious = () => {
    if (activeStepIndex.val > 0) {
      activeStepIndex.val--;
    }
  };

  return function infraStepper() {
    const onclickProvider = (providerName: string) => () => {
      providerNameState.val = providerName;
      activeStepIndex.val++;
    };

    // const onclickImportExistingInfra = () => {
    //   activeStepIndex.val++;
    // };

    // const onclickImportFromTemplate = () => {
    //   //TODO
    //   activeStepIndex.val++;
    // };

    const onclickSettings = (settings: any) => {
      _settings = settings;
      activeStepIndex.val++;
    };

    const onclickCloudConfig = (cloudconfig: any) => {
      stores.infra.createQuery.run({ ..._settings, ...cloudconfig });
      activeStepIndex.val++;
    };

    const onclickGitCredential = (cloudconfig: any) => {
      //TODO
      cloudconfig;
      activeStepIndex.val++;
    };
    const onclickGitRepository = (cloudconfig: any) => {
      //TODO
      cloudconfig;
      activeStepIndex.val++;
    };
    const ConfigPage = () => {
      switch (providerNameState.val) {
        case "AWS":
          return ConfigAws({ onclickPrevious, onclickCloudConfig });
        case "Azure":
          return ConfigAzure({ onclickPrevious, onclickCloudConfig });
        case "Google":
          return ConfigGoogle({ onclickPrevious, onclickCloudConfig });
        default:
          break;
      }
    };

    const stepperDefs: StepperPage[] = [
      {
        name: "Provider Selection",
        Header,
        Content: () => StepProviderSelection({ onclickProvider }),
        enter: async () => {
          providerNameState.val = "";
        },
      },
      // {
      //   name: "Import",
      //   Header: () => "Import Project",
      //   Content: () =>
      //     ImportProject({
      //       providerName: providerNameState.val,
      //       onclickPrevious,
      //       onclickImportExistingInfra,
      //       onclickImportFromTemplate,
      //     }),
      // },
      {
        name: "Settings",
        Header,
        Content: () => InfraSettings({ onclickPrevious, onclickSettings }),
      },

      {
        name: "Configuration",
        Header: () => `Configuration ${providerNameState.val}`,
        Content: ConfigPage,
      },
      {
        name: "Git Credentials",
        Header,
        Content: () => GitCredentialConfig({ onclickGitCredential }),
      },
      {
        name: "Git Repository",
        Header,
        Content: () => GitRepositoryConfig({ onclickGitRepository }),
      },
      {
        name: "Scan",
        Header,
        Content: () => div(p("My stepper 3 Content")),
      },
    ];

    // const onclickNext = () => {
    //   if (stepperDefs.length > activeStepIndex.val + 1) {
    //     activeStepIndex.val++;
    //   }
    // };

    return section(
      {
        class: css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `,
      },
      Stepper({ stepperDefs, activeStepIndex })
    );
  };
};
