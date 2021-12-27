<template>
  <v-container>
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >Editar {{ user_edit.Nombreusuario }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save"> Guardar </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Datos del usuario</v-list-item-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row class="mt-2" dense justify="center">
                  <v-col lg="6" sm="12">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_edit.Nombreusuario"
                          outlined
                          label="Nombre"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="user_edit.ApellidoPaterno"
                          outlined
                          label="Apellido Paterno"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="user_edit.ApellidoMaterno"
                          outlined
                          label="Apellido Materno"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="user_edit.DNI"
                          outlined
                          counter="10"
                          label="DNI"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="user_edit.NumeroCelular"
                          outlined
                          label="# de celular"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="user_edit.Email"
                          outlined
                          label="Email"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="user_edit.Nacionalidad"
                          outlined
                          :items="nacionalidades"
                          label="Nacionalidad"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-col>
                      <v-col cols="8">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Fecha de nacimiento"
                              prepend-icon="mdi-calendar"
                              readonly
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            :active-picker.sync="activePicker"
                            :max="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            min="1950-01-01"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          v-model="user_edit.Genero"
                          outlined
                          label="Genero"
                          :items="['MASCULINO', 'FEMENINO']"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="password"
                          outlined
                          label="Contraseña"
                          type="password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    <v-row>
      {{ $store.getters.user.DNI }}
      <v-col cols="12">
        <v-btn color="primary" @click="openUserUpdate">
          Actualizar datos
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="logout"> Cerrar sesión </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    user: {},
    user_edit: {},
    valid: false,
    date: "",
    activePicker: null,
    menu: false,
    password: "",
    nacionalidades: [],
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    openUserUpdate() {
      this.show = true;
      this.user = this.$store.getters.auth;
    },
    async save() {
      if (this.$refs.form.validate()) {
        let user_data = {
          Name: this.user_edit.Nombreusuario,
          ApellidoPaterno: this.user_edit.ApellidoPaterno,
          ApellidoMaterno: this.user_edit.ApellidoMaterno,
          Genero: this.user_edit.Genero,
          fecha: this.date,
          dni: this.user_edit.DNI,
          numero: this.user_edit.NumeroCelular,
          email: this.user_edit.Email,
          Nacionalidad: this.user_edit.Nacionalidad,
          Password: this.password,
          token: this.$store.getters.user.DNI,
        };

        try {
          await this.$makePostRequest("/users/usuario/actualizar", user_data);
          this.$showMessage("Datos actualizados satisfactoriamente", "success");
          this.show = false;
        } catch (err) {
          this.$showMessage("Hubo un error al actualizar los datos", "error");
        }
      }
    },
    saveDate(date) {
      this.$refs.menu.save(date);
    },
  },
  watch: {
    show: async function (val) {
      if (val === false) return;
      await this.$store.dispatch("getUser");

      this.user_edit = this.$store.getters.user;
      let { data: raw_nacionalidades } = await this.$makeGetRequest(
        "/users/usuarios/nacionalidades"
      );
      this.nacionalidades = raw_nacionalidades.map((nat) => nat.Nacionalidad);
      console.log(this.nacionalidades);

      // let parsed_date = new Date(this.user_edit.FechaNacimiento);
      this.date = this.user_edit.FechaNacimiento.slice(0, 10);
      console.log(this.user_edit);
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
