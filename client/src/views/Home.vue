<template>
  <HelloWorld />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
const router = useRouter();
onMounted(() => {
  if (token) {

    redirectToFeed();
  } else {
   
    redirectToLogin();
  }
});

function redirectToFeed() {
  router.push({ name: "FeedPage" })
}

function redirectToLogin() {
   router.push({ name: "Login" })
}
</script>
