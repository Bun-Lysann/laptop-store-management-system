<template>
  <div class="order-page container mx-auto bg-white rounded-md shadow-md m-4 p-4">
    <header class="order-header text-center mb-4">
      <h1 class="text-2xl font-bold">Order Page</h1>
    </header>
    <section class="order-content">
      <div class="order-results" v-if="orderData.length">
        <!-- Add product by name/brand form -->
        <div class="mb-4 p-4 bg-gray-50 rounded">
          <h3 class="font-semibold mb-2">Add product to order</h3>
          <div class="flex space-x-2">
            <input v-model="search" placeholder="Search product or brand" class="p-2 border rounded w-1/3" />
            <select v-model="selectedSerial" class="p-2 border rounded w-1/2">
              <option value="">-- Select product --</option>
              <option v-for="p in filteredProducts" :key="p.serial" :value="p.serial">{{ p.name }} — {{ p.category || p.brand || '' }}</option>
            </select>
            <input type="number" v-model.number="quantity" min="1" class="p-2 border rounded w-20" />
            <button @click="handleAddToCart" class="bg-blue-500 text-white px-4 rounded">Add</button>
          </div>
        </div>
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
import { orders, loadOrders, saveOrders, products, loadProducts, addToCart } from "../backends/dataStorage.js";

const router = useRouter();

onMounted(() => {
  loadOrders();
});

// load products for add form
onMounted(() => {
  loadProducts();
});

const orderData = computed(() => orders.value);

// Add-product form state
const search = ref('');
const selectedSerial = ref('');
const quantity = ref(1);

const filteredProducts = computed(() => {
  const q = (search.value || '').toLowerCase();
  return products.value.filter(p => {
    if (!q) return true;
    return (p.name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q) || (p.serial || '').toLowerCase().includes(q);
  });
});

const handleAddToCart = () => {
  if (!selectedSerial.value) return alert('Select a product to add');
  const prod = products.value.find(p => p.serial === selectedSerial.value || p.id === selectedSerial.value);
  if (!prod) return alert('Product not found');
  addToCart({ ...prod, quantity: Number(quantity.value || 1) });
  alert(`Added ${prod.name} x${quantity.value} to cart`);
};

// Update the quantity of a product
const updateQuantity = (order, change) => {
  const list = orders.value || [];
  const product = list.find((p) => (p.id && p.id === order.id) || (p.serial && p.serial === order.serial));
  if (product) {
    product.quantity = Math.max(1, Number(product.quantity || 0) + change);
    saveOrders();
  }
};

// Remove an order from the list
const removeOrder = (index) => {
  orders.value.splice(index, 1);
  saveOrders();
};

// Compute the total price based on quantity and price
const totalPrice = computed(() => {
  return (orderData.value.reduce((total, order) => {
    return total + Number(order.price || 0) * Number(order.quantity || 0);
  }, 0)).toFixed(2);
});

// Redirect to payment page
const proceedToPayment = () => {
  // You can send the order data or the total price to the payment page if needed
  router.push({ name: 'PaymentPage' });
};
</script>
