<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="movie">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >Editar {{ movie_edit.NombrePelicula }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save"> Guardar </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Datos de la película</v-list-item-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="mt-2" dense>
                <v-col cols="6">
                  <v-text-field
                    v-model="movie_edit.NombrePelicula"
                    outlined
                    label="Título"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    outlined
                    v-model="movie_edit.NombreOriginal"
                    label="Nombre Original"
                    hint="Separar por comas"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>

                <v-col cols="4">
                  <v-select
                    v-model="movie_edit.generoPrincipal"
                    outlined
                    label="Géneros"
                    :items="$generos"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="movie_edit.Duracion"
                    outlined
                    label="Duracion"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
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
                        v-model="movie_edit.FechaDeEstreno"
                        label="Fecha de estreno"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="movie_edit.FechaDeEstreno"
                      no-title
                      scrollable
                      :active-picker.sync="activePicker"
                      :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
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
              </v-row>
            </v-form>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Horarios</v-list-item-title>
            <v-card>
              <v-card-text class="text-center">
                <v-btn :disabled="!days.length" text @click="removeDay">
                  Quitar día
                </v-btn>
                <v-divider class="mx-4" vertical></v-divider>
                <v-btn text @click="addDay"> Añadir Día </v-btn>
              </v-card-text>
              <v-tabs v-model="tab" background-color="secondary" dark>
                <v-tab v-for="day in days" :key="day.name">
                  {{ day.name }}
                </v-tab>
                <v-tabs-items v-model="tab">
                  <v-tab-item class="mt-2" v-for="day in days" :key="day.name">
                    <v-card flat>
                      <v-select
                        v-model="day.times"
                        :items="['5:30PM', '7:30PM', '8:00PM', '9:00PM']"
                        label="Horarios"
                        multiple
                        outlined
                        :menu-props="{ top: true, offsetY: true }"
                        chips
                      ></v-select>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-card>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    movie: Object,
    value: Boolean,
  },
  data: () => ({
    movie_edit: {},
    valid: false,
    days: [
      { times: null, name: "Miercoles 22" },
      { times: null, name: "Jueves 23" },
      { times: null, name: "Viernes 24" },
      { times: null, name: "Sábado 25" },
    ],
    tab: 0,
    date: "",
    menu: false,
    activePicker: "",
  }),
  methods: {
    save: async function () {
      // Make buy request

      if (this.$refs.form.validate()) {
        // Make buy request
        try {
          [this.movie.Anho, this.movie.Mes, this.movie.Dia] =
            this.date.split("-");
          console.log(this.movie_edit);
          let edited_movie = {
            Name: this.movie_edit.NombrePelicula,
            NombreIngles: this.movie_edit.NombreOriginal,
            FechaEstreno: this.movie_edit.FechaDeEstreno,
            Duracion: this.movie_edit.Duracion,
            GeneroId: this.movie_edit.generoPrincipal,
          };

          await this.$makePostRequest(
            `/pelicula/actualizar/${this.movie_edit.idpeliculas}`,
            edited_movie
          );
          this.show = false;
          this.$showMessage("Película editada satisfactoriamente", "success");
        } catch (err) {
          console.log(err);
          this.$showMessage("Hubo un error al actualizar la pelicula", "error");
        }
      }
    },
    removeDay() {
      this.days.pop();
    },
    getDayName(date, locale) {
      return date.toLocaleDateString(locale, { weekday: "long" });
    },
    addDay() {
      console.log(this.days);
      let last_item = Number.parseInt(
        this.days[this.days.length - 1].name.split(" ")[1]
      );
      console.log(
        last_item,
        this.days[this.days.length - 1].name.split(" ")[1]
      );
      let last_day = new Date(2021, 11, last_item + 1);
      console.log(last_day);

      this.days.push({
        name: `${this.getDayName(last_day, "es-ES")} ${last_item + 1}`,
        times: null,
      });
    },
  },
  mounted: function () {
    console.log("Opened");
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.order = {};
        this.$emit("input", value);
      },
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.movie_edit = this.movie;
        this.movie_edit.FechaDeEstreno = this.movie_edit.FechaDeEstreno.slice(
          0,
          10
        );
        console.log(this.movie_edit);
      }
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
