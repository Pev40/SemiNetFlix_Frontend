<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="500">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png"
    ></v-img>

    <v-card-title>{{ movie.NombrePelicula }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">Cine: {{ movie.NombreCine }}</div>

      <div>
        <p>
          Duración: {{ parseInt(movie.Duracion / 60) }}h
          {{ movie.Duracion % 60 }}m
        </p>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Horario: {{ movie.HorarioInicio.slice(0, 5) }}</v-card-title>

    <!-- <v-card-text>
      <v-chip-group column color="info">
        <v-chip
          v-for="time in movie.availability_today"
          :key="time"
          color="info"
          :ripple="false"
          >{{ time }}</v-chip
        >
      </v-chip-group>
    </v-card-text> -->

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        {{ btnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: null,
  }),
  props: {
    movie: Object,
    btnText: {
      type: String,
      default: "Ver",
    },
  },

  methods: {
    reserve() {
      this.$emit("movie_clicked", this.movie);
      //   setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
