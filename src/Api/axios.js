import axios from "axios";
const instance = axios.create({
  // local instance of firebase functions
//   baseURL: "http://localhost:5001",
  //   deployed version of amazon server on render.com
    baseURL: "https://amazon-backend-api-kuba.onrender.com",
});
export { instance };
