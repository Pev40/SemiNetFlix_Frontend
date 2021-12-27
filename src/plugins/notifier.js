import store from "../store";

export default {
  install(Vue) {
    Vue.prototype.$showMessage = (message, color = "info", duration = 3) => {
      store.commit("showMessage", {
        message: message,
        color: color,
        duration: duration,
      });
    };
  },
};
