<template>
  <div>
    <!-- Recipe Feed Content -->
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="recipe in recipes" :key="recipe.id">
          <v-card>
            <v-img :src="recipe.image || recipePlaceholder" height="200px" cover></v-img>
            <v-card-title>{{ recipe.title }}</v-card-title>
            <v-card-subtitle>Author: {{ recipe.createdBy.username }}</v-card-subtitle>
            <v-card-text>{{ recipe.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import recipePlaceholder from '@/assets/recipe-placeholder.jpeg';
export default {
  setup() {
    const recipes = ref([]);

    const fetchRecipes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/recepies", {
        headers: { Authorization: token },
      });
      const data = await response.json();
      recipes.value = data;
    };

    onMounted(() => {
      fetchRecipes();
    });

    return { recipes, recipePlaceholder };
  },
};
</script>
