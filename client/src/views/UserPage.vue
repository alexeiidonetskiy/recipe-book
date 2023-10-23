<template>
  <v-container>
    <h1>User Page to create recipe</h1>
    
    <v-btn-toggle v-model="fillDefault" class="mb-4">
      <v-btn :value="true">Fill with Lorem</v-btn>
      <v-btn :value="false">Clear Values</v-btn>
    </v-btn-toggle>
    
    <v-form @submit.prevent="createRecipe">
      <v-text-field
        v-model="recipe.title"
        label="Title"
        required
      ></v-text-field>
      <v-textarea
        v-model="recipe.description"
        label="Description"
        required
      ></v-textarea>
      <v-btn type="submit" color="primary">Create Recipe</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const recipe = ref({
      title: '',
      description: ''
    });
    const fillDefault = ref(false); // Initially set to true to fill default values

    const backToLogin = () => {
      router.push({ name: "Login" });
    }

    const createRecipe = async () => {
      // Prepare the data for the POST request
      const data = { 
        title: recipe.value.title,
        description: recipe.value.description,
      };
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);

        const response = await axios.post(
          "http://localhost:3000/recepies",
          data,
          {
            headers: { Authorization: token },
          }
        );

        router.push({ name: "FeedPage" });
        console.log("response", response);
      } catch (e) {
        console.error("Error creating post", e);
      }
    };

    // Watch the fillDefault ref and update the recipe values accordingly
    watch(fillDefault, (newFillDefault) => {
      if (newFillDefault) {
        // Fill default values
        recipe.value.title = 'Lorem ipsum dolor sit amet.';
        recipe.value.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa unde, vero consequuntur molestiae dolor error voluptates omnis aut similique delectus!';
      } else {
        // Clear values
        recipe.value.title = '';
        recipe.value.description = '';
      }
    });

    return {
      recipe,
      fillDefault,
      createRecipe,
      backToLogin
    };
  },
};
</script>
