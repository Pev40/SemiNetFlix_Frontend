<template>
  <v-container>
    <edit-author
      :author="selectedAuthor"
      v-model="editOpen"
      v-on:input="editFinished"
    />
    <v-row>
      <v-col>
        <h1>Autores</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="(author, key) in authors" :key="key">
        <v-card class="mx-auto my-12" max-width="500">
          <v-card-title>{{ author.name }}</v-card-title>

          <v-card-text>
            <div># de películas: {{ author.n_movies }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="edit(author)">
              Editar
            </v-btn>
          </v-card-actions>
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
    authors: [
      { id: 1, name: "Autor 1", n_movies: 12 },
      { id: 2, name: "Autor 2", n_movies: 12 },
      { id: 3, name: "Autor 3", n_movies: 12 },
      { id: 4, name: "Autor 4", n_movies: 12 },
      { id: 5, name: "Autor 5", n_movies: 12 },
      { id: 6, name: "Autor 6", n_movies: 12 },
      { id: 7, name: "Autor 7", n_movies: 12 },
      { id: 8, name: "Autor 8", n_movies: 12 },
    ],
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
};
</script>
