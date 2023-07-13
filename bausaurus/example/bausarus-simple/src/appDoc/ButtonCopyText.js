import button from "@grucloud/bau-ui/button/button.js";

const copyTextToClipboard = async (text) => {
  try {
    //console.log("copy: ", text);
    await navigator.clipboard.writeText(text);
    //console.log("copy done");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export default function (context) {
  const { bau, css, tr } = context;

  const Button = button(context);

  const className = css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    visibility: hidden;
  `;
  return function ButtonCopyText() {
    return Button(
      {
        class: className,
        onclick: async (event) => {
          const code = event.target.parentElement.dataset.code;
          await copyTextToClipboard(code);
        },
      },
      tr("COPY")
    );
  };
}
