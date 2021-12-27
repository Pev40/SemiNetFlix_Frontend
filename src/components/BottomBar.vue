<template>
  <v-bottom-navigation
    v-model="currentRoute"
    background-color="primary"
    dark
    grow
    app
  >
    <v-btn v-for="(route, key) in bottomRoutes" :key="key" :to="route.to">
      <span>{{ route.name }}</span>

      <v-icon>mdi-{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    currentRoute: "/",
    bottomRoutes: [
      { icon: "home", name: "Inicio", to: "/" },
      { icon: "movie-search", name: "Películas", to: "/movies" },
      { icon: "information", name: "Nosotros", to: "/about-us" },
      { icon: "user", name: "Login", to: "/login" },
    ],
  }),
};
</script>
