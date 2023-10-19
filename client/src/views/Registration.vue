<template>
 <v-card class="register-form">
    <v-card-title class="text-center">Register</v-card-title>
    <v-card-text>
   
      <v-form @submit.prevent="registerUser">
        <v-text-field v-model="userData.username" label="Username" required></v-text-field>
        <v-text-field v-model="userData.email" label="Email" required></v-text-field>
        <v-text-field v-model="userData.password" label="Password" required type="password"></v-text-field>
        <v-btn type="submit" color="primary">Register</v-btn>
      </v-form>
    </v-card-text>
 </v-card>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const userData = ref({
      username: "",
      email: "",
      password: "",
    });

    const registerUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register", // Replace with your API endpoint
          userData.value
        );

        // Handle successful registration
        console.log("Registration successful:", response.data);
        router.push({ name: "Login" });
      } catch (error) {
        // Handle registration error
        console.error("Registration error:", error);
      }
    };

    return {
      userData,
      registerUser,
    };
  },
};
</script>

<style scoped>
.register-form {
  max-width: 300px;
  margin: 0 auto;
}
</style>