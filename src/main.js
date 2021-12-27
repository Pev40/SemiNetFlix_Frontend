import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notifier from "./plugins/notifier";
import requests from "./plugins/requests";

Vue.config.productionTip = false;

Vue.use(notifier);
Vue.use(requests);

Vue.prototype.$generos = [
  { value: 1, text: "Action" },
  { value: 2, text: "Adult" },
  { value: 3, text: "Adventure" },
  { value: 4, text: "Animation" },
  { value: 5, text: "Biography" },
  { value: 6, text: "Comedy" },
  { value: 7, text: "Crime" },
  { value: 8, text: "Documentary" },
  { value: 9, text: "Drama" },
  { value: 10, text: "Family" },
  { value: 11, text: "Fantasy" },
  { value: 12, text: "Film-Noir" },
  { value: 13, text: "History" },
  { value: 14, text: "Horror" },
  { value: 15, text: "Music" },
  { value: 16, text: "Musical" },
  { value: 17, text: "Mystery" },
  { value: 18, text: "Romance" },
  { value: 19, text: "Sci-Fi" },
  { value: 20, text: "Sport" },
  { value: 21, text: "Thriller" },
  { value: 22, text: "War" },
  { value: 23, text: "Western" },
  { value: 24, text: "Reality-TV" },
];

Vue.prototype.$generosMap = {
  1: "Action",
  2: "Adult",
  3: "Adventure",
  4: "Animation",
  5: "Biography",
  6: "Comedy",
  7: "Crime",
  8: "Documentary",
  9: "Drama",
  10: "Family",
  11: "Fantasy",
  12: "Film-Noir",
  13: "History",
  14: "Horror",
  15: "Music",
  16: "Musical",
  17: "Mystery",
  18: "Romance",
  19: "Sci-Fi",
  20: "Sport",
  21: "Thriller",
  22: "War",
  23: "Western",
  24: "Reality-TV",
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
