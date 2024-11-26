import { type Context } from "@grucloud/bau-ui/context";

const timeUnits = ["days", "hours", "minutes", "seconds"];

export default function (context: Context) {
  const { bau, css, keyframes } = context;
  const { body, h1, div, small, img, a, footer, li, ul, main } = bau.tags;

  const currentYear = new Date().getFullYear();

  const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

  return () => {
    const states = timeUnits.reduce<Record<string, { current: any; old: any }>>(
      (acc, timeUnit) => {
        acc[timeUnit] = {
          current: bau.state("00"),
          old: bau.state("00"),
        };
        return acc;
      },
      {}
    );
    function updateCountdown() {
      const currentTime = new Date();
      //@ts-ignore
      const diff = newYearTime - currentTime;

      const { days, hours, minutes, seconds } = states;

      days.old.val = days.current.val;
      days.current.val = `${Math.floor(diff / 1000 / 60 / 60 / 24)}`;

      hours.old.val = hours.current.val;
      hours.current.val = `${Math.floor(diff / 1000 / 60 / 60) % 24}`.padStart(
        2,
        "0"
      );

      minutes.old.val = minutes.current.val;
      minutes.current.val = `${Math.floor(diff / 1000 / 60) % 60}`.padStart(
        2,
        "0"
      );

      seconds.old.val = seconds.current.val;
      seconds.current.val = `${Math.floor(diff / 1000) % 60}`.padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    const flipTop = keyframes`
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(90deg);
      }
    `;

    const flipBottom = keyframes`
      0% ,
      50% {
        transform: rotateX(90deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    `;

    const FlipCard = ({ current, old }: any) =>
      div(
        {
          class: css`
            --radius: 10px;
            --duration: 0.5s;
            --box-shadow: 0.5px 7px #191924;
            position: relative;

            border-radius: var(--radius);
            perspective: 500px;
            color: var(--soft-red);
            width: 6rem;
            font-size: 50px;

            @media (max-width: 500px) {
              width: 5rem;
              font-size: 40px;
            }

            .top,
            .top:before,
            .bottom,
            .bottom:before {
              font-weight: 700;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              width: 100%;
              left: 0%;
              text-align: center;
            }

            .top {
              position: relative;
              overflow: hidden;
              border-radius: var(--radius) var(--radius) 0 0;
              z-index: 1;
              background-color: var(--card-background-color);
              filter: brightness(70%);
              height: 50%;
              &:before {
                z-index: 1;
                position: absolute;
                height: 100%;
                content: attr(data-value);
                background-color: var(--card-background-color);
                border-top: 1px solid rgba(0, 0, 0, 0.4);
                box-shadow: var(--box-shadow);
              }
            }

            .bottom {
              overflow: hidden;
              z-index: 0;
              position: absolute;
              top: 0%;
              background-color: var(--card-background-color);
              border-radius: var(--radius);
              box-shadow: var(--box-shadow);

              &:before {
                z-index: 1;
                position: absolute;
                content: attr(data-value);
                background-color: var(--card-background-color);
                box-shadow: var(--box-shadow);
              }
            }

            &.animate .top:before {
              animation: ${flipTop} var(--duration);
              transform-origin: bottom;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
            &.animate .bottom:before {
              animation: ${flipBottom} var(--duration);
              transform-origin: center;
              transform-style: preserve-3d;
              animation-fill-mode: both;
            }
          `,
        },
        div({ class: "top", "data-value": old }, current),
        div({ class: "bottom", "data-value": current }, old)
      );

    const FlipCardEls = timeUnits.map((timeUnit) => {
      const el = FlipCard(states[timeUnit]);
      bau.derive(() => {
        states[timeUnit].current.val;
        el.classList.remove("animate");
        //Triggering a DOM Reflow
        el.offsetHeight;
        el.classList.add("animate");
      });
      return el;
    });

    const CountDown = () =>
      div(
        { class: "countdown" },
        timeUnits.map((timeUnit, i) =>
          div({ class: "time" }, FlipCardEls[i], small(timeUnit))
        )
      );

    const className = css`
      background-image: url("./assets/images/bg-stars.svg");
      background-color: var(--very-dark-black-blue);
      color: white;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5rem;
      }
      h1 {
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        text-align: center;
      }
      .countdown {
        display: flex;
        .time {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin: 1rem;
          @media (max-width: 500px) {
            gap: 0.5rem;
            margin: 0.5rem;
          }
          small {
            color: var(--grayish-blue);
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.25rem;
            @media (max-width: 500px) {
              font-size: 0.6rem;
            }
          }
        }
      }
    `;

    const socials = [
      { name: "facebook", href: "https://facebook.com" },
      { name: "instagram", href: "https://instagram.com" },
      { name: "pinterest", href: "https://pinterest.com" },
    ];

    const Footer = () =>
      footer(
        {
          class: css`
            background-image: url("./assets/images/pattern-hills.svg");
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 10rem;
            > ul {
              list-style: none;
              display: inline-flex;
              gap: 1.5rem;
              > li {
                /** https://angel-rs.github.io/css-color-filter-generator/ */
                &:hover {
                  filter: brightness(0) saturate(100%) invert(56%) sepia(64%)
                    saturate(1729%) hue-rotate(307deg) brightness(95%)
                    contrast(108%);
                }
              }
            }
          `,
        },
        ul(
          socials.map(({ name, href }) =>
            li(
              a(
                { href },
                img({ src: `./assets/images/icon-${name}.svg`, alt: name })
              )
            )
          )
        )
      );

    return body(
      { class: className },
      main(h1("We're launching soon"), CountDown()),
      Footer()
    );
  };
}
