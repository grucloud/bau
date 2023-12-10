declare module "@grucloud/bau-ui/lazy" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;
  type Component = import("../bau-ui").Component<any>;

  export type LazyOptions = {
    loading?: Component;
    error?: Component;
  };

  export type LazyProps = {
    getModule: () => any;
    props?: any;
  } & DefaultDesignProps;

  type LazyComponent = import("../bau-ui").Component<LazyProps>;

  export default function (
    context: any,
    option?: ComponentOption & LazyOptions
  ): LazyComponent;
}
