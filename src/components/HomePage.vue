<script setup>
import { ref, onMounted, computed } from "vue";
import { Chart, registerables } from "chart.js";
import PieChart from "../Props/pie_chart.vue";
import BarChart from "../Props/bar_chart.vue";
Chart.register(...registerables);
import { products, loadProducts, orders, loadOrders, getTotalSales } from "../backends/dataStorage.js";

const receipts = computed(() => {
  // Prefer orders total when orders exist
  const ordersTotal = getTotalSales();
  if (orders.value && orders.value.length) return ordersTotal;
  // fallback to product sum
  return products.value.reduce((sum, p) => sum + Number(p.price || 0), 0);
});

const replenishment = computed(() => products.value.length);

const numberOfChecks = computed(() => orders.value.length || products.value.length);

const averageCheck = computed(() => {
  const count = orders.value.length || products.value.length;
  return count ? receipts.value / count : 0;
});

onMounted(() => {
  loadProducts();
  loadOrders();
  createLineChart();
  createBarChart();
});

const createLineChart = () => {
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: [
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Monthly Sales",
          data: [3000, 4000, 3500, 7000, 13000, 9000, 5000],
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: true,
        },
      ],
    },
  });
};

const createBarChart = () => {
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales (USD)",
          data: [1200, 1900, 3000, 500, 2400, 2800, 3300],
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(99, 255, 132, 0.7)",
          ],
          borderColor: "rgba(0,0,0,0.1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen rounded-md font-[Dangrek]">
    <h2 class="text-3xl font-bold">Total Sales</h2>

    <div class="grid grid-cols-4 gap-4 my-6">
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-gray-600">ប្រាក់ចំណូល</p>
        <p class="text-lg font-bold">{{ receipts }}</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-gray-600">ចំនួនលក់</p>
        <p class="text-lg font-bold">{{ replenishment }}</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-gray-600">ចំនួនកុំព្យូទ័រ</p>
        <p class="text-lg font-bold">{{ numberOfChecks }}</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-gray-600">មធ្យមការលក់</p>
        <p class="text-lg font-bold">{{ averageCheck }}</p>
      </div>
    </div>

    <div class="h-screen grid grid-cols-2 gap-4 place-items-start">
      <!-- <canvas id="lineChart" class="bg-white p-4 rounded-lg shadow"></canvas> -->
      <div class="w-full h-full bg-white p-4 rounded-lg shadow">
        <canvas id="barChart" class="bg-white p-4 rounded-lg"></canvas>
      </div>
      <div class="w-full h-full bg-white p-4 rounded-lg shadow">
        <BarChart />
      </div>
      <div class="w-full h-full bg-white p-4 rounded-lg shadow">
        <PieChart />
      </div>
      <div class="w-full h-full bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-4">Product Inventory</h3>
        <div class="overflow-y-auto h-full">
          <table class="w-full text-sm">
        <thead class="bg-gray-200 sticky top-0">
          <tr>
            <th class="p-2 text-left">Product</th>
            <th class="p-2 text-left">Stock</th>
            <th class="p-2 text-left">Price</th>
            <th class="p-2 text-left">Total Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-2">{{ product.name }}</td>
            <td class="p-2">{{ product.quantity }}</td>
            <td class="p-2">${{ product.price }}</td>
            <td class="p-2">${{ product.quantity * product.price }}</td>
          </tr>
        </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100%;
  /* height: 300px; */
}
</style>
