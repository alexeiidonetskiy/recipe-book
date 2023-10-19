<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      Recipe book
    </v-app-bar-title>
    
    <v-spacer></v-spacer> <!-- Add spacer to push buttons to the right -->

    <template v-if="!token">
      <!-- Show the "Login" button when there's no token -->
      <v-btn @click="login">Login</v-btn>
      <v-btn @click="register">Register</v-btn>
    </template>

    <template v-else>
      <!-- Show the "Create Recipe" and "Open Feed" buttons when a token is present -->
      <v-btn @click="createRecipe">Create Recipe</v-btn>
      <v-btn @click="openFeed">Open Feed</v-btn>
      <v-btn @click="logout">Log out</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';

const token = localStorage.getItem('token'); // Assuming you have a ref to store the token
const router = useRouter();

const login = () => {
  router.push({ name: 'Login'});
};

const logout = () => {
  localStorage.removeItem('token');
  login();
};

const register = () => {
  router.push({ name: 'Registration'});
};

const createRecipe = () => {
  router.push({ name: 'UserPage' });
};

const openFeed = () => {
  router.push({ name: 'FeedPage' });
};
</script>
