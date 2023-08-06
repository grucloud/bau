import slider from "@grucloud/bau-ui/slider";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, p, label, datalist, option, br } = bau.tags;

  const sliderState = bau.state(0);
  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const Slider = slider(context);
  const SliderMinMax = slider(context);
  const SliderMark = slider(context);

  return () =>
    section(
      { id: "slider" },
      h2(tr("Slider")),
      p("Slider value: ", sliderState),
      h3("Basic Slider"),
      Container(Slider({ oninput, name: "slider-simple" })),
      h3("Slider Min Max: -1000 1000"),
      Container(SliderMinMax({ oninput, min: -1000, max: 1000 })),
      h3("Slider Step 20"),
      Container(Slider({ oninput, step: 20, min: -100, max: 100 })),
      h3("Slider Vertical"),
      Container(
        div(
          {
            class: css`
              display: flex;
            `,
          },
          Slider({
            oninput,
            id: "temp-vertical",
            name: "temp",
            list: "markers-vertical",
            orient: "vertical",
            class: css`
              width: 30px;

              appearance: slider-vertical;
            `,
          }),
          datalist(
            {
              id: "markers-vertical",
              class: css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `,
            },
            ["0", "25", "50", "75", "100"]
              .reverse()
              .map((label) => option({ value: Number(label), label }))
          )
        )
      ),
      h3("Slider with mark"),
      Container(
        label({ for: "temp" }, "Choose a comfortable temperature"),
        br(),
        SliderMark({
          oninput,
          class: css`
            width: 300px;
            margin: 0;
          `,
          id: "temp",
          name: "temp",
          list: "markers",
        }),
        datalist(
          {
            id: "markers",
            class: css`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `,
          },
          ["0", "25", "50", "75", "100"].map((label) =>
            option({ value: Number(label), label })
          )
        )
      )
    );
};
