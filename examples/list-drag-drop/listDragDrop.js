export default function (context) {
  const { bau, css } = context;
  const { ul, li } = bau.tags;

  const className = css`
    margin: 1rem;
    border: 2px dotted grey;
    list-style: none;
    padding: 0;
    & li {
      cursor: move;
    }
  `;

  const findBelow = (event) => {
    let _elemBelow = null;
    let _index = 0;
    const ulEl = event.target.closest("ul");
    [...ulEl.querySelectorAll("li:not(.dragging)")].some((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.y > event.clientY) {
        _elemBelow = el;
        return true;
      } else {
        _index++;
      }
    });
    return { belowEl: _elemBelow, index: _index };
  };

  return function ListDropDrop(props) {
    const { items, renderItem } = props;

    const itemsState = bau.state(items);

    const ondragstart = (event) => {
      console.log("dragstart id", event.target, "clientY", event.clientY);
      event.target.classList.add("dragging");
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dataTransfer.effectAllowed = "move";
      setTimeout(() => {
        event.target.style.visibility = "hidden";
      }, 0);
    };

    const ondragover = (event) => {
      event.preventDefault();
    };

    const ondragend = (event) => {
      event.target.classList.remove("dragging");
    };

    const ondrop = (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      const { index } = findBelow(event);
      const draggedIndex = itemsState.val.findIndex((item) => item.id == id);
      const toMove = itemsState.val[draggedIndex];
      itemsState.val.splice(draggedIndex, 1);
      itemsState.val.splice(index, 0, toMove);
    };

    return bau.loop(
      itemsState,
      ul({ class: className, ondragover, ondragend, ondrop }),
      (item) =>
        li(
          {
            id: item.id,
            draggable: true,
            ondragstart,
          },
          renderItem(item)
        )
    );
  };
}
