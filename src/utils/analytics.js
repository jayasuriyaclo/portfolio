import ReactGA from "react-ga4";

// Replace this with your actual GA4 Measurement ID
const MEASUREMENT_ID = "G-XXXXXXXXXX"; 

export const initAnalytics = () => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log("Analytics initialized");
  } else {
    console.warn("Analytics not initialized: Measurement ID is missing or default.");
  }
};

export const trackPageView = (path) => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (category, action, label = "") => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    ReactGA.event({
      category,
      action,
      label,
    });
  } else {
    console.log(`[Analytics Stub] Event Tracked: ${category} | ${action} | ${label}`);
  }
};
