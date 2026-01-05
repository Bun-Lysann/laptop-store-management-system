<template>
    <div class="w-[50%] payment-page container mx-auto bg-white rounded-md shadow-md m-4 p-4">
      <header class="payment-header text-center mb-4">
        <h1 class="text-2xl font-bold">Payment Page</h1>
      </header>
      <section class="payment-content">
        <div class="payment-form">
          <h2 class="text-xl font-semibold mb-2">Payment Details</h2>
          <form @submit.prevent="handlePayment">
            <label class="block mb-2">Name on Card:</label>
            <input type="text" v-model="paymentDetails.name" class="border p-2 w-full mb-4" required />
  
            <label class="block mb-2">Card Number:</label>
            <input type="text" v-model="paymentDetails.cardNumber" class="border p-2 w-full mb-4" required />
  
            <label class="block mb-2">Expiration Date:</label>
            <input type="month" v-model="paymentDetails.expiryDate" class="border p-2 w-full mb-4" required />
  
            <label class="block mb-2">CVV:</label>
            <input type="text" v-model="paymentDetails.cvv" class="border p-2 w-full mb-4" required />
  
            <div class="mt-4 flex justify-between items-center">
              <div class="font-bold text-xl">
                Total Amount: ${{ totalPrice }}
              </div>
              <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-md">
                Confirm Payment
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { orders, finalizeSale, addPayment } from "../backends/dataStorage.js";
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  // Date formatting utility
  const formatExpiryDate = (expiryDate) => {
    const date = new Date(expiryDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const paymentDetails = ref({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  
  // Compute the total price from centralized `orders` (cart)
  const totalPrice = computed(() => {
    const list = orders.value || [];
    return list.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0).toFixed(2);
  });
  
  // Handle the payment form submission
  const handlePayment = () => {
    try {
      // finalize sale (moves cart to sales and clears cart)
      const sale = finalizeSale({ payerName: paymentDetails.value.name, cardNumber: paymentDetails.value.cardNumber });

      // record the payment
      addPayment({ nameOnCard: paymentDetails.value.name, expiryDate: paymentDetails.value.expiryDate, amount: sale.total });

      alert("Payment successful!");

      // navigate to reports page to view the specific sale
      router.push({ name: 'ReportPage', query: { saleId: sale.id } });
    } catch (err) {
      alert(err?.message || 'Payment failed');
    }
  };
  </script>
