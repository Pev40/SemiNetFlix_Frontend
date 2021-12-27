<template>
  <v-app>
    <v-app-bar app color="primary" class="pl-md-10 px-xs-4" dark fixed>
      <v-app-bar-nav-icon @click="showSidebar = true" class="d-flex d-md-none">
      </v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-toolbar-title class="text-h4 text-md-h4">
          SemiNetflix
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
      <snack-bar />
    </v-main>
    <v-bottom-navigation
      v-model="currentRoute"
      background-color="primary"
      dark
      grow
      app
    >
      <v-btn v-for="(route, key) in currentRoutes" :key="key" :to="route.to">
        <span>{{ route.name }}</span>

        <v-icon>mdi-{{ route.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- <bottom-bar /> -->
  </v-app>
</template>

<script>
import SnackBar from "./components/SnackBar.vue";
// import BottomBar from "./components/BottomBar.vue";
export default {
  components: { SnackBar },
  // components: { BottomBar },
  name: "App",

  data: () => ({
    showSidebar: false,
    currentRoute: "/",
    guestRoutes: [
      { icon: "home", name: "Inicio", to: "/" },
      { icon: "movie-search", name: "Películas", to: "/movies" },
      { icon: "information", name: "Nosotros", to: "/about-us" },
      { icon: "account-circle", name: "Login", to: "/login" },
    ],
    userRoutes: [
      { icon: "home", name: "Inicio", to: "/admin/dashboard" },
      { icon: "movie-search", name: "Películas", to: "/movies" },
      { icon: "movie-search", name: "Carteleras", to: "/cartelera" },
      { icon: "account-circle", name: "Usuario", to: "/admin/user" },
    ],
    adminRoutes: [
      { icon: "home", name: "Inicio", to: "/admin/dashboard" },
      { icon: "movie-cog", name: "Películas", to: "/admin/movies" },
      { icon: "account-tie", name: "Reservas", to: "/admin/reservas" },
      { icon: "account-circle", name: "Usuario", to: "/admin/user" },
    ],
  }),
  computed: {
    currentRoutes: function () {
      if (!this.$store.getters.auth) {
        return this.guestRoutes;
      }
      if (!this.$store.getters.isAdmin) {
        return this.userRoutes;
      }
      return this.adminRoutes;
    },
  },
};
</script>
