import { Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import input from "@grucloud/bau-ui/input";
import modal from "@grucloud/bau-ui/modal";

import pipe from "rubico/pipe";
import map from "rubico/map";

import groupBy from "rubico/x/groupBy";
import values from "rubico/x/values";

import AwsServicesJson from "./awsServices.json";

const DefaultServices = ["EC2"];

export default (context: Context) => {
  const { bau, css } = context;
  const {
    form,
    section,
    legend,
    fieldset,
    div,
    span,
    main,
    header,
    footer,
    h1,
  } = bau.tags;

  const Chip = chip(context, {
    size: "sm",
    color: "primary",
    variant: "solid",
  });

  const ButtonDelete = button(context, {
    size: "sm",
    color: "primary",
    variant: "solid",
  });

  const Button = button(context, {
    color: "primary",
    variant: "solid",
  });

  const Input = input(context);
  const Checkbox = checkbox(context, {
    size: "sm",
    color: "neutral",
    variant: "outline",
  });

  const Modal = modal(context, { size: "lg" });

  return function AwsServices(props: any) {
    const { SERVICES } = props;
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

    const Service = ({ group, label }: any) =>
      bau.tags.label(
        Checkbox({
          name: `checkbox-${group}`,
          checked: selectedGroupState.val.includes(group),
          "data-group": group,
          onchange: onchangeCheckbox,
        }),
        label || group
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

    const ServiceChips = (groups: any[]) =>
      div(
        {
          class: css`
            display: inline-flex;
            gap: 0.5rem;
          `,
        },
        groups.map((group) =>
          Chip(
            span(group),
            ButtonDelete({ onclick: onclickButtonDelete(group) }, "\u2715")
          )
        )
      );

    const GroupSelected = (groups: any[]) =>
      fieldset(legend("Selected Services"), ServiceChips(groups));

    const Content = () =>
      main(() => div(ServicesCheckboxes(servicesState.val)));

    const modalEl = Modal(
      { id: "aws-service-dialog" },
      form(
        header(
          h1("AWS Services Selection"),
          div(
            {
              class: css`
                display: flex;
                align-items: center;
                gap: 1rem;
              `,
            },
            div(
              Input({
                autofocus: true,
                placeholder: "Search AWS Services",
                type: "search",
                value: searchInputState,
                size: 30,
                oninput,
              })
            ),
            () => GroupSelected(selectedGroupState.val)
          )
        ),
        Content(),
        footer(
          Button(
            {
              variant: "outline",
              onclick: () => modalEl.close(),
            },
            "Cancel"
          ),
          Button(
            {
              variant: "solid",
              onclick: () => modalEl.close(),
            },
            "Save"
          )
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
            gap: 0.4rem;
            font-size: x-small;
            & input {
              margin: 0;
            }
          }
          & fieldset {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.4rem;
          }
        `,
      },
      fieldset(
        legend("Services"),
        div(
          {
            class: css`
              display: flex;
              flex-direction: column;
              gap: 1rem;
            `,
          },
          div(
            Button(
              {
                variant: "solid",
                color: "primary",
                onclick: () => {
                  modalEl.showModal();
                },
              },
              "ADD SERVICES"
            )
          ),
          () => ServiceChips(selectedGroupState.val),
          modalEl
        )
      )
    );
  };
};
