<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Staff List</h1>
        <button
          @click="openAddModal"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Staff
        </button>
      </div>

      <!-- Search -->
      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search staff..."
          class="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th class="px-6 py-3">Name</th>
              <th class="px-6 py-3">Position</th>
              <th class="px-6 py-3">Phone</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="staff in filteredStaff"
              :key="staff.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-4 font-medium">{{ staff.name }}</td>
              <td class="px-6 py-4">{{ staff.position }}</td>
              <td class="px-6 py-4">{{ staff.phone }}</td>
              <td class="px-6 py-4">
                <span
                  :class="staff.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ staff.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right space-x-2">
                <button
                  @click="editStaff(staff)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="deleteStaff(staff.id)"
                  class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="bg-white w-full max-w-md rounded-lg p-6">
          <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit Staff' : 'Add Staff' }}</h2>

          <div class="space-y-3">
            <input v-model="form.name" placeholder="Name" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.position" placeholder="Position" class="w-full px-4 py-2 border rounded" />
            <input v-model="form.phone" placeholder="Phone" class="w-full px-4 py-2 border rounded" />
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="form.active" />
              <span>Active</span>
            </label>
          </div>

          <div class="flex justify-end mt-6 space-x-2">
            <button @click="closeModal" class="px-4 py-2 border rounded">Cancel</button>
            <button
              @click="saveStaff"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffList',
  data() {
    return {
      search: '',
      showModal: false,
      isEdit: false,
      editingId: null,
      staffList: [
        { id: 1, name: 'John Doe', position: 'Manager', phone: '012 345 678', active: true },
        { id: 2, name: 'Jane Smith', position: 'Cashier', phone: '098 765 432', active: true },
        { id: 3, name: 'Mike Lee', position: 'Barista', phone: '011 222 333', active: false }
      ],
      form: {
        name: '',
        position: '',
        phone: '',
        active: true
      }
    }
  },
  computed: {
    filteredStaff() {
      return this.staffList.filter(s =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    openAddModal() {
      this.isEdit = false
      this.form = { name: '', position: '', phone: '', active: true }
      this.showModal = true
    },
    editStaff(staff) {
      this.isEdit = true
      this.editingId = staff.id
      this.form = { ...staff }
      this.showModal = true
    },
    saveStaff() {
      if (this.isEdit) {
        const index = this.staffList.findIndex(s => s.id === this.editingId)
        this.staffList[index] = { id: this.editingId, ...this.form }
      } else {
        this.staffList.push({ id: Date.now(), ...this.form })
      }
      this.closeModal()
    },
    deleteStaff(id) {
      this.staffList = this.staffList.filter(s => s.id !== id)
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>
