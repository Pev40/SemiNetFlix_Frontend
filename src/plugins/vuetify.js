import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#000000",
        secondary: "#0a2472",
        accent: "#001d3d",
        error: "#F95738",
        info: "#EE964B",
        success: "#90BE6D",
        warning: "#F9C74F",
      },
    },
  },
});
