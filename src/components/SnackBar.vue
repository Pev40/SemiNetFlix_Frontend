<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="duration * 1000"
    transition="slide-y-transition"
    app
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false"> Okey </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
      duration: 3,
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.message = state.messageHandler.message;
        this.color = state.messageHandler.color;
        this.duration = state.messageHandler.duration
          ? state.messageHandler.duration
          : 3;
        this.show = true;
      }
    });
  },
};
</script>
