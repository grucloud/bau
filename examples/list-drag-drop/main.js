import { createContext } from "@grucloud/bau-ui/context";
import listDragDrop from "./listDragDrop";

const context = createContext();

const app = (context) => {
  const { bau, css } = context;
  const { div, h1, section } = bau.tags;
  const ListDragDrop = listDragDrop(context);

  const items = [
    { id: "1", title: "Card 1" },
    { id: "2", title: "Card 2" },
    { id: "3", title: "Card 3" },
  ];

  const Item = ({ title }) =>
    section(
      {
        class: css`
          border: 1px dotted green;
          margin: 1rem;
          text-align: center;
          background-color: lightcoral;
        `,
      },
      h1(title)
    );

  return function () {
    return div(
      ListDragDrop({
        items,
        renderItem: Item,
      })
    );
  };
};

const App = app(context);
document.getElementById("app").replaceChildren(App());
