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
        <v-toolbar-title>Crear Película</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save"> Crear </v-btn>
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
                    v-model="movie.Name"
                    outlined
                    label="Título"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    outlined
                    v-model="movie.NombreIngles"
                    label="Nombre Original"
                    hint="Separar por comas"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>

                <v-col cols="4">
                  <v-select
                    v-model="movie.Generoid"
                    outlined
                    :items="generos"
                    label="Géneros"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="movie.Duracion"
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
                        v-model="date"
                        label="Fecha de estreno"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :rules="[(v) => !!v || 'Campo requerido']"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
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
    value: Boolean,
  },
  data: () => ({
    movie: {},
    valid: false,
    days: [
      { times: null, name: "Miercoles 22" },
      { times: null, name: "Jueves 23" },
      { times: null, name: "Viernes 24" },
      { times: null, name: "Sábado 25" },
    ],
    generos: [
      { value: "1", text: "Action" },
      { value: "2", text: "Adult" },
      { value: "3", text: "Adventure" },
      { value: "4", text: "Animation" },
      { value: "5", text: "Biography" },
      { value: "6", text: "Comedy" },
      { value: "7", text: "Crime" },
      { value: "8", text: "Documentary" },
      { value: "9", text: "Drama" },
      { value: "10", text: "Family" },
      { value: "11", text: "Fantasy" },
      { value: "12", text: "Film-Noir" },
      { value: "13", text: "History" },
      { value: "14", text: "Horror" },
      { value: "15", text: "Music" },
      { value: "16", text: "Musical" },
      { value: "17", text: "Mystery" },
      { value: "18", text: "Romance" },
      { value: "19", text: "Sci-Fi" },
      { value: "20", text: "Sport" },
      { value: "21", text: "Thriller" },
      { value: "22", text: "War" },
      { value: "23", text: "Western" },
      { value: "24", text: "Reality-TV" },
    ],
    tab: 0,
    menu: false,
    date: "",
    activePicker: null,
  }),
  methods: {
    save: async function () {
      if (this.$refs.form.validate()) {
        // Make buy request
        try {
          [this.movie.Anho, this.movie.Mes, this.movie.Dia] =
            this.date.split("-");
          console.log(this.movie);

          await this.$makePostRequest("/pelicula/crear", this.movie);
          this.show = false;
          this.$showMessage("Película creada satisfactoriamente", "success");
        } catch (err) {
          console.log(err);
          this.$showMessage("Hubo un error al crear la pelicula", "error");
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
        // Make getData request
      }
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
