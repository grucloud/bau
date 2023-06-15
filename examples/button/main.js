import "./style.css";
import Bau from "@grucloud/bau";

const app = ({ bau }) => {
  const { h3, button, div } = bau.tags;

  const Button = ({ color, onclick }, ...children) =>
    button(
      {
        style: {
          deps: [color],
          renderProp: (color) => `background-color: ${color};`,
        },
        onclick,
      },
      ...children
    );

  const colorState = bau.state("green");
  const textState = bau.state("Turn Red");

  const turnRed = () => {
    colorState.val = "red";
    textState.val = "Turn Green";
    onclickState.val = turnGreen;
  };

  const turnGreen = () => {
    colorState.val = "green";
    textState.val = "Turn Red";
    onclickState.val = turnRed;
  };

  const onclickState = bau.state(turnRed);

  return function Main() {
    return div(
      h3("Buttton with primitive props"),
      Button(
        {
          color: "yellow",
          onclick: () => alert("Clicked"),
        },
        "Click Me"
      ),
      h3("Buttton with state props"),
      Button({ color: colorState, onclick: onclickState }, textState)
    );
  };
};

document.getElementById("app").replaceChildren(app({ bau: Bau() })());
