import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const IPIFY_APIKEY = import.meta.env.VITE_IPIFY_APIKEY;
const CORS_API_KEY = import.meta.env.VITE_CORS_API_KEY;
const USE_MOCK = import.meta.env.VITE_USE_MOCK;

const BYPASS_CORS_URL = "https://proxy.cors.sh/";
const API_URI = "https://geo.ipify.org/api/v2/";

const defaultLatLon = [-3.6196, -38.7499];

const defaultState = {
  ip: "",
  location: { region: "", city: "", timezone: "" },
  isp: "",
};

const ipifyResponseMock = {
  ip: "8.8.8.8",
  location: {
    country: "US",
    region: "California",
    city: "Mountain View",
    lat: 37.40599,
    lng: -122.078514,
    postalCode: "94043",
    timezone: "-07:00",
    geonameId: 5375481,
  },
  domains: [
    "0d2.net",
    "003725.com",
    "0f6.b0094c.cn",
    "007515.com",
    "0guhi.jocose.cn",
  ],
  as: {
    asn: 15169,
    name: "Google LLC",
    route: "8.8.8.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
};

export default function (context) {
  const { bau, css } = context;
  const { div, h1, h4, span, input, article, section, form, button, img, p } =
    bau.tags;

  const ipifyState = bau.state(defaultState);

  const locationFull = bau.derive(() => {
    if (ipifyState.val.location.city) {
      return `${ipifyState.val.location.city}, ${ipifyState.val.location.region}`;
    }
  });

  const timezone = bau.derive(() => {
    if (ipifyState.val.location.timezone) {
      return `UTC ${ipifyState.val.location.timezone}`;
    }
  });

  let leafletMap;
  const getLeafletMap = () => {
    if (leafletMap) return leafletMap;
    leafletMap = leaflet.map("leaflet-map");
    return leafletMap;
  };

  const latitudeLongitude = bau.derive(() => {
    const { lat, lng } = ipifyState.val.location;
    if (lat) {
      try {
        const map = getLeafletMap().setView([lat, lng], 13);
      } catch (error) {}
    }
    return [lat, lng];
  });

  const className = css`
    min-height: 100vh;
    max-width: 1440px;
    display: flex;
    flex-direction: column;

    .search-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      padding-bottom: 4rem;
      background: url("./assets/images/pattern-bg-desktop.png") no-repeat 100%
        100% / cover;
      h1 {
        color: white;
        font-size: 1.9rem;
      }
      .input-group {
        border: none;
        display: inline-flex;
        input {
          font-size: 1.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-bottom-left-radius: 0.5rem;
          border-top-left-radius: 0.5rem;
          @media (min-width: 900px) {
            min-width: 40rem;
          }
        }
        button {
          cursor: pointer;
          min-width: 3rem;
          border-bottom-right-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border: none;
          background-color: black;
          padding: 0.5rem;
        }
      }
    }
    .result-container {
      position: relative;
    }

    .result {
      position: absolute;
      display: flex;
      justify-content: space-around;
      @media (max-width: 600px) {
        flex-direction: column;
      }
      left: 50%;
      transform: translate(-50%, -2rem);
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      padding: 0 2rem;
      width: 80%;
      section {
        background-color: #fff;
        padding: 1rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.5rem;

        h4 {
          text-transform: uppercase;
          font-size: 0.825rem;
          font-weight: 500;
          white-space: nowrap;
          letter-spacing: 0.1rem;
          color: var(--clr-grey-500);
        }

        p {
          font-size: 1.7rem;
          font-weight: 500;
          &.timezone {
            white-space: nowrap;
          }
        }
      }
    }

    #leaflet-map {
      z-index: 0;
      flex-grow: 1;
    }
  `;

  const buildUrl = ({ search }) =>
    `${BYPASS_CORS_URL}${API_URI}country,city?apiKey=${IPIFY_APIKEY}&domain=${search}`;

  async function fetchJSON({ url }) {
    if (USE_MOCK) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(ipifyResponseMock), 1e3)
      );
    }
    try {
      const response = await fetch(url, {
        headers: {
          "x-cors-api-key": CORS_API_KEY,
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  }

  const updateMarker = ({ map, marker = defaultLatLon }) => {
    map.setView(marker, 13);
    leaflet.marker(marker).addTo(map);
  };

  const onsubmit = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const res = await fetchJSON({
      url: buildUrl({ search: payload.inputCity }),
    });
    if (res) {
      ipifyState.val = res;
    }
  };

  return function ipAddressTracker() {
    return article(
      { class: className },
      form(
        {
          class: "search-form",
          onsubmit,
        },
        h1("Ip Address Tracker"),
        div(
          { class: "input-group" },
          input({
            name: "inputCity",
            type: "text",
            placeholder: "Search for any IP address or domain",
            required: true,
          }),
          button(
            img({
              src: "./assets/images/icon-arrow.svg",
              alt: "Search",
              width: 11,
              height: 14,
            })
          )
        )
      ),
      div(
        { class: "result-container" },
        div(
          { class: "result" },
          section(
            h4("IP Address"),
            p(() => ipifyState.val.ip)
          ),
          section(h4("Location"), p(locationFull)),
          section(
            h4("Timezone"),
            p(
              {
                class: "timezone",
              },
              timezone
            )
          ),
          section(
            h4("ISP"),
            p(() => ipifyState.val.isp)
          )
        )
      ),
      section({
        class: css``,
        id: "leaflet-map",
        bauMounted: ({ element }) => {
          const map = getLeafletMap();
          updateMarker({ map, marker: defaultLatLon });
          const tiles = leaflet
            .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            })
            .addTo(map);
        },
      })
    );
  };
}
