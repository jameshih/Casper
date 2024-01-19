import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize([
    {
      trackingId: "G-TRVPLET4C4",
    },
  ]);
};

export const logPageView = (page: string, title: string) => {
  ReactGA.send({
    hitType: "pageview",
    page,
    title,
  });
};
