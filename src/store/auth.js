import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  state: {
    user: null,
    auth: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.auth = Boolean(user);
      state.user = user;
    },
  },
  actions: {
    login: async function ({ commit, dispatch }, credentials) {
      console.log("Sending crendentials", credentials);
      // await axios.get("/sanctum/csrf-cookie");
      try {
        let user = await axios.post("/users/usuario/autenticar", credentials);
        // let user = {
        //   data: { nombre: "Alexander", username: "alrus" },
        // };
        console.log("User logged information", user.data);
        localStorage.setItem("user-info", JSON.stringify(user.data));
        await dispatch("getUser");
        return true;
      } catch (error) {
        console.log(error.response);
        if (error.response.status == 422) {
          commit("showMessage", {
            message: error.response.data.message,
            color: "error",
          });
        } else if (error.response.status == 500) {
          commit("showMessage", {
            message: "Hubo un error con la base de datos (500)",
            color: "error",
          });
        }
        return false;
      }
    },

    getUser: async function ({ commit }) {
      try {
        // let user_res = await axios.post("/users/usuario/autenticar", credentials);

        let user_res = JSON.parse(localStorage.getItem("user-info"));
        if (user_res === null) {
          user_res = { DNI: "-1" };
        }
        // console.log("getUser: ", user_res?.DNI);
        let { data: user_data } = await axios.post("/users/usuario/get", {
          DNI: user_res.DNI,
        });
        localStorage.setItem("user-info", JSON.stringify(user_data));

        commit("SET_USER", user_data);
      } catch (err) {
        console.log("getUser erro:", err);
        commit("SET_USER", null);
      }
    },
    logout: async function ({ dispatch }) {
      // await axios.post("/logout");
      localStorage.removeItem("user-info");
      return dispatch("getUser");
    },
    register: async function ({ commit }, data) {
      try {
        console.log("Register data", data);
        await axios.get("/sanctum/csrf-cookie");
        let register_res = await axios.post("/register", data);
        console.log(register_res.response);
        commit("showMessage", {
          message: "Usuario registrado",
          color: "success",
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  getters: {
    auth: function (state) {
      return state.auth;
    },
    user: function (state) {
      return state.user;
    },
    isAdmin: function (state) {
      return state.user?.isAdmin;
    },
  },
};
