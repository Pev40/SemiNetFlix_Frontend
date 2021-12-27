<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="author">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Editar {{ author.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save"> Guardar </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Datos del autor</v-list-item-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="mt-2" dense>
                <v-col cols="6">
                  <v-text-field
                    v-model="author_edit.name"
                    outlined
                    label="Título"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="author_edit.n_movies"
                    outlined
                    label="# de películas"
                    :rules="[(v) => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    author: Object,
    value: Boolean,
  },
  data: () => ({
    author_edit: {},
    valid: false,
  }),
  methods: {
    save: function () {
      // Make buy request
      if (this.$refs.form.validate()) {
        this.show = false;
        this.$showMessage("Autor editado satisfactoriamente", "success");
      } else {
        this.$showMessage("Faltan rellenar algunos campos", "warning");
      }
    },
    removeDay() {
      this.days.pop();
    },
    getDayName(date, locale) {
      return date.toLocaleDateString(locale, { weekday: "long" });
    },
    addDay() {
      let last_item = Number.parseInt(
        this.days[this.days.length - 1].split(" ")[1]
      );
      console.log(last_item, this.days[this.days.length - 1].split(" ")[0]);
      let last_day = new Date(2021, 12, last_item + 1);

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
        this.author_edit = { ...this.author };
      }
    },
  },
};
</script>
