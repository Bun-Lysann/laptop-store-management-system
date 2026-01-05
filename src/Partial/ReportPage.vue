<template>
  <div class="container mx-auto bg-white rounded-md shadow-md m-4 p-4">
    <header class="text-center mb-4">
      <h1 class="text-2xl font-bold">Purchase Report / Letter</h1>
    </header>

    <div class="grid grid-cols-2 gap-6">
      <!-- Form -->
      <div class="p-4 bg-gray-50 rounded">
        <h2 class="text-lg font-semibold mb-2">Compose Letter</h2>
        <div class="space-y-3">
          <div>
            <label class="block text-sm">Title</label>
            <input v-model="reportTitle" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm">Recipient</label>
            <input v-model="recipient" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm">Date</label>
            <input v-model="reportDate" type="date" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm">Introduction</label>
            <textarea v-model="introduction" class="w-full p-2 border rounded" rows="3"></textarea>
          </div>
          <div>
            <label class="block text-sm">Body</label>
            <textarea v-model="body" class="w-full p-2 border rounded" rows="6"></textarea>
          </div>
          <div>
            <label class="block text-sm">Footer / Signature</label>
            <input v-model="footer" class="w-full p-2 border rounded" />
          </div>
          <div class="flex items-center space-x-2">
            <input type="checkbox" id="include" v-model="includePurchases" />
            <label for="include">Include purchase table in report</label>
          </div>
          <div class="flex space-x-2">
            <button @click="generateLetter" class="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
            <button @click="printReport" class="bg-green-600 text-white px-4 py-2 rounded">Print</button>
            <button @click="exportPDF" class="bg-gray-600 text-white px-4 py-2 rounded">Export PDF</button>
          </div>
        </div>
      </div>

      <!-- Preview / Printable area -->
          <div class="p-4 bg-white rounded printable" id="printableArea">
            <div class="border p-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <img v-if="companyLogo" :src="companyLogo" alt="logo" class="w-24 h-24 object-contain" />
                </div>
                <div class="text-right">
                  <h2 class="text-xl font-bold mb-2">{{ reportTitle || 'Report' }}</h2>
                  <div class="text-sm text-gray-600">Date: {{ formattedDate }}</div>
                </div>
              </div>
              <div class="text-sm text-gray-600 mb-4">To: {{ recipient }}</div>
          <div class="mb-4"><strong>Introduction:</strong>
            <p class="whitespace-pre-line">{{ introduction }}</p>
          </div>
          <div class="mb-4"><strong>Details:</strong>
            <p class="whitespace-pre-line">{{ body }}</p>
          </div>

          <div v-if="includePurchases && reportItems.length">
            <h3 class="font-semibold mb-2">Sales Summary</h3>
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th class="border px-2 py-1">Product</th>
                  <th class="border px-2 py-1">Qty</th>
                  <th class="border px-2 py-1">Price</th>
                  <th class="border px-2 py-1">Total</th>
                  <th class="border px-2 py-1">Sale Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, i) in reportItems" :key="i">
                  <td class="border px-2 py-1">{{ p.name }}</td>
                  <td class="border px-2 py-1 text-center">{{ p.quantity }}</td>
                  <td class="border px-2 py-1 text-right">${{ Number(p.price).toFixed(2) }}</td>
                  <td class="border px-2 py-1 text-right">${{ (Number(p.price) * Number(p.quantity)).toFixed(2) }}</td>
                  <td class="border px-2 py-1 text-right">{{ p.saleDate }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="px-2 py-1 font-semibold" colspan="3">Grand Total</td>
                  <td class="border px-2 py-1 text-right font-semibold" colspan="2">${{ grandTotal }}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="mt-6">{{ footer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { sales, loadSales, getSalesTotal, loadPayments } from '../backends/dataStorage.js';

// Form fields
const reportTitle = ref('Purchase Report');
const recipient = ref('Customer');
const reportDate = ref(new Date().toISOString().slice(0,10));
const introduction = ref('');
const body = ref('');
const footer = ref('Regards,\nStore Manager');
const includePurchases = ref(true);

// company logo (optional)
const companyLogo = ref('../image/icon/vecteezy_computer.jpg');

// Load sales from centralized storage
onMounted(() => {
  loadSales();
  loadPayments();
});

const salesList = computed(() => sales.value || []);

const reportItems = computed(() => {
  // flatten sale items with sale metadata
  return salesList.value.flatMap(s => (s.items || []).map(it => ({ ...it, saleId: s.id, saleDate: s.date })));
});

const formattedDate = computed(() => {
  return reportDate.value ? new Date(reportDate.value).toLocaleDateString() : '';
});

const grandTotal = computed(() => getSalesTotal().toFixed(2));

const generateLetter = () => {
  // ensure latest sales are loaded
  loadSales();
};

const printReport = () => {
  const contentEl = document.getElementById('printableArea');
  if (!contentEl) return window.print();
  const newWin = window.open('', '_blank', 'width=900,height=700');
  const styles = `
    <style>
      @page { size: Letter; margin: 1in; }
      body { font-family: Arial, sans-serif; padding: 0; margin: 0; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ddd; padding: 8px; }
      th { background: #f3f3f3; }
      img { max-width: 200px; }
    </style>
  `;
  newWin.document.write(`<html><head><title>${reportTitle.value}</title>${styles}</head><body>${contentEl.innerHTML}</body></html>`);
  newWin.document.close();
  newWin.focus();
  setTimeout(() => {
    newWin.print();
    newWin.close();
  }, 250);
};

const exportPDF = () => printReport();

</script>

<style scoped>
/* Print styles: only show the printable area */
@media print {
  body * { visibility: hidden; }
  #printableArea, #printableArea * { visibility: visible; }
  #printableArea { position: absolute; left: 0; top: 0; width: 100%; }
}
</style>