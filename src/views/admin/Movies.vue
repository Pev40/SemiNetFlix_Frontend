<template>
  <v-container>
    <edit-movie
      :movie="selectedMovie"
      v-model="editOpen"
      v-on:input="editFinished"
    />
    <create-movie v-model="createOpen" v-on:input="createFinished" />
    <v-row align="center" class="mb-2">
      <v-col>
        <h1>Películas</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-select
          label="Genero"
          :items="$generos"
          v-model="filtroGenero"
          single-line
          hide-details=""
        ></v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn color="secondary" @click="createMovie">Crear</v-btn>
      </v-col>
    </v-row>
    <hr />
    <v-row class="mt-2">
      <!-- <v-col cols="4" v-for="(movie, key) in movies" :key="key">
        <movie
          :movie="movie"
          :btnText="'Editar'"
          v-on:movie_clicked="editMovie"
        />
      </v-col> -->
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
          <v-data-table :headers="headers" :items="movies" :search="search">
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
            <template v-slot:item.generoPrincipal="{ item }">
              {{ $generosMap[item.generoPrincipal] }}
            </template>
            <template v-slot:item.FechaDeEstreno="{ item }">
              {{ item.FechaDeEstreno.slice(0, 10) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateMovie from "../../components/admin/CreateMovie.vue";
import EditMovie from "../../components/admin/EditMovie.vue";
// import Movie from "../../components/Movie.vue";
export default {
  mounted: async function () {
    let { data } = await this.$makeGetRequest("/peliculas/lista");
    this.movies = data;
  },
  methods: {
    editMovie(movie) {
      this.editOpen = true;
      this.selectedMovie = movie;
    },
    createMovie() {
      this.createOpen = true;
    },
    async editFinished() {
      console.log("Edit closed");
      let { data } = await this.$makeGetRequest("/peliculas/lista");
      this.movies = data;
    },
    async createFinished() {
      let { data } = await this.$makeGetRequest("/peliculas/lista");
      this.movies = data;
    },
  },
  components: { EditMovie, CreateMovie },
  data: () => ({
    search: "",
    editOpen: false,
    createOpen: false,
    selectedMovie: null,
    movies: [],
    headers: [
      {
        text: "Id",
        align: "start",
        filterable: false,
        value: "idpeliculas",
      },
      { text: "Nombre Pelicula", value: "NombrePelicula" },
      { text: "Nombre Original", value: "NombreOriginal" },
      { text: "Duración (m)", value: "Duracion" },
      { text: "Género", value: "generoPrincipal" },
      { text: "Estreno", value: "FechaDeEstreno" },
      { text: "Acciones", value: "actions" },
    ],
    filtroGenero: "",
  }),
  watch: {
    filtroGenero: async function () {
      let { data } = await this.$makePostRequest("/peliculas/buscaPorGenero", {
        filtro2: this.filtroGenero,
      });
      console.log("Filter:", data);
      this.movies = data;
    },
  },
};
</script>
