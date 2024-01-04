import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { body, h1, div, h2, small } = bau.tags;

  const currentYear = new Date().getFullYear();

  const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

  return function NewYearCountDown() {
    const days = bau.state("0");
    const hours = bau.state("0");
    const minutes = bau.state("0");
    const seconds = bau.state("0");

    function updateCountdown() {
      const currentTime = new Date();
      //@ts-ignore
      const diff = newYearTime - currentTime;
      days.val = `${Math.floor(diff / 1000 / 60 / 60 / 24)}`;
      hours.val = `${Math.floor(diff / 1000 / 60 / 60) % 24}`.padStart(2, "0");
      minutes.val = `${Math.floor(diff / 1000 / 60) % 60}`.padStart(2, "0");
      seconds.val = `${Math.floor(diff / 1000) % 60}`.padStart(2, "0");
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    const Year = () => div({ class: "year" }, currentYear + 1);

    const CountDown = () =>
      div(
        { class: "countdown" },
        div({ class: "time" }, h2(days), small("days")),
        div({ class: "time" }, h2(hours), small("hours")),
        div({ class: "time" }, h2(minutes), small("minutes")),
        div({ class: "time" }, h2(seconds), small("seconds"))
      );

    const className = css`
      background-image: url("https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      height: 100vh;
      color: #fff;
      font-family: "Lato", sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0;
      overflow: hidden;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }
      h1 {
        font-size: 60px;
        margin: -80px 0 40px;
      }
      .year {
        font-size: 200px;
        opacity: 0.1;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      .countdown {
        display: flex;
        transform: scale(2);
      }
      .time {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 15px;
        & h2 {
          margin: 0 0 5px;
        }
      }
      @media (max-width: 500px) {
        h1 {
          font-size: 45px;
        }
        .time {
          margin: 5px;
          h2 {
            font-size: 12px;
            margin: 0;
          }
          small {
            font-size: 10px;
          }
        }
      }
    `;

    return body(
      { class: className },
      Year(),
      h1("New Year Countdown"),
      CountDown()
    );
  };
}
