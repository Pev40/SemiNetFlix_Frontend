<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Bienvenido {{ $store.getters.user.Nombreusuario }}</h1>
        <h3>Admin: {{ $store.getters.isAdmin }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
