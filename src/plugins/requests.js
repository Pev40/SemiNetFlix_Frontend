import axios from "axios";

// axios.defaults.withCredentials = true;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  install(Vue) {
    (Vue.prototype.$makeGetRequest = (endpoint, data = {}) => {
      return axios.get(endpoint, data);
    }),
      (Vue.prototype.$makePostRequest = (endpoint, data = {}) => {
        return axios.post(endpoint, data);
      }),
      (Vue.prototype.$formatDate = (value) => {
        return new Date(value).toISOString().slice(0, 10);
      });
  },
};
