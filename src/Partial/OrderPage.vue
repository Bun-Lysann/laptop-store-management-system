<template>
  <div class="order-page container mx-auto bg-white rounded-md shadow-md m-4 p-4">
    <header class="order-header text-center mb-4">
      <h1 class="text-2xl font-bold">Order Page</h1>
    </header>
    <section class="order-content">
      <div class="order-results" v-if="orderData.length">
        <h2 class="text-xl font-semibold mb-2">Order Results</h2>
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Product Name</th>
              <th class="py-2 px-4 border-b">Quantity</th>
              <th class="py-2 px-4 border-b">Price</th>
              <th class="py-2 px-4 border-b">Total Price</th>
              <th class="py-2 px-4 border-b">Order Date</th>
              <th class="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orderData" :key="index">
              <td class="py-5 px-4 border-b text-center">{{ order.name }}</td>
              <td class="py-2 px-4 border-b text-center">
                <button
                  @click="updateQuantity(order, -1)"
                  :disabled="order.quantity <= 1"
                  class="bg-gray-400 text-white px-2 py-1 rounded-md"
                >
                  -
                </button>
                {{ order.quantity }}
                <button
                  @click="updateQuantity(order, 1)"
                  class="bg-gray-400 text-white px-2 py-1 rounded-md"
                >
                  +
                </button>
              </td>
              <td class="py-2 px-4 border-b text-center">{{ order.price }}$</td>
              <td class="py-2 px-4 border-b text-center">{{ (order.price * order.quantity).toFixed(2) }}$</td>
              <td class="py-2 px-4 border-b text-center">
                {{ new Date().toLocaleDateString() }}
              </td>
              <td class="py-2 px-4 border-b text-center">
                <button
                  @click="removeOrder(index)"
                  class="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex justify-center">
          <div class="font-bold text-xl">
            Total: ${{ totalPrice }}
          </div>
        </div>
        <div class="mt-4 flex justify-center">
          <button
            @click="proceedToPayment"
            class="bg-green-500 text-white px-6 py-3 rounded-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-lg">No orders yet. Please add some products!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';

const orderData = ref([]);
const router = useRouter();

// Retrieve the orders from localStorage when the component is mounted
onMounted(() => {
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  orderData.value = storedOrders;
});

// Update the quantity of a product
const updateQuantity = (order, change) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const product = orders.find((p) => p.id === order.id);
  if (product) {
    product.quantity += change;
    if (product.quantity < 1) product.quantity = 1; // Prevent quantity from being less than 1
    localStorage.setItem("orders", JSON.stringify(orders));

    // Update the UI
    orderData.value = [...orders];
  }
};

// Remove an order from the list
const removeOrder = (index) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Update the UI
  orderData.value = [...orders];
};

// Compute the total price based on quantity and price
const totalPrice = computed(() => {
  return orderData.value.reduce((total, order) => {
    return total + order.price * order.quantity;
  }, 0).toFixed(2); // Ensure the total is rounded to 2 decimal places
});

// Redirect to payment page
const proceedToPayment = () => {
  // You can send the order data or the total price to the payment page if needed
  router.push('/payment'); // Assuming you have a '/payment' route configured for the payment page
};
</script>
