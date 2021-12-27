<template>
  <v-parallax
    src="https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5"
    :height="screenHeight - 120"
  >
    <v-layout column align-center justify-center class="white--text">
      <h1
        class="white--text mb-2 display-1 text-xs-center"
        style="font-weight: 900; text-shadow: 3px 2px #000000"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>
      <div
        class="white--text subheading mb-3 text-xs-center"
        style="font-weight: 900; text-shadow: 2px 2px #000000"
      >
        Lorem ipsum dolor sit amet.
      </div>
      <v-btn class="secondary mt-5" dark large href="/movies"> Galeria </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: "Home",
  computed: {
    screenHeight: function () {
      return window.innerHeight;
    },
  },
};
</script>
