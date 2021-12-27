<template>
  <v-container>
    <movie-details
      :movie="selectedMovie"
      v-model="detailOpen"
      v-on:input="buyFinished"
    />
    <v-row>
      <v-col>
        <h1>Galería</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(movie, key) in movies" :key="key">
        <cartelera :movie="movie" v-on:movie_clicked="seeDetails" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cartelera from "../components/Cartelera.vue";
import MovieDetails from "../components/MovieDetails.vue";
export default {
  components: { Cartelera, MovieDetails },
  mounted: async function () {
    let { data } = await this.$makeGetRequest("/cartelera");
    this.movies = data;
  },
  methods: {
    seeDetails: function (movie) {
      console.log("owo", movie);
      if (this.$store.getters.auth) {
        this.selectedMovie = movie;
        this.detailOpen = true;
      } else {
        this.$showMessage(
          "Necesita loguearse para comprar una película",
          "info"
        );
        this.$router.push("login");
      }
      // alert("Holi");
    },
    buyFinished: function (value) {
      console.log("Cerrado:", value);
      // this.detailOpen = false;
    },
  },
  data: () => ({
    detailOpen: false,
    selectedMovie: null,
    movies: [],
  }),
};
</script>
