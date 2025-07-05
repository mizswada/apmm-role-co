<template>
    <div class="bg-white p-6 rounded-lg shadow mt-2 mb-5 ">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Component Parts</h2>
            <button
                @click="showAddComponentModal = true"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
                <Icon name="material-symbols:add" />
                Add Component
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-3 px-4">No.</th>
                        <th class="text-left py-3 px-4">Name of Part</th>
                        <th class="text-left py-3 px-4">SKU Number</th>
                        <th class="text-left py-3 px-4">Location</th>
                        <th class="text-left py-3 px-4">Date Added</th>
                        <th class="text-left py-3 px-4">Last Maintenance</th>
                        <th class="text-left py-3 px-4">Maintenance Count</th>
                        <th class="text-left py-3 px-4">Status</th>
                        <th class="text-left py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="part in componentParts" :key="part.id" class="border-b hover:bg-gray-50">
                        <td class="py-3 px-4">{{ part.id }}</td>
                        <td class="py-3 px-4">{{ part.name }}</td>
                        <td class="py-3 px-4">{{ part.skuNumber }}</td>
                        <td class="py-3 px-4">{{ getShipName(part.shipId) }}</td>
                        <td class="py-3 px-4">{{ part.dateAdded }}</td>
                        <td class="py-3 px-4">{{ part.lastMaintenance }}</td>
                        <td class="py-3 px-4">{{ part.maintenanceCount }}</td>
                        <td class="py-3 px-4">
                            <span 
                                :class="{
                                    'px-2 py-1 rounded-full text-sm': true,
                                    'bg-green-100 text-green-800': part.status === 'Operational',
                                    'bg-yellow-100 text-yellow-800': part.status === 'Under Maintenance',
                                    'bg-red-100 text-red-800': part.status === 'Faulty',
                                    'bg-gray-100 text-gray-800': part.status === 'Retired'
                                }"
                            >
                                {{ part.status }}
                            </span>
                        </td>
                        <td class="py-3 px-4">
                            <button
                                @click="editComponent(part)"
                                class="p-2 text-blue-600 hover:text-blue-800"
                            >
                                <Icon name="material-symbols:edit-outline" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

     <!-- Add Component Modal -->
     <rs-modal v-model="showAddComponentModal" size="lg" title="Add New Component">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name of Part</label>
                     <FormKit
                        v-model="newComponent.name"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter part name"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">SKU Number</label>
                     <FormKit
                        v-model="newComponent.skuNumber"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter SKU number"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date Added</label>
                     <FormKit
                        v-model="newComponent.dateAdded"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit
                        v-model="newComponent.status"
                        type="select"
                        :options="[
                            { label: 'Operational', value: 'Operational' },
                            { label: 'Under Maintenance', value: 'Under Maintenance' },
                            { label: 'Faulty', value: 'Faulty' },
                            { label: 'Retired', value: 'Retired' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ship</label>
                    <FormKit
                        v-model="newComponent.shipId"
                        type="select"
                        :options="ships.map(ship => ({ label: `${ship.name} (${ship.imoNumber})`, value: ship.id }))"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Select ship"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showAddComponentModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="addNewComponent"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Component
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Edit Component Modal -->
    <rs-modal v-model="showEditComponentModal" size="lg" title="Edit Component">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name of Part</label>
                     <FormKit 
                        v-model="editingComponent.name"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter part name"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">SKU Number</label>
                     <FormKit
                        v-model="editingComponent.skuNumber"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter SKU number"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date Added</label>
                     <FormKit disabled="true"
                        v-model="editingComponent.dateAdded"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Last Maintenance</label>
                     <FormKit disabled="true"
                        v-model="editingComponent.lastMaintenance"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Maintenance Count</label>
                     <FormKit disabled="true"
                        v-model="editingComponent.maintenanceCount"
                        type="number"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit 
                        v-model="editingComponent.status"
                        type="select"
                        :options="[
                            { label: 'Operational', value: 'Operational' },
                            { label: 'Under Maintenance', value: 'Under Maintenance' },
                            { label: 'Faulty', value: 'Faulty' },
                            { label: 'Retired', value: 'Retired' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ship</label>
                    <FormKit
                        v-model="editingComponent.shipId"
                        type="select"
                        :options="ships.map(ship => ({ label: `${ship.name} (${ship.imoNumber})`, value: ship.id }))"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Select ship"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showEditComponentModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="updateComponent"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </template>
    </rs-modal>
</template>

<script setup>

    // Add these new refs
    const showAddComponentModal = ref(false)
    const newComponent = ref({
        name: '',
        skuNumber: '',
        dateAdded: new Date().toISOString().split('T')[0],
        lastMaintenance: new Date().toISOString().split('T')[0],
        maintenanceCount: 0,
        status: 'Operational',
        shipId: null
    })

    const showEditComponentModal = ref(false)
    const editingComponent = ref({
        id: null,
        name: '',
        skuNumber: '',
        dateAdded: '',
        lastMaintenance: '',
        maintenanceCount: 0,
        status: 'Operational',
        shipId: null
    })

    // Add ships data
    const ships = ref([
        {
            id: 1,
            name: 'MV Ocean Star',
            imoNumber: 'IMO1234567'
        },
        {
            id: 2,
            name: 'MV Pacific Voyager',
            imoNumber: 'IMO7654321'
        },
        {
            id: 3,
            name: 'MV Atlantic Explorer',
            imoNumber: 'IMO9876543'
        },
        {
            id: 4,
            name: 'MV Indian Ocean',
            imoNumber: 'IMO4567890'
        }
    ])

    const componentParts = ref([
        {
            id: 1,
            name: 'Main Engine',
            skuNumber: 'ME-001',
            dateAdded: '2018-05-15',
            lastMaintenance: '2024-01-20',
            maintenanceCount: 12,
            status: 'Operational',
            shipId: 1
        },
        {
            id: 2,
            name: 'Auxiliary Engine',
            skuNumber: 'AE-002',
            dateAdded: '2018-05-15',
            lastMaintenance: '2024-02-15',
            maintenanceCount: 8,
            status: 'Under Maintenance',
            shipId: 2
        },
        {
            id: 3,
            name: 'Steering Gear',
            skuNumber: 'SG-003',
            dateAdded: '2018-05-15',
            lastMaintenance: '2023-12-10',
            maintenanceCount: 6,
            status: 'Operational',
            shipId: 3
        },
        {
            id: 4,
            name: 'Bow Thruster',
            skuNumber: 'BT-004',
            dateAdded: '2018-05-15',
            lastMaintenance: '2024-03-01',
            maintenanceCount: 4,
            status: 'Faulty',
            shipId: 4
        },
        {
            id: 5,
            name: 'Fresh Water Generator',
            skuNumber: 'FWG-005',
            dateAdded: '2018-05-15',
            lastMaintenance: '2023-11-25',
            maintenanceCount: 5,
            status: 'Operational',
            shipId: 1
        },
        {
            id: 6,
            name: 'Air Conditioning System',
            skuNumber: 'ACS-006',
            dateAdded: '2018-05-15',
            lastMaintenance: '2024-02-28',
            maintenanceCount: 7,
            status: 'Operational',
            shipId: 2
        }
    ])

    const addNewComponent = () => {
        const newId = componentParts.value.length + 1
        componentParts.value.push({
            id: newId,
            name: newComponent.value.name,
            skuNumber: newComponent.value.skuNumber,
            dateAdded: newComponent.value.dateAdded,
            lastMaintenance: newComponent.value.lastMaintenance,
            maintenanceCount: newComponent.value.maintenanceCount,
            status: newComponent.value.status
        })
        
        // Reset form
        newComponent.value = {
            name: '',
            skuNumber: '',
            dateAdded: new Date().toISOString().split('T')[0],
            lastMaintenance: new Date().toISOString().split('T')[0],
            maintenanceCount: 0,
            status: 'Operational'
        }
        
        // Close modal
        showAddComponentModal.value = false
    }

    const editComponent = (component) => {
        editingComponent.value = { ...component }
        showEditComponentModal.value = true
    }

    const updateComponent = () => {
        const index = componentParts.value.findIndex(part => part.id === editingComponent.value.id)
        if (index !== -1) {
            componentParts.value[index] = { ...editingComponent.value }
        }
        showEditComponentModal.value = false
    }

    // Add function to get ship name
    const getShipName = (shipId) => {
        const ship = ships.value.find(s => s.id === shipId)
        return ship ? ship.name : 'Not Assigned'
    }
</script>

<style lang="scss" scoped>

</style>