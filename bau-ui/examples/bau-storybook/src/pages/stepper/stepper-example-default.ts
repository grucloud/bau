import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, window } = context;
  const { footer, p, label, section, a, ul, li } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const Stepper = stepper(context);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const ButtonNext = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmitStep1 = (event: any) => {
    event.preventDefault();
    //const { organization } = event.target.elements;
    //console.log("onsubmit", organization.value);
    window.history.pushState("", "", "#step2");
  };

  const onsubmitStep3 = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const { organization } = window.document.forms?.formStep1.elements;
    const search = new URLSearchParams(window.location.search);
    const choice = search.get("choice");
    alert(`organization ${organization.value}, choice:${choice}`);
  };

  const stepperDefs: StepperPage[] = [
    {
      name: "step1",
      Header: () => "Step 1",
      Content: () =>
        Form(
          { onsubmit: onsubmitStep1, id: "formStep1" },
          label(
            "Organization",
            Input({
              autofocus: true,
              placeholder: "Organization",
              name: "organization",
              required: true,
              minLength: 3,
            })
          ),
          footer(ButtonNext({ type: "submit" }, "Next: Step 2"))
        ),
    },
    {
      name: "step2",
      Header: () => "Step 2",
      Content: () =>
        Form(
          ul(
            li(a({ href: "?choice=choice1#step3" }, "Choice 1")),
            li(a({ href: "?choice=choice2#step3" }, "Choice 2"))
          ),
          footer(ButtonPrevious({ href: "#step1" }, "Previous: Step 1"))
        ),
    },
    {
      name: "step3",
      Header: () => "Step 3",
      Content: () =>
        Form(
          { onsubmit: onsubmitStep3 },
          p("My stepper 3 Content"),
          footer(
            ButtonPrevious({ href: "#step2" }, "Previous: Step 2"),
            ButtonNext({ type: "submit" }, "Save")
          )
        ),
    },
  ];

  return () => section(Stepper({ stepperDefs }));
};
