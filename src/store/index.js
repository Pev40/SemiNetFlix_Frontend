import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messageHandler: {
      message: "",
      color: "info",
      duration: 3,
    },
  },
  mutations: {
    showMessage(state, content) {
      state.messageHandler.message = content.message;
      state.messageHandler.color = content.color;
      state.messageHandler.duration = content.duration;
    },
  },
  actions: {},
  modules: { auth },
});
