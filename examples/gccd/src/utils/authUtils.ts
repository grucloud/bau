export const getAccessToken =
  ({ window }: { window: Window }) =>
  (regex: RegExp) => {
    var match = regex.exec(window.document.cookie);
    return match && match[1];
  };
