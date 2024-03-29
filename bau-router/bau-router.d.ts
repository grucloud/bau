declare module "@grucloud/bau-router" {
  type RouteResult = {
    title: string;
    description?: string;
    tags?: string;
    component: (...args: any[]) => HTMLElement;
    Layout: (...args: any[]) => HTMLElement;
  };
  type Router = {
    resolve: (input: { pathname: string }) => RouteResult;
  };
  export default function (context: any): Router;
}
