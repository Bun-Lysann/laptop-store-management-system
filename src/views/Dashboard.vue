<script setup>
import { ref } from 'vue';

const isMenu = ref(true);
const isFilter = ref(false);
const isBrands = ref(false);
const isCpu = ref(false);
const isGraphics = ref(false);
const isMemory = ref(false);
const isStorage = ref(false);
const selectedBrand = ref("");
const selectedCpu = ref("");
const selectedGraphics = ref("");
const selectedMemory = ref("");
const selectedStorage = ref("");

const brands = ref(["ALL", "ASUS", "ARR", "DELL", "MSI", "MICROSOFT", "LENOVO", "MacBook"]);
const cpu = ref(["ALL", "AMD", "INTEL", "SNAPDRAGON"]);
const graphics = ref(["ALL", "AMD", "NVIDIA", "INTEL"]);
const memory = ref(["ALL", "4GB", "8GB", "16GB", "32GB", "64GB", "128GB"]);
const storage = ref(["ALL", "128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB"]);

const toggleMenu = () => {
    isMenu.value =! isMenu.value;
}
const toggleFilter = () => {
    isFilter.value =!isFilter.value;
};
const toggleBrands = () => {
    isBrands.value = !isBrands.value;
};
const toggleStorage = () => {
    isStorage.value = !isStorage.value;
};
const toggleMemory = () => {
    isMemory.value = !isMemory.value;
};
const toggleCpu = () => {
    isCpu.value = !isCpu.value;
};
const toggleGraphics = () => {
    isGraphics.value = !isGraphics.value;
};

const selectBrand = (brand) => {
    selectedBrand.value = brand;
    isBrands.value = false;
};
const selectCpu = (cpuOption) => {
    selectedCpu.value = cpuOption;
    isCpu.value = false;
};
const selectGraphics = (graphicsOption) => {
    selectedGraphics.value = graphicsOption;
    isGraphics.value = false;
};
const selectMemory = (memoryOption) => {
    selectedMemory.value = memoryOption;
    isMemory.value = false;
};
const selectStorage = (storageOption) => {
    selectedStorage.value = storageOption;
    isStorage.value = false;
};
</script>

