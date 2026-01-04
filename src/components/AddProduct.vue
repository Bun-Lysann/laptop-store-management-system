<script setup>
import { ref, onMounted } from "vue";

// Reactive product list
const products = ref([]);

// New product form
const newProduct = ref({
  name: "",
  serial: "",
  ram: "",
  storage: "",
  cpu: "",
  gpu: "",
  display: "",
  battery: "",
  price: "",
  dateRelease: "",
  image: "",
  category: "",
});

// Load products from localStorage
const loadProducts = () => {
  products.value = JSON.parse(localStorage.getItem("products")) || [];
};

// Save products to localStorage
const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      newProduct.value.image = reader.result; // Convert image to base64
    };
    reader.readAsDataURL(file);
  }
};

// Add a new product
const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.serial) {
    alert("Product Name and Serial Code are required!");
    return;
  }

  products.value.push({ ...newProduct.value });
  saveProducts(); // Update localStorage
  resetForm();
};

// Reset form (Cancel button functionality)
const resetForm = () => {
  newProduct.value = {
    name: "",
    serial: "",
    ram: "",
    storage: "",
    cpu: "",
    gpu: "",
    display: "",
    battery: "",
    price: "",
    dateRelease: "",
    image: "",
    category: "",
  };
};

// Load data when the component mounts
onMounted(loadProducts);
</script>

<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
    <h2 class="text-2xl font-semibold text-center mb-6">Add New Product</h2>
    <!-- Form Inputs -->
    <div class="space-y-3">
      <!-- Image Preview -->
      <div v-if="newProduct.image" class="flex justify-center">
        <img :src="newProduct.image" alt="Preview" class="w-24 h-24 rounded-lg object-cover" />
      </div>

        <!-- Form Inputs -->
        <div class="flex space-x-2">
          <input v-model="newProduct.name" type="text" placeholder="Product Name" class="w-full p-2 border rounded" />
          <input v-model="newProduct.serial" type="text" placeholder="Serial Code" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="newProduct.ram" type="text" placeholder="RAM (e.g., 16GB)" class="w-full p-2 border rounded" />
          <input v-model="newProduct.storage" type="text" placeholder="Storage (e.g., 512GB SSD)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="newProduct.cpu" type="text" placeholder="CPU (e.g., Intel i7)" class="w-full p-2 border rounded" />
          <input v-model="newProduct.gpu" type="text" placeholder="GPU (e.g., RTX 5090)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="newProduct.display" type="text" placeholder="Display (e.g., 15.6-inch 1080p)" class="w-full p-2 border rounded" />
          <input v-model="newProduct.battery" type="text" placeholder="Battery (e.g., 5000mAh)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="newProduct.price" type="number" placeholder="Price ($)" class="w-full p-2 border rounded" />
          <input v-model="newProduct.dateRelease" type="date" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <div>
              <select v-model="newProduct.category" class="w-full p-2 px-4 border rounded">
              <option class="" value="Computer">Computer</option>
              <option class="" value="Laptop">Laptop</option>
              <option class="" value="Accessories">Accessories</option>
            </select>
          </div>
          <!-- File Upload Input -->
          <input type="file" accept="image/*" @change="handleImageUpload" class="w-full p-2 border rounded" />
        </div>
    </div>
    
    <!-- Buttons -->
    <div class="w-full flex space-x-2 mt-4 justify-end">
        <button @click="resetForm" class="bg-gray-500 text-white p-6 py-2 rounded-lg hover:bg-gray-600 transition">
            Cancel
        </button>
        <button @click="addProduct" class="bg-blue-500 text-white p-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add Product
        </button>
    </div>
  </div>
</template>