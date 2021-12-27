<template>
  <div>
    <v-parallax
      src="https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
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
      </v-layout>
    </v-parallax>
    <v-container class="mb-10 mt-4">
      <v-row>
        <v-col cols="12">
          <h1>Nosotros</h1>
          <hr />
        </v-col>
        <v-col cols="12">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            facilis at ullam incidunt quos! Blanditiis, accusantium! Ad harum,
            dignissimos ipsum, eius totam recusandae fugiat eum eveniet sapiente
            velit quod consequatur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            ducimus beatae, quaerat voluptatem doloribus praesentium culpa
            reprehenderit iusto quia quas aut possimus. Nihil vitae ducimus
            harum quaerat, quis eveniet cupiditate?
          </p>
        </v-col>
        <v-col cols="4">
          <v-card>
            <div class="text-center">
              <v-icon size="50" color="secondary">mdi-earth</v-icon>
            </div>
            <v-card-text
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              at doloribus possimus natus tempora corrupti culpa quod officia
              harum maxime qui dolorem quos aliquid ex, explicabo, dignissimos
              ab deleniti quas!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <div class="text-center">
              <v-icon size="50" color="secondary">mdi-hand-coin</v-icon>
            </div>
            <v-card-text
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              at doloribus possimus natus tempora corrupti culpa quod officia
              harum maxime qui dolorem quos aliquid ex, explicabo, dignissimos
              ab deleniti quas!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <div class="text-center">
              <v-icon size="50" color="secondary">mdi-eye</v-icon>
            </div>
            <v-card-text
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              at doloribus possimus natus tempora corrupti culpa quod officia
              harum maxime qui dolorem quos aliquid ex, explicabo, dignissimos
              ab deleniti quas!</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    screenHeight: function () {
      return window.innerHeight;
    },
  },
};
</script>
