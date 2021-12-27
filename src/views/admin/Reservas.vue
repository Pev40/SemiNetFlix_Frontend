<template>
  <v-container>
    <edit-author
      :author="selectedAuthor"
      v-model="editOpen"
      v-on:input="editFinished"
    />
    <v-row>
      <v-col>
        <h1>Reservas</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="reservas" :search="search">
            <template v-slot:item.actions="{ item }"
              ><v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="mr-2"
                    @click="editMovie(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Actualizar</span>
              </v-tooltip>
            </template>
            <template v-slot:item.fechacompra="{ item }">
              {{ item.fechacompra.slice(0, 10) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAuthor from "../../components/admin/EditAuthor.vue";
export default {
  components: { EditAuthor },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Id",
        align: "start",
        filterable: false,
        value: "idreserva",
      },
      { text: "Nombre Pelicula", value: "idcartelera" },
      { text: "Nombre Usuario", value: "idusuario" },
      { text: "Bol. General", value: "boletosgeneral" },
      { text: "Bol. Infantil", value: "boletosninos" },
      { text: "Bol. Discapacitados", value: "boletosdiscapacitados" },
      { text: "Fecha", value: "fechacompra" },
    ],
    reservas: [],
    selectedAuthor: null,
    editOpen: false,
  }),
  methods: {
    edit: function (author) {
      this.editOpen = true;
      this.selectedAuthor = author;
    },
    editFinished: function () {
      console.log("Edit Author closed");
    },
  },
  mounted: async function () {
    let { data } = await this.$makePostRequest("/reserva/filtrarFecha", {
      fecha1: "2021-12-26",
    });
    this.reservas = data;
  },
};
</script>
