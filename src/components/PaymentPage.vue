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
  
  // Compute the total price from localStorage
  const totalPrice = computed(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    return orders.reduce((total, order) => total + order.price * order.quantity, 0).toFixed(2);
  });
  
  // Handle the payment form submission
  const handlePayment = () => {
    // Retrieve any existing purchase details from localStorage
    const storedPurchases = JSON.parse(localStorage.getItem("purchaseDetails")) || [];
  
    // Retrieve orders (new purchase details)
    const newPurchases = JSON.parse(localStorage.getItem("orders")) || [];
  
    // Add the payment details (name, expiration date) to the new purchases
    newPurchases.forEach(order => {
      order.nameOnCard = paymentDetails.value.name;  // Store the name on card with each purchase
      order.expiryDate = formatExpiryDate(paymentDetails.value.expiryDate);  // Store formatted expiration date
    });
  
    // Combine the old and new purchases
    const allPurchases = [...storedPurchases, ...newPurchases];
  
    // Save the combined purchases into localStorage
    localStorage.setItem("purchaseDetails", JSON.stringify(allPurchases));
  
    // Save payment details in localStorage
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails.value));
  
    alert("Payment successful!");
  
    // Optionally, clear orders after payment, or leave them for the next purchase
    localStorage.removeItem("orders");
  
    // Optionally, reload the page or redirect
    location.reload();
  };
  </script>
