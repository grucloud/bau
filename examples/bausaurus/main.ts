import Bau from "@grucloud/bau";
const bau = Bau();

const loadContent = async () => {
  try {
    console.log(location.pathname);
    const { default: content } = await import(
      /* @vite-ignore */ `${location.pathname}.md`
    );
    const { head, body } = await content();
    const elTemplateStyle = document.createElement("template");

    elTemplateStyle.innerHTML = head;
    document.head.append(...elTemplateStyle.content.childNodes);

    elTemplateStyle.innerHTML = body;
    document
      .getElementById("app")
      ?.replaceChildren(...elTemplateStyle.content.childNodes);
  } catch (error) {
    console.error("Cannot find", location.pathname);
  }
};
loadContent();
