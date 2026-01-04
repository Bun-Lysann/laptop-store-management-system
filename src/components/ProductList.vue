<script setup>
import { ref, onMounted } from "vue";

// Reactive product list
const products = ref([]);

// Temporary product for editing
const editProduct = ref({
  index: null,
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
});

// Controls modal visibility
const isEditModalOpen = ref(false);

// Load products from localStorage on mount
const loadProducts = () => {
  products.value = JSON.parse(localStorage.getItem("products")) || [];
};

// Save products to localStorage
const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};

// Delete a product
const deleteProduct = (index) => {
  if (confirm("Are you sure you want to delete this product?")) {
    products.value.splice(index, 1);
    saveProducts(); // Update localStorage
  }
};

// Open the edit modal and set the current product
const openEditModal = (index) => {
  editProduct.value = { ...products.value[index], index };
  isEditModalOpen.value = true;
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      editProduct.value.image = reader.result; // Convert image to base64
    };
    reader.readAsDataURL(file);
  }
};

// Save edited product
const updateProduct = () => {
  const index = editProduct.value.index;
  products.value[index] = { ...editProduct.value };
  delete products.value[index].index; // Remove extra property
  saveProducts(); // Update localStorage
  isEditModalOpen.value = false; // Close modal
};

// Run when component is mounted
onMounted(loadProducts);
</script>

<template>
  <div class="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl font-[Poppins]">
    <h2 class="text-2xl font-semibold text-center mb-4">Product List</h2>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200 text-sm">
          <th class="border p-2">Image</th>
          <th class="border p-2">Name</th>
          <th class="border p-2">Serial</th>
          <th class="border p-2">RAM</th>
          <th class="border p-2">Storage</th>
          <th class="border p-2">CPU</th>
          <th class="border p-2">GPU</th>
          <th class="border p-2">Display</th>
          <th class="border p-2">Battery</th>
          <th class="border p-2">Price</th>
          <th class="border p-2">Date Release</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index" class="text-center text-sm">
          <td class="border p-2">
            <img v-if="product.image" :src="product.image" alt="Product Image" class="w-8 h-8 rounded-lg object-cover mx-auto" />
            <span v-else class="text-gray-400">No Image</span>
          </td>
          <td class="border p-2">{{ product.name }}</td>
          <td class="border p-2">{{ product.serial }}</td>
          <td class="border p-2">{{ product.ram }}</td>
          <td class="border p-2">{{ product.storage }}</td>
          <td class="border p-2">{{ product.cpu }}</td>
          <td class="border p-2">{{ product.gpu }}</td>
          <td class="border p-2">{{ product.display }}</td>
          <td class="border p-2">{{ product.battery }}</td>
          <td class="border p-2">${{ product.price }}</td>
          <td class="border p-2">{{ product.dateRelease }}</td>
          <td class="border p-2 flex justify-center space-x-2">
            <button @click="openEditModal(index)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              Edit
            </button>
            <button @click="deleteProduct(index)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              <img src="../image/icon/delete (2).png" alt="" class="w-6 h-6 ">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Edit Product Modal -->
  <div v-if="isEditModalOpen" class="absolute container mt-40 inset-0 flex items-center justify-center bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 class="text-xl font-semibold mb-4">Edit Product</h3>

      <div class="space-y-3">

        <!-- Image Preview -->
        <div v-if="editProduct.image" class="flex justify-center">
          <img :src="editProduct.image" alt="Preview" class="w-24 h-24 rounded-lg object-cover" />
        </div>

        <!-- Form Inputs -->
        <div class="flex space-x-2">
          <input v-model="editProduct.name" type="text" placeholder="Product Name" class="w-full p-2 border rounded" />
          <input v-model="editProduct.serial" type="text" placeholder="Serial Code" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="editProduct.ram" type="text" placeholder="RAM (e.g., 16GB)" class="w-full p-2 border rounded" />
          <input v-model="editProduct.storage" type="text" placeholder="Storage (e.g., 512GB SSD)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="editProduct.cpu" type="text" placeholder="CPU (e.g., Intel i7)" class="w-full p-2 border rounded" />
          <input v-model="editProduct.gpu" type="text" placeholder="GPU (e.g., RTX 3060)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="editProduct.display" type="text" placeholder="Display (e.g., 15.6-inch 1080p)" class="w-full p-2 border rounded" />
          <input v-model="editProduct.battery" type="text" placeholder="Battery (e.g., 5000mAh)" class="w-full p-2 border rounded" />
        </div>
        <div class="flex space-x-2">
          <input v-model="editProduct.price" type="number" placeholder="Price ($)" class="w-full p-2 border rounded" />
          <input v-model="editProduct.dateRelease" type="date" class="w-full p-2 border rounded" />
        </div>

        <!-- File Upload Input -->
        <input type="file" accept="image/*" @change="handleImageUpload" class="w-full p-2 border rounded" />
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button @click="isEditModalOpen = false" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
          Cancel
        </button>
        <button @click="updateProduct" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  </div>
</template>