import { Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import input from "@grucloud/bau-ui/input";
import pipe from "rubico/pipe";
import map from "rubico/map";

import groupBy from "rubico/x/groupBy";
import values from "rubico/x/values";

import AwsServicesJson from "./awsServices.json";

const DefaultServices = ["EC2"];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, legend, fieldset, label, h2, div, span } = bau.tags;

  const Chip = chip(context, {
    size: "sm",
    color: "primary",
    variant: "solid",
  });
  const Button = button(context, {
    size: "sm",
    color: "primary",
    variant: "solid",
  });
  const Input = input(context);
  const Checkbox = checkbox(context, {
    size: "sm",
    color: "neutral",
    variant: "outline",
  });

  return function AwsServices(props: any) {
    const { SERVICES } = props;
    debugger;
    const selectedGroupState = bau.state(SERVICES ?? DefaultServices);
    const searchInputState = bau.state("");
    const servicesState = bau.derive(() => {
      if (searchInputState.val) {
        return AwsServicesJson.filter(({ group }) =>
          group.match(new RegExp(`${searchInputState.val}`, "i"))
        );
      } else {
        return AwsServicesJson;
      }
    });

    const oninput = (event: any) => {
      searchInputState.val = event.target.value;
    };

    const onchangeCheckbox = (event: any) => {
      const { group } = event.target.dataset;
      const selectedSet = new Set(selectedGroupState.val);
      if (event.target.checked) {
        selectedSet.add(group);
      } else {
        selectedSet.delete(group);
      }
      selectedGroupState.val = [...selectedSet.values()];
    };

    const onclickButtonDelete = (group: string) => (_event: any) => {
      const selectedSet = new Set(selectedGroupState.val);
      selectedSet.delete(group);
      selectedGroupState.val = [...selectedSet.values()];
    };

    const Service = ({ group }: any) =>
      label(
        Checkbox({
          name: `checkbox-${group}`,
          checked: selectedGroupState.val.includes(group),
          "data-group": group,
          onchange: onchangeCheckbox,
        }),
        group
      );

    const ServicesCheckboxes = (services: any) =>
      pipe([
        () => services,
        groupBy("category"),
        map.entries(([category, servicesPerCategory]: any) => [
          category,
          pipe([
            () => fieldset(legend(category), servicesPerCategory.map(Service)),
          ])(),
        ]),
        values,
      ])();

    const GroupSelected = (groups: any[]) =>
      fieldset(
        {
          class: css`
            display: inline-flex;
            gap: 0.5rem;
          `,
        },
        legend("Selected Services"),
        groups.map((group) =>
          Chip(
            span(group),
            Button({ onclick: onclickButtonDelete(group) }, "\u2715")
          )
        )
      );

    return section(
      {
        class: css`
          & label {
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 1px dotted var(--color-emphasis-200);
            border-radius: var(--global-radius);
            padding: 0.3rem;
            & input {
              margin: 0;
            }
          }
          & fieldset {
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }
        `,
      },
      h2("Aws Services"),
      () => GroupSelected(selectedGroupState.val),
      Input({
        autofocus: true,
        placeholder: "Search AWS Services",
        type: "search",
        value: searchInputState,
        oninput,
      }),
      () => div(ServicesCheckboxes(servicesState.val))
    );
  };
};
