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
              <button @click="removeProduct(index)" class="bg-red-500 text-white px-4 py-1 shadow-md rounded-md hover:bg-red-600">
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
  price: "",
  image: "",
});

// Modal state
const isAddProductModalOpen = ref(false);

// Load products from localStorage
const loadProducts = () => {
  const storedProducts = localStorage.getItem("products");
  products.value = storedProducts ? JSON.parse(storedProducts) : [];
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
const addOrder = (product) => {
  // Retrieve existing orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  // Check if the product is already in the orders
  const existingProduct = orders.find((order) => order.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase the quantity
    existingProduct.quantity++;
  } else {
    // If it's a new product, add it to the orders array with quantity 1
    orders.push({ ...product, quantity: 1 });
  }

  // Save the updated orders to localStorage
  localStorage.setItem('orders', JSON.stringify(orders));
  
  alert(`You have purchased: ${product.name} for $${product.price}`);
};

// Add a new product
const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.serial || !newProduct.value.price) {
    alert("Product Name, Serial Code, and Price are required!");
    return;
  }

  products.value.push({ ...newProduct.value });
  saveProducts(); // Update localStorage

  // Clear form and close modal
  newProduct.value = { name: "", serial: "", ram: "", storage: "", cpu: "", gpu: "", price: "", image: "" };
  isAddProductModalOpen.value = false;
};

// Remove a product
const removeProduct = (index) => {
  if (confirm("Are you sure you want to remove this product?")) {
    products.value.splice(index, 1);
    saveProducts(); // Update localStorage
  }
};

// Load data when the component mounts
onMounted(loadProducts);
</script>
