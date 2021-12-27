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
        <movie :movie="movie" v-on:movie_clicked="seeDetails" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Movie from "../components/Movie.vue";
import MovieDetails from "../components/MovieDetails.vue";
export default {
  components: { Movie, MovieDetails },
  mounted: async function () {
    let { data } = await this.$makeGetRequest("/peliculas/lista");
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
    movies: [
      {
        img: "https://wallpaperaccess.com/full/1922937.jpg",
        title: "Movie 1",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat eum corrupti itaque sit? Voluptatum.",
        rating: 4.5,
        number_ratings: 153,
        labels: "Thriller, Action",
        availability_today: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
      },
      {
        img: "https://wallpaperaccess.com/full/1077148.jpg",
        title: "Movie 2",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat eum corrupti itaque sit? Voluptatum.",
        rating: 4.5,
        number_ratings: 153,
        labels: "Thriller, Action",
        availability_today: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
      },
      {
        img: "https://pbs.twimg.com/media/D2jvOdmUgAALnnx.jpg",
        title: "Movie 3",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat eum corrupti itaque sit? Voluptatum.",
        rating: 4.5,
        number_ratings: 153,
        labels: "Thriller, Action",
        availability_today: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
      },
      {
        img: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2018/01/koimoi-audience-poll-vote-favourite-hollywood-movie-2017-9.jpg",
        title: "Movie 4",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat eum corrupti itaque sit? Voluptatum.",
        rating: 4.5,
        number_ratings: 153,
        labels: "Thriller, Action",
        availability_today: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
      },
    ],
  }),
};
</script>
