import button from "../button";
import alert from "../alert";
import alertStack from "./alertStack";

export default (context) => {
  const { tr, bau } = context;
  const { section, h1 } = bau.tags;

  const AlertStack = alertStack(context);
  const Button = button(context);
  const Alert = alert(context);
  return function AlertStackExamples() {
    return section(
      { id: "alert-stack" }, //
      AlertStack(),
      h1("Alert stack"),
      Button(
        {
          raised: true,
          onclick: (event) => {
            AlertStack.add({
              component: () =>
                Alert({
                  severity: "success",
                  message: tr("Infrastructure Created"),
                }),
            });
          },
        },
        "success alert"
      )
    );
  };
  // return observer(function () {
  //   return (
  //     <section id="alert-stack">
  //       <AlertStack />
  //       <h1>{tr.t("Alert Stack")}</h1>
  //       <Button
  //         label="success alert"
  //         raised
  //         onClick={() => {
  //           alertStack.add(
  //             <Alert
  //               severity="success"
  //               message={tr.t("Infrastructure Created")}
  //             />
  //           );
  //         }}
  //       />
  //       <Button
  //         label="info alert"
  //         raised
  //         onClick={() => {
  //           alertStack.add(
  //             <Alert severity="info" message={tr.t("Something went wrong")} />
  //           );
  //         }}
  //       />
  //       <Button
  //         label="warning alert"
  //         raised
  //         onClick={() => {
  //           alertStack.add(
  //             <Alert
  //               severity="warning"
  //               message={tr.t("Peggy went to the market")}
  //             />
  //           );
  //         }}
  //       />
  //       <Button
  //         label="error alert"
  //         raised
  //         onClick={() => {
  //           alertStack.add(
  //             <Alert severity="error" message={tr.t("Something went wrong")} />
  //           );
  //         }}
  //       />
  //     </section>
  //   );
  // });
};
