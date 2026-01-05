<template>
  <div class="w-full container mx-auto absolute m-4 bg-white rounded-md shadow-lg font-[Poppins]">
    <div class="m-4 place-content-center">
      <div class="flex w-full relative">
        <div class="w-1/2 flex justify-start p-2 items-center">
          <label class="font-[Poppins] Poppins-600">Product Card</label>
        </div>
        <div class="w-1/2 flex justify-end p-2 items-center">
          <button @click="isAddProductModalOpen = true" class="bg-blue-500 py-2 px-4 text-white rounded-md shadow-md">
            ADD
          </button>
        </div>
      </div>
    </div>

    <!-- Product Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <div v-for="(product, index) in products" :key="index" class="bg-white shadow-md rounded-lg overflow-hidden">
        <img v-if="product.image" :src="product.image" alt="Product Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-gray-600">Serial: {{ product.serial }}</p>
          <p class="text-gray-600">RAM: {{ product.ram }}</p>
          <p class="text-gray-600">Storage: {{ product.storage }}</p>
          <p class="text-gray-600">CPU: {{ product.cpu }}</p>
          <p class="text-gray-600">GPU: {{ product.gpu }}</p>
          <div class="mt-4 flex justify-between items-center">
          <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
            <div class="space-x-1">
              <button @click="removeProduct(product.serial)" class="bg-red-500 text-white px-4 py-1 shadow-md rounded-md hover:bg-red-600">
                <img src="../image/icon/delete (2).png" alt="" class="w-6 h-6">
              </button>
              <button @click="addOrder(product)" class="bg-green-500 text-white px-4 py-1 shadow-md rounded-md hover:bg-green-600" >
                <img src="../image/icon/add-to-basket.png" alt="" class="w-6 h-6">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Product Modal -->
  <div v-if="isAddProductModalOpen" class="absolute inset-0 flex items-center justify-center bg-opacity-50">
    <div class="w-1/3 bg-white rounded-md shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Add Product</h2>

      <!-- Add Product Form -->
      <div class="flex space-x-2">
        <input type="file" accept="image/*" @change="handleImageUpload" class="w-full p-2 border rounded mb-3">
        <input v-model="newProduct.name" type="text" placeholder="Enter Name" class="w-full p-2 border rounded mb-3">
      </div>
      <div class="flex space-x-2">
        <input v-model="newProduct.serial" type="text" placeholder="Enter Serial Code" class="w-full p-2 border rounded mb-3">
        <input v-model="newProduct.ram" type="text" placeholder="Enter RAM (e.g., 16GB)" class="w-full p-2 border rounded mb-3">
      </div>
      <div class="flex space-x-2">
        <input v-model="newProduct.storage" type="text" placeholder="Enter Storage (e.g., 512GB SSD)" class="w-full p-2 border rounded mb-3">
        <input v-model="newProduct.cpu" type="text" placeholder="Enter CPU (e.g., Intel i7)" class="w-full p-2 border rounded mb-3">
      </div>
      <div class="flex space-x-2">
        <input v-model="newProduct.gpu" type="text" placeholder="Enter GPU (e.g., RTX 3060)" class="w-full p-2 border rounded mb-3">
        <input v-model="newProduct.price" type="number" placeholder="Enter Price" class="w-full p-2 border rounded mb-3">
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="isAddProductModalOpen = false" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Cancel
        </button>
        <button @click="addProduct" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  products,
  newProduct,
  addData,
  handleImageUpload,
  deleteData,
  loadProducts,
  resetForm,
  addToCart,
} from "../backends/dataStorage.js";

// Modal state
const isAddProductModalOpen = ref(false);

// Add order (keeps previous behavior)
const addOrder = (product) => {
  try {
    addToCart({ ...product, quantity: 1 });
    alert(`Added to cart: ${product.name}`);
  } catch (err) {
    alert(err?.message || 'Failed to add to cart');
  }
};

// Add a new product using centralized storage
const addProduct = () => {
  try {
    addData();
    alert("Product added successfully");
    resetForm();
    isAddProductModalOpen.value = false;
  } catch (err) {
    alert(err?.message || "Failed to add product");
  }
};

// Remove a product by serial using centralized storage
const removeProduct = (serial) => {
  if (confirm("Are you sure you want to remove this product?")) {
    const ok = deleteData(serial);
    if (!ok) alert("Product not found");
  }
};

onMounted(() => {
  loadProducts();
});
</script>
