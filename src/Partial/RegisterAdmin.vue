<!-- filepath: /d:/lessen/lessen all/Dashboard/src/pages/Register.vue -->
<template>
    <div class="w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div class="w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-3xl font-[Poppins] Poppins-600 text-center mb-6 text-gray-700">Register</h2>
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="relative">
            <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <div class="relative">
            <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-400 transition duration-300"
          >
            Register
          </button>
          <p v-if="error" class="text-gray-500 text-sm text-center">{{ error }}</p>
        </form>
        <button
          @click="goToLogin"
          class="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const username = ref("");
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const router = useRouter();
  
      const handleRegister = () => {
        if (username.value && email.value && password.value) {
          // Store user data in localStorage
          const user = {
            username: username.value,
            email: email.value,
            password: password.value,
          };
          localStorage.setItem("registeredUser", JSON.stringify(user));
          alert("Registration successful!");
          router.push({ name: "login" });
        } else {
          error.value = "Please fill in all fields";
        }
      };
  
      const goToLogin = () => {
        router.push({ name: "LoginPage" }); // Redirect to login page
      };
  
      return {
        username,
        email,
        password,
        error,
        handleRegister,
        goToLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  html, body, #app {
    height: 100%;
  }
  .relative i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .bg-gradient-to-r {
    background: linear-gradient(to right, #f0f0f0da, #bcb8b8da);
  }
  </style>