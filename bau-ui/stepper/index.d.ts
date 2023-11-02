declare module "@grucloud/bau-ui/stepper" {
  type ComponentOption = import("../bau-ui").ComponentOption;

  type StepperPagePropBase = {
    name: string;
    disabled?: boolean;
    enter?: Function;
    exit?: Function;
  };

  type ComponentStepper =
    import("../bau-ui").ComponentWithProp<StepperPagePropBase>;

  export type StepperPage = {
    Header: ComponentStepper;
    Content: ComponentStepper;
    Footer?: ComponentStepper;
  } & StepperPagePropBase;

  export type StepperProps = {
    stepperName: string;
    stepperDefs: StepperPage[];
  };

  type Component = import("../bau-ui").Component<StepperProps>;

  type Option = {} & ComponentOption;

  export function NextUrl(
    context: any,
    stepperName: string
  ): (nextStep: string, state?: any) => string;

  export default function (context: any, option?: Option): Component;
}
