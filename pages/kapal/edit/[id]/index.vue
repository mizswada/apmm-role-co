<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Edit Ship Information</h1>
          <p class="text-gray-600">Update basic information about the ship</p>
        </div>
        <button
          @click="$router.push(`/kapal/${ship.id}`)"
          class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Icon name="material-symbols:arrow-back" />
          Back to Details
        </button>
      </div>
    </div>
    <!-- Edit Form -->
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ship Name</label>
               <FormKit
                v-model="ship.shipName"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">IMO Number</label>
               <FormKit
                v-model="ship.imoNumber"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Call Sign</label>
               <FormKit
                v-model="ship.callSign"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">MMSI Number</label>
               <FormKit
                v-model="ship.mmsiNumber"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <!-- Technical Specifications Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Technical Specifications</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ship Type</label>
              <select
                v-model="ship.shipType"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Container">Container</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="Tanker">Tanker</option>
                <option value="General Cargo">General Cargo</option>
                <option value="Passenger">Passenger</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gross Tonnage</label>
               <FormKit
                v-model="ship.grossTonnage"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Length Overall (m)</label>
               <FormKit
                v-model.number="ship.lengthOverall"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Breadth (m)</label>
               <FormKit
                v-model.number="ship.breadth"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Draft (m)</label>
               <FormKit
                v-model.number="ship.draft"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
               <FormKit
                v-model="ship.yearBuilt"
                type="number"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <!-- Registration Details Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Registration Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Flag State</label>
               <FormKit
                v-model="ship.flagState"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Port of Registry</label>
               <FormKit
                v-model="ship.portOfRegistry"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Classification Society</label>
               <FormKit
                v-model="ship.classificationSociety"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="ship.status"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
                <option value="laid-up">Laid-up</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Additional Information Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Additional Information</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <textarea
              v-model="ship.remarks"
              rows="3"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="$router.push(`/kapal/${ship.id}`)"
            class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Edit Ship Information",
  // middleware: ["auth"], // This is for Login Auth for page
  // requiresAuth: true,  // This is use for Login Auth for page
});

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Initialize ship data with hardcoded values
const ship = ref({
  id: route.params.id,
  // Basic Information
  shipName: 'MV Ocean Star',
  imoNumber: 'IMO1234567',
  callSign: '9V1234',
  mmsiNumber: '123456789',
  
  // Technical Specifications
  shipType: 'Container',
  grossTonnage: '85,000',
  lengthOverall: 366.00,
  breadth: 48.20,
  draft: 15.50,
  yearBuilt: 2018,
  
  // Registration Details
  flagState: 'Singapore',
  portOfRegistry: 'Singapore',
  classificationSociety: 'DNV',
  status: 'active',
  
  // Additional Information
  remarks: 'Regular maintenance schedule followed. Last dry dock completed in 2022.'
})

// Format numeric values to 2 decimal places
const formatNumber = (value) => {
  return Number(value).toFixed(2)
}

// Fetch ship data when component mounts
onMounted(() => {
  // Format numeric values
  ship.value.lengthOverall = formatNumber(ship.value.lengthOverall)
  ship.value.breadth = formatNumber(ship.value.breadth)
  ship.value.draft = formatNumber(ship.value.draft)
  console.log('Ship data loaded:', ship.value)
})

const handleSubmit = async () => {
  try {
    // Format numeric values before submission
    const formattedShip = {
      ...ship.value,
      lengthOverall: formatNumber(ship.value.lengthOverall),
      breadth: formatNumber(ship.value.breadth),
      draft: formatNumber(ship.value.draft)
    }

    // const response = await fetch(`/api/ships/${route.params.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formattedShip)
    // })

    // if (!response.ok) {
    //   throw new Error('Failed to update ship')
    // }

    // Show success message
    alert('Ship updated successfully!')
    
    // Redirect to the ship details page
    router.push(`/kapal/${route.params.id}`)
  } catch (error) {
    console.error('Error updating ship:', error)
    alert('Failed to update ship. Please try again.')
  }
}
</script>

<style lang="scss" scoped>
// Add any custom styles here
</style> 