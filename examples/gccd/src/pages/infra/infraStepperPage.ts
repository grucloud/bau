import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "../../components/infra/stepProviderSelection";

import configAws from "../../components/infra/configAws";
import configAzure from "../../components/infra/configAzure";
import configGoogle from "../../components/infra/configGoogle";
import infraSettings from "../../components/infra/infraSettings";
import gitCredentialConfig from "../../components/infra/gitCredentialConfig";
import gitRepositoryConfig from "../../components/infra/gitRepositoryConfig";
import stepperFinal from "../../components/infra/stepperFinal";

export default (context: Context) => {
  const { bau, css } = context;
  const { section } = bau.tags;
  const Stepper = stepper(context);
  const StepProviderSelection = stepStepProviderSelection(context);
  const InfraSettings = infraSettings(context);
  const ConfigAws = configAws(context);
  const ConfigAzure = configAzure(context);
  const ConfigGoogle = configGoogle(context);
  const GitCredentialConfig = gitCredentialConfig(context);
  const GitRepositoryConfig = gitRepositoryConfig(context);
  const StepperFinal = stepperFinal(context);

  const providerNameState = bau.state("");
  const activeStepIndex = bau.state(0);
  /**
    {
        providerType: "aws",
        providerName: "aws",
        providerAuth: {
          AWSAccessKeyId: "AAAAAAAAAAAAAAAAAAAAAAAA",
          AWSSecretKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          AWS_REGION: "us-east-1",
        },
        options: { region: "us-east-1" },
      }
   */
  let _cloudconfig: object;
  /**
   {
      name: "my-infra",
      environment: "dev"
    }
   */
  let _settings: object;
  let _gitCredential: object;
  let _gitRepository: object;

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

    const onclickSettings = (settings: any) => {
      _settings = settings;
      activeStepIndex.val++;
    };

    const onclickCloudConfig = async (cloudconfig: any) => {
      _cloudconfig = cloudconfig;
      activeStepIndex.val++;
    };

    const onclickGitCredential = async (gitCredential: any) => {
      _gitCredential = gitCredential;
      activeStepIndex.val++;
    };

    const onclickGitRepository = (gitRepository: any) => {
      _gitRepository = gitRepository;
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
      },
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
        Content: () =>
          GitCredentialConfig({ onclickPrevious, onclickGitCredential }),
      },
      {
        name: "Git Repository",
        Header,
        Content: () =>
          GitRepositoryConfig({ onclickPrevious, onclickGitRepository }),
      },
      {
        name: "Review",
        Header,
        Content: () =>
          StepperFinal({
            onclickPrevious,
            onclickGitRepository,
            cloudconfig: _cloudconfig,
            gitCredential: _gitCredential,
            gitRepository: _gitRepository,
            settings: _settings,
          }),
      },
    ];

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
