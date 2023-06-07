import { css } from "goober";

import { useQuery } from "../../utils/useQuery";

async function fetchJSON(request) {
  try {
    const response = await fetch(request, {});
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    }
    throw response;
  } catch (error) {
    throw error;
  }
}

export const footer = ({ tr, bau }) => {
  const { footer, span, a, ul, li, p } = bau.tags;

  const op = useQuery({
    bau,
    run: async () => {
      const { version } = await fetchJSON("api/v1/version");
      return version;
    },
  });

  return function Footer() {
    return footer(
      {
        class: css`
          display: flex;
          justify-content: center;
          span {
            margin: 1rem;
          }
        `,
      },
      span(`version FE: ${__VERSION__}`),
      span(
        `BE: `,
        bau.bind({
          deps: [op.isLoading, op.data, op.error],
          render: () => (isLoading, data, error) => {
            if (isLoading) {
              return "Loading";
            } else if (error) {
              return "Error";
            } else {
              return data;
            }
          },
        })
      )
    );
  };
};