<template>
    <div class="">
        <div class="w-full flex">
            <div v-if="isMenu" class="w-[20%] h-screen place-items-center shadow-md relative">
                <div class="py-10 w-full place-items-center">
                    <img class="w-15" src="../image/icon/vecteezy_computer.jpg" alt="">
                    <label class="font-[poppins] Poppins-600 ml-22" for="">Computer Store</label>
                </div>
                <div class="h-auto py-20 list-none w-full place-items-center relative">
                    <ul class="font-[Dangrek]">
                        <router-link :to="{ name: 'HomePage' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">ទំព័រដើម</router-link>
                        <router-link :to="{ name: 'ProductCards' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">ផលិតផល​</router-link>
                        <router-link :to="{ name: 'ProductList' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">បញ្ជីផលិតផល</router-link>
                        <router-link :to="{ name: 'StaffList' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">បញ្ជីបុគ្គលិក</router-link>
                        <router-link :to="{ name: 'OrderPage' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">ការកម្មង់</router-link>
                        <router-link :to="{ name: 'PaymentPage' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">ការទូទាត់</router-link>
                        <router-link :to="{ name: 'ReportPage' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">របាយការណ៍</router-link>
                        <router-link :to="{ name: 'Support' }" class="flex items-center p-2 pr-8 text-xl hover:bg-blue-200 rounded-md"><img class="w-6 items-center" src="" alt="">ទំនាក់ទំនង</router-link>
                    </ul>
                </div>
                <div>
                    <ul class="w-full h-auto list-none">
                        
                    </ul>
                </div>
            </div>
            <div class="w-full h-auto relative">
                <!-- Navbar with navigation -->
                <div class="flex w-full h-auto shadow-md rounded-md p-4 m-4 relative">
                    <div class="flex w-full h-auto justify-between">
                        <div class="flex items-center justify-start">
                            <button @click="toggleMenu"><img src="../image/icon/menu.png" alt="" class="w-6 h-6"></button>
                            <label class="ml-4 font-[Moul] font-semibold text-gray-600" for="">ប្រព័ន្ធគ្រប់គ្រងហាងលក់កុំព្យូទ័រ</label>
                        </div>
                        <div class="flex place-content-center justify-end space-x-4 mr-4">
                            <!-- <button @click="toggleFilter" class="item-center rounded-sm p-1 shadow-md hover:bg-gray-200">
                                <img src="../image/icon/filter.png" alt="" class="w-6 h-6">
                            </button> -->
                            <!-- <button @click="" class="item-center rounded-sm p-1 shadow-md hover:bg-gray-200">
                                <router-link :to="{ name: 'PaymentPage' }">
                                    <img src="../image/icon/wallet.png" alt="" class="w-6 h-6">
                                </router-link>
                            </button> -->
                            <button class="item-center rounded-md p-2 shadow hover:bg-gray-200">
                                <router-link :to="{ name: 'AddProduct' }">
                                    <img src="../image/icon/more.png" alt="" class="w-6 h-6">
                                </router-link>
                            </button>
                            <button @click="" class="item-center justify-center flex rounded-md p-2 shadow hover:bg-gray-200">
                                <label for="" class="items-center font-[Poppins] mr-2">Name</label>
                                <img src="../image/icon/profile-user.png" alt="" class="w-6 h-6">
                            </button>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <!-- Filter for the product -->
                <div v-if="isFilter" class="w-full h-auto shadow-md rounded-md p-2 m-4 flex relative">
                    <div>
                        <input type="text" class="rounded-md border shadow-md p-2" placeholder="Search name">
                    </div>
                    <div class="relative inline-block text-left">
                        <button @click="toggleBrands" class="flex items-center rounded-md place-content-center w-40 p-2 ml-4 border">
                            {{ selectedBrand || "Select Brand" }}
                            <svg :class="{'rotate-180': isBrands, 'rotate-0': !isBrands}" class="w-4 h-4 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="isBrands" class="absolute mt-2 ml-4 w-40 bg-white rounded-md shadow-lg">
                            <ul>
                            <li v-for="brand in brands" :key="brand" @click="selectBrand(brand)"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                {{ brand }}
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div class="relative inline-block text-left">
                        <button @click="toggleStorage" class="flex items-center rounded-md place-content-center w-40 p-2 ml-4 border">
                            {{ selectedStorage || "Select Storage" }}
                            <svg :class="{'rotate-180': isStorage, 'rotate-0': !isStorage}" class="w-4 h-4 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="isStorage" class="absolute mt-2 ml-4 w-40 bg-white rounded-md shadow-lg">
                            <ul>
                            <li v-for="option in storage" :key="option" @click="selectStorage(option)"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                {{ option }}
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div class="relative inline-block text-left">
                        <button @click="toggleMemory" class="flex items-center rounded-md place-content-center w-40 p-2 ml-4 border">
                            {{ selectedMemory || "Select RAM" }}
                            <svg :class="{'rotate-180': isMemory, 'rotate-0': !isMemory}" class="w-4 h-4 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="isMemory" class="absolute mt-2 ml-4 w-40 bg-white rounded-md shadow-lg">
                            <ul>
                            <li v-for="option in memory" :key="option" @click="selectMemory(option)"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                {{ option }}
                            </li>
                            </ul>
                        </div>
                    </div>

                    <div class="relative inline-block text-left">
                        <button @click="toggleCpu" class="flex items-center rounded-md place-content-center w-40 p-2 ml-4 border">
                            {{ selectedCpu || "Select CPU" }}
                            <svg :class="{'rotate-180': isCpu, 'rotate-0': !isCpu}" class="w-4 h-4 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="isCpu" class="absolute mt-2 ml-4 w-40 bg-white rounded-md shadow-lg">
                            <ul>
                            <li v-for="option in cpu" :key="option" @click="selectCpu(option)"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                {{ option }}
                            </li>
                            </ul>
                        </div>
                    </div>

                    <div class="relative inline-block text-left">
                        <button @click="toggleGraphics" class="flex items-center rounded-md place-content-center w-40 p-2 ml-4 border">
                            {{ selectedGraphics || "Select GPU" }}
                            <svg :class="{'rotate-180': isGraphics, 'rotate-0': !isGraphics}" class="w-4 h-4 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-if="isGraphics" class="absolute mt-2 ml-4 w-40 bg-white rounded-md shadow-lg">
                            <ul>
                            <li v-for="option in graphics" :key="option" @click="selectGraphics(option)"
                                class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                {{ option }}
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- General Page Content -->
                <div class="m-4 w-full h-auto">
                    <router-view></router-view>
                </div>    
            </div>
        </div>
    </div>
</template>