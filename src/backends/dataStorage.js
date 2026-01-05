import { ref } from "vue";

// Reactive product list (initialize from localStorage)
const products = ref(JSON.parse(localStorage.getItem("products")) || []);

// New product form (for UI bindings)
const newProduct = ref({
  name: "",
  serial: "",
  ram: "",
  storage: "",
  cpu: "",
  gpu: "",
  display: "",
  battery: "",
  price: "",
  dateRelease: "",
  image: "",
  category: "",
});

// Load products from localStorage into the reactive array
const loadProducts = () => {
  products.value = JSON.parse(localStorage.getItem("products")) || [];
  return products.value;
};

// Persist current products to localStorage
const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};

// Orders (sales) storage
const orders = ref(JSON.parse(localStorage.getItem("orders")) || []);

const loadOrders = () => {
  orders.value = JSON.parse(localStorage.getItem("orders")) || [];
  return orders.value;
};

const saveOrders = () => {
  localStorage.setItem("orders", JSON.stringify(orders.value));
};

// Add an order. Order shape: { id, items: [{ serial, name, price, quantity }], total, date }
const addOrder = (order) => {
  if (!order || !order.items || !Array.isArray(order.items)) {
    throw new Error("Invalid order: must include an 'items' array");
  }
  // compute total if not provided
  if (order.total == null) {
    order.total = order.items.reduce((s, it) => s + Number(it.price || 0) * Number(it.quantity || 1), 0);
  }
  order.date = order.date || new Date().toISOString();
  orders.value.push(order);
  saveOrders();
  return order;
};

const getOrders = () => orders.value;

const getTotalSales = () => orders.value.reduce((s, o) => s + Number(o.total || 0), 0);

const clearOrders = () => {
  orders.value = [];
  saveOrders();
};

// Convenience: add single product to cart (orders array stores cart items)
const addToCart = (product) => {
  if (!product) throw new Error('Product required');
  const existing = orders.value.find((p) => (p.id && p.id === product.id) || (p.serial && p.serial === product.serial));
  if (existing) {
    existing.quantity = Number(existing.quantity || 0) + (Number(product.quantity) || 1);
  } else {
    orders.value.push({ ...product, quantity: Number(product.quantity) || 1 });
  }
  saveOrders();
  return orders.value;
};

// Sales (completed purchases) storage
const sales = ref(JSON.parse(localStorage.getItem("sales")) || JSON.parse(localStorage.getItem("purchaseDetails")) || []);

const loadSales = () => {
  sales.value = JSON.parse(localStorage.getItem("sales")) || JSON.parse(localStorage.getItem("purchaseDetails")) || [];
  return sales.value;
};

const saveSales = () => {
  localStorage.setItem("sales", JSON.stringify(sales.value));
};

// Finalize current cart as a sale. Optionally pass paymentInfo object.
const finalizeSale = (paymentInfo) => {
  if (!orders.value || !orders.value.length) throw new Error('No items in cart');
  const sale = {
    id: Date.now().toString(),
    items: JSON.parse(JSON.stringify(orders.value)),
    total: orders.value.reduce((s, it) => s + Number(it.price || 0) * Number(it.quantity || 1), 0),
    date: new Date().toISOString(),
    payment: paymentInfo || null,
  };
  sales.value.push(sale);
  saveSales();
  // also archive to purchaseDetails key for backward compatibility
  localStorage.setItem('purchaseDetails', JSON.stringify(sales.value));
  clearOrders();
  return sale;
};

const getSales = () => sales.value;

const getSalesTotal = () => sales.value.reduce((s, sale) => s + Number(sale.total || 0), 0);

// Payments storage
const payments = ref(JSON.parse(localStorage.getItem("paymentDetails")) || []);

const loadPayments = () => {
  payments.value = JSON.parse(localStorage.getItem("paymentDetails")) || [];
  return payments.value;
};

const savePayments = () => {
  localStorage.setItem("paymentDetails", JSON.stringify(payments.value));
};

const addPayment = (payment) => {
  if (!payment) throw new Error('Payment object required');
  const p = { id: Date.now().toString(), ...payment, date: new Date().toISOString() };
  payments.value.push(p);
  savePayments();
  return p;
};

const getPayments = () => payments.value;

// Handle image upload (sets base64 string on `newProduct`)
const handleImageUpload = (event) => {
  const file = event?.target?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      newProduct.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// Add a product object. If `product` is omitted, uses `newProduct`.
const addData = (product) => {
  const p = product ? { ...product } : { ...newProduct.value };
  if (!p.name || !p.serial) {
    throw new Error("Product 'name' and 'serial' are required");
  }
  products.value.push(p);
  saveProducts();
  return p;
};

// Alias to persist products explicitly
const storeData = () => {
  saveProducts();
};

// Return all products (reactive array)
const getData = () => products.value;

// Get single product by serial (or any predicate)
const getProduct = (serial) => products.value.find((p) => p.serial === serial);

// Delete product by serial (returns true if deleted)
const deleteData = (serial) => {
  const idx = products.value.findIndex((p) => p.serial === serial);
  if (idx === -1) return false;
  products.value.splice(idx, 1);
  saveProducts();
  return true;
};

// Reset the `newProduct` form
const resetForm = () => {
  newProduct.value = {
    name: "",
    serial: "",
    ram: "",
    storage: "",
    cpu: "",
    gpu: "",
    display: "",
    battery: "",
    price: "",
    dateRelease: "",
    image: "",
    category: "",
  };
};

export {
  products,
  newProduct,
  loadProducts,
  saveProducts,
  orders,
  loadOrders,
  saveOrders,
  addOrder,
  addToCart,
  getOrders,
  getTotalSales,
  clearOrders,
  // sales & payments
  sales,
  loadSales,
  saveSales,
  finalizeSale,
  getSales,
  getSalesTotal,
  payments,
  loadPayments,
  savePayments,
  addPayment,
  getPayments,
  handleImageUpload,
  addData,
  storeData,
  getData,
  getProduct,
  deleteData,
  resetForm,
};