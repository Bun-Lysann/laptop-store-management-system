<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Support Center</h1>
        <p class="text-gray-500 mt-2">We’re here to help you. Find answers or contact us.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- FAQ Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="border rounded-xl p-4">
              <button
                class="w-full flex justify-between items-center text-left"
                @click="toggleFaq(index)"
              >
                <span class="font-medium text-gray-700">{{ faq.question }}</span>
                <span class="text-gray-400">{{ faq.open ? '-' : '+' }}</span>
              </button>
              <p v-if="faq.open" class="mt-3 text-gray-600 text-sm">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Contact Support</h2>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="mt-1 w-full rounded-xl border-gray-300 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="mt-1 w-full rounded-xl border-gray-300 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="mt-1 w-full rounded-xl border-gray-300 focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>

            <p v-if="success" class="text-green-600 text-sm mt-2">
              Your message has been sent successfully.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const success = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const faqs = reactive([
  {
    question: 'How can I reset my password?',
    answer: 'Go to settings and click on “Reset Password”. Follow the instructions sent to your email.',
    open: false
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can use the contact form on this page or email us at support@example.com.',
    open: false
  },
  {
    question: 'Where can I find documentation?',
    answer: 'Documentation is available in the Help section of our website.',
    open: false
  }
])

function toggleFaq(index) {
  faqs[index].open = !faqs[index].open
}

function submitForm() {
  console.log('Support request:', { ...form })
  success.value = true

  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
