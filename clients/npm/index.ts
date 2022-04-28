import axios from "axios";

const clientNpm = axios.create({
  baseURL: "https://api.npmjs.org/",
});

export { clientNpm };
