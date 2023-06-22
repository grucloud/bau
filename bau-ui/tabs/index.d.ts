declare module "@grucloud/bau-ui/tabs" {
  export type TabsProps = {};

  type Component = import("../bau-ui").Component<TabsProps>;

  type TabPropBase = {
    name: string;
    disabled?: boolean;
    enter?: Function;
    exit?: Function;
  };

  type ComponentTab = import("../bau-ui").ComponentWithProp<TabPropBase>;

  export type Tab = {
    Header: ComponentTab;
    Content: ComponentTab;
  } & TabPropBase;

  export type Tabs = Tab[];

  type Option = {
    tabDefs: Tab[];
  };

  export default function (context: any, option: Option): Component;
}
