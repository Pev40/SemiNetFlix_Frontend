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
          >Boletos para {{ movie.NombrePelicula }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="buy"> Comprar </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <!-- <v-subheader>Horario</v-subheader> -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Boletos</v-list-item-title>
            <v-container>
              <v-row class="mt-2" justify="space-between">
                <v-col cols="3">
                  <v-text-field
                    v-model="order.numInfantil"
                    outlined
                    label="Infantil"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="increment('numInfantil')"
                    prepend-icon="mdi-minus"
                    @click:prepend="decrement('numInfantil')"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="order.numGeneral"
                    outlined
                    label="General"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="increment('numGeneral')"
                    prepend-icon="mdi-minus"
                    @click:prepend="decrement('numGeneral')"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="order.numDiscapacitados"
                    outlined
                    label="Discapacitados"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="increment('numDiscapacitados')"
                    prepend-icon="mdi-minus"
                    @click:prepend="decrement('numDiscapacitados')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- <v-list three-line subheader>
        <v-subheader>Datos de compra</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Precio: S/ 10</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="order.personName"
                  outlined
                  label="Nombres"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="order.email"
                  outlined
                  label="Email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
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
    order: {
      numGeneral: 0,
      numInfantil: 0,
      numDiscapacitados: 0,
    },
  }),
  methods: {
    buy: async function () {
      // Make buy request
      if (
        this.order.numGeneral == 0 &&
        this.order.numInfantil == 0 &&
        this.order.numDiscapacitados == 0
      ) {
        this.$showMessage("Seleccione al menos un tipo de boleto", "warning");
        return;
      }

      let sell_obj = {
        ...this.order,
        idUsuario: this.$store.getters.user.idusuarios,
      };
      try {
        this.$makePostRequest(
          `/cartelera/venta/${this.movie.idCartelera}`,
          sell_obj
        );

        this.show = false;
        this.$showMessage("Tickets creados satisfactoriamente", "success");
      } catch (err) {
        this.$showMessage("Hubo un error", "error");
      }
    },
    increment(field) {
      this.order[field] = parseInt(this.order[field], 10) + 1;
    },
    decrement(field) {
      if (parseInt(this.order[field], 10) - 1 < 0) return;
      this.order[field] = parseInt(this.order[field], 10) - 1;
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
  },
};
</script>
