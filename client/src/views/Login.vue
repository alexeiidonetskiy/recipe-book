<template>
  <v-card class="login-form">
    <v-card-title class="text-center">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          label="Email"
          type="mail"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          required
          type="password"
        ></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'; // Import Axios for HTTP requests
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      // Prepare the data to send to the server
      const data = {
        email: email.value,
        password: password.value,
      };

      try {
        // Make a POST request to your server's login endpoint
        const response = await axios.post('http://localhost:3000/auth/login', data);

        if (response.status === 200) {
          // Authentication was successful, you can redirect the user or perform other actions
          localStorage.setItem('token', response.data.token);
          router.push({ name: 'UserPage' })
        } else {
          // Handle login errors, e.g., show an error message
          console.error('Login failed:', response.data);
        }
      } catch (error) {
        // Handle network errors
        console.error('An error occurred during login:', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
}
</style>
