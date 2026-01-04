<template>
    <div class="w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div class="w-90 bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="relative">
            <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md  transition duration-300"
          >
            Login
          </button>
          <p v-if="error" class="text-gray-500 text-sm text-center">{{ error }}</p>
        </form>
        <router-link
          to="/Register"
          class="w-full py-3 mt-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300 text-center block"
        >
          Register
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const username = ref("");
      const password = ref("");
      const error = ref("");
      const router = useRouter();
  
      const handleLogin = () => {
        const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
        if (registeredUser && username.value === registeredUser.username && password.value === registeredUser.password) {
          localStorage.setItem('authToken', 'your-auth-token'); // Set auth token
          router.push({ name: "Dashboard" }); // Redirect to home under dashboard
        } else {
          error.value = "Invalid username or password";
        }
      };
  
      return {
        username,
        password,
        error,
        handleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  html, body, #app {
    height: 100%;
  }
  
  .login-container {
    width: 100%;
    max-width: 320px;
  }
  
  .relative i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .bg-gradient-to-r {
    background: linear-gradient(to right, #7b7b79da, #7b7b7bda);
  }
  </style>