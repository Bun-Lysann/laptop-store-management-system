// import { createRouter, createWebHistory } from "vue-router";
// import ProductCards from "../components/ProductCards.vue";
// import ProductList from "../components/ProductList.vue";
// import PaymentPage from "../components/PaymentPage.vue";
// import AddProduct from "../components/AddProduct.vue";
// import ReportPage from "../Partial/ReportPage.vue";
// import OrderPage from "../Partial/OrderPage.vue";
// import LoginPage from "../Partial/LoginPage.vue";
// import RegisterAdmin from "../Partial/RegisterAdmin.vue";
// import Dashboard from "../views/Dashboard.vue";
// import HomePage from "../components/HomePage.vue";
// import Support from "../views/support_page.vue";
// import StaffList from "../components/Staff_list.vue"

// const routes = [
// {   
//     path: '/' ,
//     redirect: '/login'
// },
// { 
//     name: 'LoginPage', 
//     path: '/login', 
//     component: LoginPage 
// },
// {
//     name: 'RegisterAdmin',
//     path: '/register', 
//     component: RegisterAdmin
// },
// {
//     name: 'Dashboard',
//     path: '/dashboard', component: Dashboard,
//     children:[
        
//         { name: 'HomePage', path: "/", component: HomePage, meta: { requiresAuth: true}},
//         { name: 'ProductCards', path: "/cards", component: ProductCards, meta: { requiresAuth: true}},
//         { name: 'ProductList', path: "/list", component: ProductList, meta: { requiresAuth: true}},
//         { name: 'OrderPage', path: "/order", component: OrderPage, meta: { requiresAuth: true}},
//         { name: 'PaymentPage', path: "/payment", component: PaymentPage, meta: { requiresAuth: true}},
//         { name: 'ReportPage', path: "/reports", component: ReportPage, meta: { requiresAuth: true}},
//         { name: 'AddProduct', path: "/add-product", component: AddProduct, meta: { requiresAuth: true}},
//         { name: 'support', path: "/support", component: Support, meta: {requiresAuth: true}},
//         { name: 'staff', path: "/staff", component: StaffList, meta: {requiresAuth: true}},
        
//     ]
// }
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// });
// router.beforeEach((to, from, next) => {
//     const authToken = localStorage.getItem('authToken');
//     if (to.matched.some(record => record.meta.requiresAuth) && !authToken) {
//       next({ name: 'login' });
//     } else {
//       next();
//     }
// });


// export default router;

import { createRouter, createWebHistory } from "vue-router";
import ProductCards from "../components/ProductCards.vue";
import ProductList from "../components/ProductList.vue";
import PaymentPage from "../components/PaymentPage.vue";
import AddProduct from "../components/AddProduct.vue";
import ReportPage from "../Partial/ReportPage.vue";
import OrderPage from "../Partial/OrderPage.vue";
import LoginPage from "../Partial/LoginPage.vue";
import RegisterAdmin from "../Partial/RegisterAdmin.vue";
import Dashboard from "../views/Dashboard.vue";
import HomePage from "../components/HomePage.vue";
import StaffList from "../components/Staff_list.vue";
import Support from "../components/support_page.vue";

const routes = [
  {
    path: "/",
    // dynamic redirect: if logged in -> dashboard, else -> login
    redirect: () => (localStorage.getItem("authToken") ? "/dashboard" : "/login"),
  },
  { name: "LoginPage", path: "/login", component: LoginPage },
  { name: "RegisterAdmin", path: "/register", component: RegisterAdmin },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      // Default child: renders at /dashboard
      { name: "HomePage", path: "", component: HomePage, meta: { requiresAuth: true } },
      { name: "ProductCards", path: "cards", component: ProductCards, meta: { requiresAuth: true } },
      { name: "ProductList", path: "list", component: ProductList, meta: { requiresAuth: true } },
      { name: "OrderPage", path: "order", component: OrderPage, meta: { requiresAuth: true } },
      { name: "PaymentPage", path: "payment", component: PaymentPage, meta: { requiresAuth: true } },
      { name: "ReportPage", path: "reports", component: ReportPage, meta: { requiresAuth: true } },
      { name: "AddProduct", path: "add-product", component: AddProduct, meta: { requiresAuth: true } },
      { name: "StaffList", path: "staff", component: StaffList, meta: { requiresAuth: true } },
      { name: "Support", path: "support", component: Support, meta: { requiresAuth: true } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Navigation Guard with Optional Improvement
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem("authToken");

  // 1️⃣ If route requires auth and user is not logged in → go to login
  if (to.matched.some((record) => record.meta.requiresAuth) && !authToken) {
    // preserve the attempted path so user can be redirected after login
    next({ name: "LoginPage", query: { redirect: to.fullPath } });
    return;
  }
  // 2️⃣ If user is logged in and tries to access login or register → redirect to dashboard
  else if ((to.name === "LoginPage" || to.name === "RegisterAdmin") && authToken) {
    next({ name: "HomePage" }); // or Dashboard root
  } 
  // 3️⃣ Otherwise, proceed normally
  else {
    next();
  }
});

export default router;
