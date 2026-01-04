<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const receipts = ref(0);
const replenishment = ref(0.0);
const numberOfChecks = ref(0);
const averageCheck = ref(0);

onMounted(() => {
  // createLineChart();
});

const createLineChart = () => {
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Monthly Sales',
        data: [3000, 4000, 3500, 7000, 13000, 9000, 5000],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
      }]
    },
  });
};
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen rounded-md">
    <h2 class="text-3xl font-bold">Sales</h2>
    
    <div class="grid grid-cols-4 gap-4 my-6">
      <div class="p-4 bg-orange-100 rounded-lg">
        <p class="text-gray-600">ប្រាក់ចំណូល</p>
        <p class="text-lg font-bold">{{ receipts }}</p>
      </div>
      <div class="p-4 bg-green-100 rounded-lg">
        <p class="text-gray-600">ចំនួនលក់</p>
        <p class="text-lg font-bold">{{ replenishment }}</p>
      </div>
      <div class="p-4 bg-purple-100 rounded-lg">
        <p class="text-gray-600">Number of Checks</p>
        <p class="text-lg font-bold">{{ numberOfChecks }}</p>
      </div>
      <div class="p-4 bg-blue-100 rounded-lg">
        <p class="text-gray-600">Average Check</p>
        <p class="text-lg font-bold">{{ averageCheck }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-3 gap-4">
      <canvas id="lineChart" class="bg-white p-4 rounded-lg shadow"></canvas>
    </div>
  </div>
</template>

<style scoped>
  canvas {
    height: 300px;
  }
</style>
