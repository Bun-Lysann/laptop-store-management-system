<template>
  <div class="container mx-auto bg-white rounded-md shadow-md m-4 p-4">
    <header class="text-center mb-4">
      <h1 class="text-2xl font-bold">Purchase Report</h1>
    </header>

    <section v-if="purchaseDetails.length">
      <h2 class="text-xl font-semibold mb-2">Purchase Summary</h2>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-2 px-4 border-b">Product Name</th>
            <th class="py-2 px-4 border-b">Quantity</th>
            <th class="py-2 px-4 border-b">Price</th>
            <th class="py-2 px-4 border-b">Total Price</th>
            <th class="py-2 px-4 border-b">Name on Card</th>
            <th class="py-2 px-4 border-b">Expiration Date</th>
            <th class="py-2 px-4 border-b">Actions</th> <!-- Added column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in purchaseDetails" :key="index">
            <td class="py-2 px-4 border-b text-center">{{ order.name }}</td>
            <td class="py-2 px-4 border-b text-center">{{ order.quantity }}</td>
            <td class="py-2 px-4 border-b text-center">{{ order.price }}$</td>
            <td class="py-2 px-4 border-b text-center">{{ (order.price * order.quantity).toFixed(2) }}$</td>
            <td class="py-2 px-4 border-b text-center">{{ order.nameOnCard }}</td>
            <td class="py-2 px-4 border-b text-center">{{ order.expiryDate }}</td>
            <td class="py-2 px-4 border-b text-center">
             
              <button @click="deletePurchase(index)" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-else>
      <p>No purchases made yet.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const purchaseDetails = ref([]);

// Retrieve purchase details from localStorage
onMounted(() => {
  const storedPurchases = JSON.parse(localStorage.getItem("purchaseDetails")) || [];
  purchaseDetails.value = storedPurchases;
});

// Edit purchase


// Delete purchase
const deletePurchase = (index) => {
  // Remove purchase from the list
  purchaseDetails.value.splice(index, 1);
  // Save the updated list to localStorage
  localStorage.setItem("purchaseDetails", JSON.stringify(purchaseDetails.value));
};
</script>