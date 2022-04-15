const dev = {
  API_ENDPOINT_URL: "http://wecarematrouh.herokuapp.com/api/admin",
};
const prod = {
  API_ENDPOINT_URL: "http://wecarematrouh.herokuapp.com/api",
};

const test = {
  API_ENDPOINT_URL: "http://wecarematrouh.herokuapp.com/api",
};
export const API_URL = "http://wecarematrouh.herokuapp.com/api";
export const GOOGLE_MAPS_KEY = "AIzaSyA_Lxx_vpNTo-zm6Iz5d721LmVvAC20A_o";
const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv();
