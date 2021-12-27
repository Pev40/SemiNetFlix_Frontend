<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="6">
        <h1>Login</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="nameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            :rules="passRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            color="secondary"
            class="mr-4"
            @click="login"
            :loading="loading"
            :disabled="!valid || loading"
          >
            Ingresar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: "",
    loading: false,
    nameRules: [
      (v) => !!v || "Ingrese el nombre del usuario",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    password: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passRules: [(v) => !!v || "Ingrese su contraseña"],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          const login_result = await this.$store.dispatch("login", {
            username: this.username,
            password: this.password,
          });
          this.loading = false;
          if (login_result) return this.$router.push("/admin/dashboard");
        } catch (err) {
          this.$showMessage("Hubo un error", "error");
          this.loading = false;
        }
      } else {
        this.$showMessage("Error", "error");
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
