<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Ship Details</h1>
          <p class="text-gray-600">View detailed information about the ship</p>
        </div>
        <button
          @click="$router.push('/kapal')"
          class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Icon name="material-symbols:arrow-back" />
          Back to List
        </button>
      </div>
    </div>

    <div class="rounded-lg shadow mt-2 mb-5">
        <rs-tab vertical>
            <rs-tab-item title="Basic Information"> 
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg font-semibold">Basic Information</h2>
                        <button
                            @click="$router.push(`/kapal/edit/${ship.id}`)"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Icon name="material-symbols:edit-outline-sharp" />
                            Edit Basic Information
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p class="text-sm text-gray-500">Ship Name</p>
                            <p class="font-medium">{{ ship.shipName }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">IMO Number</p>
                            <p class="font-medium">{{ ship.imoNumber }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Call Sign</p>
                            <p class="font-medium">{{ ship.callSign }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">MMSI Number</p>
                            <p class="font-medium">{{ ship.mmsiNumber }}</p>
                        </div>
                    </div>

                    <h2 class="text-lg font-semibold mb-4">Technical Specifications</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p class="text-sm text-gray-500">Ship Type</p>
                            <p class="font-medium">{{ ship.shipType }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Gross Tonnage</p>
                            <p class="font-medium">{{ ship.grossTonnage }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Length Overall</p>
                            <p class="font-medium">{{ ship.lengthOverall }} m</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Breadth</p>
                            <p class="font-medium">{{ ship.breadth }} m</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Draft</p>
                            <p class="font-medium">{{ ship.draft }} m</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Year Built</p>
                            <p class="font-medium">{{ ship.yearBuilt }}</p>
                        </div>
                    </div>

                    <h2 class="text-lg font-semibold mb-4">Registration Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p class="text-sm text-gray-500">Flag State</p>
                            <p class="font-medium">{{ ship.flagState }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Port of Registry</p>
                            <p class="font-medium">{{ ship.portOfRegistry }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Classification Society</p>
                            <p class="font-medium">{{ ship.classificationSociety }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Status</p>
                            <p class="font-medium">
                                <span 
                                    :class="{
                                        'px-2 py-1 rounded-full text-sm': true,
                                        'bg-green-100 text-green-800': ship.status === 'active',
                                        'bg-yellow-100 text-yellow-800': ship.status === 'maintenance',
                                        'bg-red-100 text-red-800': ship.status === 'inactive',
                                        'bg-gray-100 text-gray-800': ship.status === 'laid-up'
                                    }"
                                >
                                    {{ ship.status }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </rs-tab-item>
            
            <rs-tab-item title="Component Parts">
                <div class="p-6">
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
                                            <Icon name="weui:eyes-on-outlined" />
                                        </button>
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
            </rs-tab-item>
            <rs-tab-item title="Crew Information"> 
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">Crew Information</h2>
                        <button
                            @click="showAddCrewModal = true"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Icon name="material-symbols:add" />
                            Add Crew
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-3 px-4">No.</th>
                                    <th class="text-left py-3 px-4">Name</th>
                                    <th class="text-left py-3 px-4">Position</th>
                                    <th class="text-left py-3 px-4">Nationality</th>
                                    <th class="text-left py-3 px-4">License Number</th>
                                    <th class="text-left py-3 px-4">Status</th>
                                    <th class="text-left py-3 px-4">Join Date</th>
                                    <th class="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in crew" :key="member.licenseNumber" class="border-b hover:bg-gray-50">
                                    <td class="py-3 px-4">{{ member.id }}</td>
                                    <td class="py-3 px-4">{{ member.name }}</td>
                                    <td class="py-3 px-4">{{ member.position }}</td>
                                    <td class="py-3 px-4">{{ member.nationality }}</td>
                                    <td class="py-3 px-4">{{ member.licenseNumber }}</td>
                                    <td class="py-3 px-4">
                                        <span 
                                            :class="{
                                                'px-2 py-1 rounded-full text-sm': true,
                                                'bg-green-100 text-green-800': member.status === 'On Board',
                                                'bg-yellow-100 text-yellow-800': member.status === 'On Leave',
                                                'bg-red-100 text-red-800': member.status === 'Off Duty'
                                            }"
                                        >
                                            {{ member.status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4">{{ member.joinDate }}</td>
                                    <td class="py-3 px-4">
                                        <div class="flex gap-2">
                                            <button
                                                @click="editCrew(member)"
                                                class="p-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <Icon name="material-symbols:edit-outline" />
                                            </button>
                                            <button
                                                @click="deleteCrew(member)"
                                                class="p-2 text-red-600 hover:text-red-800"
                                            >
                                                <Icon name="material-symbols:delete-outline" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </rs-tab-item>
            <rs-tab-item title="Ship Maintenance">
                <div class="p-6">
                    <h2 class="text-lg font-semibold mb-4">Maintenance Schedule</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-3 px-4">No.</th>
                                    <th class="text-left py-3 px-4">Maintenance Type</th>
                                    <th class="text-left py-3 px-4">Description</th>
                                    <th class="text-left py-3 px-4">Scheduled Date</th>
                                    <th class="text-left py-3 px-4">Status</th>
                                    <th class="text-left py-3 px-4">Last Performed</th>
                                    <th class="text-left py-3 px-4">Next Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="maintenance in maintenanceSchedule" :key="maintenance.id" class="border-b hover:bg-gray-50">
                                    <td class="py-3 px-4">{{ maintenance.id }}</td>
                                    <td class="py-3 px-4">{{ maintenance.type }}</td>
                                    <td class="py-3 px-4">{{ maintenance.description }}</td>
                                    <td class="py-3 px-4">{{ maintenance.scheduledDate }}</td>
                                    <td class="py-3 px-4">
                                        <span 
                                            :class="{
                                                'px-2 py-1 rounded-full text-sm': true,
                                                'bg-green-100 text-green-800': maintenance.status === 'Completed',
                                                'bg-yellow-100 text-yellow-800': maintenance.status === 'Scheduled',
                                                'bg-red-100 text-red-800': maintenance.status === 'Overdue',
                                                'bg-blue-100 text-blue-800': maintenance.status === 'In Progress'
                                            }"
                                        >
                                            {{ maintenance.status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4">{{ maintenance.lastPerformed }}</td>
                                    <td class="py-3 px-4">{{ maintenance.nextDue }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </rs-tab-item>
            <rs-tab-item title="Ship Modification">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">Modification History</h2>
                        <button
                            @click="showAddModificationModal = true"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Icon name="material-symbols:add" />
                            Add Modification
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-3 px-4">No.</th>
                                    <th class="text-left py-3 px-4">Modification Type</th>
                                    <th class="text-left py-3 px-4">Description</th>
                                    <th class="text-left py-3 px-4">Date Completed</th>
                                    <th class="text-left py-3 px-4">Location</th>
                                    <th class="text-left py-3 px-4">Contractor</th>
                                    <th class="text-left py-3 px-4">Status</th>
                                    <th class="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="modification in shipModifications" :key="modification.id" class="border-b hover:bg-gray-50">
                                    <td class="py-3 px-4">{{ modification.id }}</td>
                                    <td class="py-3 px-4">{{ modification.type }}</td>
                                    <td class="py-3 px-4">{{ modification.description }}</td>
                                    <td class="py-3 px-4">{{ modification.dateCompleted }}</td>
                                    <td class="py-3 px-4">{{ modification.location }}</td>
                                    <td class="py-3 px-4">{{ modification.contractor }}</td>
                                    <td class="py-3 px-4">
                                        <span 
                                            :class="{
                                                'px-2 py-1 rounded-full text-sm': true,
                                                'bg-green-100 text-green-800': modification.status === 'Completed',
                                                'bg-yellow-100 text-yellow-800': modification.status === 'In Progress',
                                                'bg-red-100 text-red-800': modification.status === 'Pending',
                                                'bg-blue-100 text-blue-800': modification.status === 'Approved'
                                            }"
                                        >
                                            {{ modification.status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4">
                                        <div class="flex gap-2">
                                            <button
                                                @click="editModification(modification)"
                                                class="p-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <Icon name="material-symbols:edit-outline" />
                                            </button>
                                            <button
                                                @click="deleteModification(modification)"
                                                class="p-2 text-red-600 hover:text-red-800"
                                            >
                                                <Icon name="material-symbols:delete-outline" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </rs-tab-item>
        </rs-tab>
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

    <!-- Add Crew Modal -->
    <rs-modal v-model="showAddCrewModal" size="lg" title="Add New Crew Member">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <FormKit
                        v-model="newCrew.name"
                        type="select"
                        :options="availableCrewMembers.map(member => ({ label: member.name, value: member.name }))"
                        @input="handleNameSelection"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Position</label>
                    <FormKit
                        v-model="newCrew.position"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nationality</label>
                    <FormKit
                        v-model="newCrew.nationality"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">License Number</label>
                    <FormKit
                        v-model="newCrew.licenseNumber"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit
                        v-model="newCrew.status"
                        type="select"
                        :options="[
                            { label: 'On Board', value: 'On Board' },
                            { label: 'On Leave', value: 'On Leave' },
                            { label: 'Off Duty', value: 'Off Duty' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Join Date</label>
                    <FormKit
                        v-model="newCrew.joinDate"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showAddCrewModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="addNewCrew"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Crew Member
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Edit Crew Modal -->
    <rs-modal v-model="showEditCrewModal" size="lg" title="Edit Crew Member">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <FormKit
                        v-model="editingCrew.name"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Position</label>
                    <FormKit
                        v-model="editingCrew.position"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nationality</label>
                    <FormKit
                        v-model="editingCrew.nationality"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">License Number</label>
                    <FormKit
                        v-model="editingCrew.licenseNumber"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit
                        v-model="editingCrew.status"
                        type="select"
                        :options="[
                            { label: 'On Board', value: 'On Board' },
                            { label: 'On Leave', value: 'On Leave' },
                            { label: 'Off Duty', value: 'Off Duty' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Join Date</label>
                    <FormKit
                        v-model="editingCrew.joinDate"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showEditCrewModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="updateCrew"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Update Status
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Add Modification Modal -->
    <rs-modal v-model="showAddModificationModal" size="lg" title="Add New Modification">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Modification Type</label>
                    <FormKit
                        v-model="newModification.type"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter modification type"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <FormKit
                        v-model="newModification.description"
                        type="textarea"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter modification description"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date Completed</label>
                    <FormKit
                        v-model="newModification.dateCompleted"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Location</label>
                    <FormKit
                        v-model="newModification.location"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter location"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Contractor</label>
                    <FormKit
                        v-model="newModification.contractor"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter contractor name"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit
                        v-model="newModification.status"
                        type="select"
                        :options="[
                            { label: 'Completed', value: 'Completed' },
                            { label: 'In Progress', value: 'In Progress' },
                            { label: 'Pending', value: 'Pending' },
                            { label: 'Approved', value: 'Approved' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showAddModificationModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="addNewModification"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Modification
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Edit Modification Modal -->
    <rs-modal v-model="showEditModificationModal" size="lg" title="Edit Modification">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Modification Type</label>
                    <FormKit
                        v-model="editingModification.type"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <FormKit
                        v-model="editingModification.description"
                        type="textarea"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date Completed</label>
                    <FormKit
                        v-model="editingModification.dateCompleted"
                        type="date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Location</label>
                    <FormKit
                        v-model="editingModification.location"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Contractor</label>
                    <FormKit
                        v-model="editingModification.contractor"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <FormKit
                        v-model="editingModification.status"
                        type="select"
                        :options="[
                            { label: 'Completed', value: 'Completed' },
                            { label: 'In Progress', value: 'In Progress' },
                            { label: 'Pending', value: 'Pending' },
                            { label: 'Approved', value: 'Approved' }
                        ]"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showEditModificationModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    @click="updateModification"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Update Status
                </button>
            </div>
        </template>
    </rs-modal>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Ship Details",
  // middleware: ["auth"], // This is for Login Auth for page
  // requiresAuth: true,  // This is use for Login Auth for page
});

import { ref } from 'vue'

const ship = ref({
    id:1,
  // Basic Information
  shipName: 'MV Ocean Star',
  imoNumber: 'IMO1234567',
  callSign: '9V1234',
  mmsiNumber: '123456789',
  
  // Technical Specifications
  shipType: 'Container',
  grossTonnage: '85,000',
  lengthOverall: '366',
  breadth: '48.2',
  draft: '15.5',
  yearBuilt: '2018',
  
  // Registration Details
  flagState: 'Singapore',
  portOfRegistry: 'Singapore',
  classificationSociety: 'DNV',
  status: 'active',
  
  // Additional Information
  remarks: 'Regular maintenance schedule followed. Last dry dock completed in 2022.'
})

// Crew Information
const crew = ref([
  {
    id: 1,
    name: 'John Smith',
    position: 'Captain',
    nationality: 'British',
    licenseNumber: 'CAP123456',
    status: 'On Board',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Michael Brown',
    position: 'Chief Engineer',
    nationality: 'American',
    licenseNumber: 'ENG789012',
    status: 'On Board',
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'David Wilson',
    position: 'First Officer',
    nationality: 'Australian',
    licenseNumber: 'FO345678',
    status: 'On Leave',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'Robert Chen',
    position: 'Second Engineer',
    nationality: 'Chinese',
    licenseNumber: 'ENG901234',
    status: 'On Board',
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    name: 'James Lee',
    position: 'Chief Cook',
    nationality: 'Singaporean',
    licenseNumber: 'CC567890',
    status: 'On Board',
    joinDate: '2023-05-15'
  },
  {
    id: 6,
    name: 'Thomas Anderson',
    position: 'Bosun',
    nationality: 'Canadian',
    licenseNumber: 'BOS123789',
    status: 'Off Duty',
    joinDate: '2023-06-20'
  },
  {
    id: 7,
    name: 'Maria Garcia',
    position: 'Deck Officer',
    nationality: 'Spanish',
    licenseNumber: 'DO456123',
    status: 'On Board',
    joinDate: '2023-07-10'
  },
  {
    id: 8,
    name: 'Hans Müller',
    position: 'Electrician',
    nationality: 'German',
    licenseNumber: 'EL789456',
    status: 'On Board',
    joinDate: '2023-08-25'
  }
])

// Certificates
const certificates = ref([
  {
    name: 'International Safety Management (ISM) Certificate',
    issuedDate: '2023-01-15',
    expiryDate: '2025-01-15',
    status: 'Valid'
  },
  {
    name: 'International Ship Security Certificate (ISSC)',
    issuedDate: '2023-03-20',
    expiryDate: '2025-03-20',
    status: 'Valid'
  }
])

// Component Parts
const componentParts = ref([
  {
    id: 1,
    name: 'Main Engine',
    skuNumber: 'ME-001',
    dateAdded: '2018-05-15',
    lastMaintenance: '2024-01-20',
    maintenanceCount: 12,
    status: 'Operational'
  },
  {
    id: 2,
    name: 'Auxiliary Engine',
    skuNumber: 'AE-002',
    dateAdded: '2018-05-15',
    lastMaintenance: '2024-02-15',
    maintenanceCount: 8,
    status: 'Under Maintenance'
  },
  {
    id: 3,
    name: 'Steering Gear',
    skuNumber: 'SG-003',
    dateAdded: '2018-05-15',
    lastMaintenance: '2023-12-10',
    maintenanceCount: 6,
    status: 'Operational'
  },
  {
    id: 4,
    name: 'Bow Thruster',
    skuNumber: 'BT-004',
    dateAdded: '2018-05-15',
    lastMaintenance: '2024-03-01',
    maintenanceCount: 4,
    status: 'Faulty'
  },
  {
    id: 5,
    name: 'Fresh Water Generator',
    skuNumber: 'FWG-005',
    dateAdded: '2018-05-15',
    lastMaintenance: '2023-11-25',
    maintenanceCount: 5,
    status: 'Operational'
  },
  {
    id: 6,
    name: 'Air Conditioning System',
    skuNumber: 'ACS-006',
    dateAdded: '2018-05-15',
    lastMaintenance: '2024-02-28',
    maintenanceCount: 7,
    status: 'Operational'
  }
])

// Maintenance Schedule
const maintenanceSchedule = ref([
  {
    id: 1,
    type: 'Annual Survey',
    description: 'Complete hull and machinery inspection',
    scheduledDate: '2024-06-15',
    status: 'Scheduled',
    lastPerformed: '2023-06-10',
    nextDue: '2024-06-15'
  },
  {
    id: 2,
    type: 'Dry Dock',
    description: 'Hull cleaning and painting',
    scheduledDate: '2024-09-20',
    status: 'Scheduled',
    lastPerformed: '2022-09-15',
    nextDue: '2024-09-20'
  },
  {
    id: 3,
    type: 'Engine Overhaul',
    description: 'Main engine major maintenance',
    scheduledDate: '2024-03-01',
    status: 'Completed',
    lastPerformed: '2024-03-01',
    nextDue: '2025-03-01'
  },
  {
    id: 4,
    type: 'Safety Equipment',
    description: 'Lifeboat and fire equipment inspection',
    scheduledDate: '2024-04-15',
    status: 'In Progress',
    lastPerformed: '2023-04-10',
    nextDue: '2024-04-15'
  },
  {
    id: 5,
    type: 'Navigation System',
    description: 'Radar and communication equipment check',
    scheduledDate: '2024-02-28',
    status: 'Overdue',
    lastPerformed: '2023-02-25',
    nextDue: '2024-02-28'
  },
  {
    id: 6,
    type: 'Ballast Water System',
    description: 'System inspection and maintenance',
    scheduledDate: '2024-07-10',
    status: 'Scheduled',
    lastPerformed: '2023-07-05',
    nextDue: '2024-07-10'
  },
  {
    id: 7,
    type: 'Cargo Hold',
    description: 'Structural integrity check',
    scheduledDate: '2024-05-20',
    status: 'Scheduled',
    lastPerformed: '2023-05-15',
    nextDue: '2024-05-20'
  },
  {
    id: 8,
    type: 'Propulsion System',
    description: 'Propeller and shaft inspection',
    scheduledDate: '2024-08-05',
    status: 'Scheduled',
    lastPerformed: '2023-08-01',
    nextDue: '2024-08-05'
  }
])

// Ship Modifications
const shipModifications = ref([
  {
    id: 1,
    type: 'Engine Upgrade',
    description: 'Installation of new fuel-efficient main engine',
    dateCompleted: '2023-05-15',
    location: 'Singapore Shipyard',
    contractor: 'Marine Engineering Solutions Pte Ltd',
    status: 'Completed'
  },
  {
    id: 2,
    type: 'Ballast Water Treatment System',
    description: 'Installation of IMO-compliant ballast water treatment system',
    dateCompleted: '2023-08-20',
    location: 'Busan Shipyard',
    contractor: 'OceanTech Systems',
    status: 'Completed'
  },
  {
    id: 3,
    type: 'Navigation System',
    description: 'Upgrade of radar and communication systems',
    dateCompleted: '2023-11-10',
    location: 'Hong Kong Shipyard',
    contractor: 'NavCom Technologies',
    status: 'Completed'
  },
  {
    id: 4,
    type: 'Cargo Hold Modification',
    description: 'Reinforcement of cargo hold structure for increased capacity',
    dateCompleted: '2024-01-25',
    location: 'Shanghai Shipyard',
    contractor: 'Marine Construction Co.',
    status: 'Completed'
  },
  {
    id: 5,
    type: 'Hull Coating',
    description: 'Application of new anti-fouling coating system',
    dateCompleted: '2024-02-15',
    location: 'Singapore Shipyard',
    contractor: 'Marine Coatings International',
    status: 'Completed'
  },
  {
    id: 6,
    type: 'Safety Equipment',
    description: 'Installation of new life-saving appliances',
    dateCompleted: '2024-03-01',
    location: 'Singapore Shipyard',
    contractor: 'Safety Marine Equipment',
    status: 'In Progress'
  },
  {
    id: 7,
    type: 'Crew Accommodation',
    description: 'Renovation of crew quarters and common areas',
    dateCompleted: '2024-04-10',
    location: 'Singapore Shipyard',
    contractor: 'Marine Interiors Ltd',
    status: 'Approved'
  },
  {
    id: 8,
    type: 'Propulsion System',
    description: 'Installation of new propeller system',
    dateCompleted: '2024-05-20',
    location: 'Singapore Shipyard',
    contractor: 'Propulsion Systems Inc',
    status: 'Pending'
  }
])

// Add these new refs
const showAddComponentModal = ref(false)
const newComponent = ref({
    name: '',
    skuNumber: '',
    dateAdded: new Date().toISOString().split('T')[0],
    lastMaintenance: new Date().toISOString().split('T')[0],
    maintenanceCount: 0,
    status: 'Operational'
})

const showEditComponentModal = ref(false)
const editingComponent = ref({
    id: null,
    name: '',
    skuNumber: '',
    dateAdded: '',
    lastMaintenance: '',
    maintenanceCount: 0,
    status: 'Operational'
})

const showAddCrewModal = ref(false)
const newCrew = ref({
    name: '',
    position: '',
    nationality: '',
    licenseNumber: '',
    status: 'On Board',
    joinDate: new Date().toISOString().split('T')[0]
})

// Add available crew members data
const availableCrewMembers = ref([
    {
        name: 'John Smith',
        position: 'Captain',
        nationality: 'British',
        licenseNumber: 'CAP123456',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'Michael Brown',
        position: 'Chief Engineer',
        nationality: 'American',
        licenseNumber: 'ENG789012',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'David Wilson',
        position: 'First Officer',
        nationality: 'Australian',
        licenseNumber: 'FO345678',
        status: 'On Leave',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'Robert Chen',
        position: 'Second Engineer',
        nationality: 'Chinese',
        licenseNumber: 'ENG901234',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'James Lee',
        position: 'Chief Cook',
        nationality: 'Singaporean',
        licenseNumber: 'CC567890',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'Thomas Anderson',
        position: 'Bosun',
        nationality: 'Canadian',
        licenseNumber: 'BOS123789',
        status: 'Off Duty',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'Maria Garcia',
        position: 'Deck Officer',
        nationality: 'Spanish',
        licenseNumber: 'DO456123',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    },
    {
        name: 'Hans Müller',
        position: 'Electrician',
        nationality: 'German',
        licenseNumber: 'EL789456',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    }
])

// Add function to handle name selection
const handleNameSelection = (selectedName) => {
    const selectedMember = availableCrewMembers.value.find(member => member.name === selectedName)
    if (selectedMember) {
        newCrew.value = {
            ...newCrew.value,
            name: selectedMember.name,
            position: selectedMember.position,
            nationality: selectedMember.nationality,
            licenseNumber: selectedMember.licenseNumber,
            status: selectedMember.status,
            joinDate: new Date().toISOString().split('T')[0]
        }
    }
}

const showEditCrewModal = ref(false)
const editingCrew = ref({
    id: null,
    name: '',
    position: '',
    nationality: '',
    licenseNumber: '',
    status: 'On Board',
    joinDate: ''
})

// Add these new functions
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

const addNewCrew = () => {
    const newId = crew.value.length + 1
    crew.value.push({
        id: newId,
        name: newCrew.value.name,
        position: newCrew.value.position,
        nationality: newCrew.value.nationality,
        licenseNumber: newCrew.value.licenseNumber,
        status: newCrew.value.status,
        joinDate: new Date().toISOString().split('T')[0]
    })
    
    // Reset form
    newCrew.value = {
        name: '',
        position: '',
        nationality: '',
        licenseNumber: '',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0]
    }
    
    // Close modal
    showAddCrewModal.value = false
}

const editCrew = (member) => {
    editingCrew.value = { ...member }
    showEditCrewModal.value = true
}

const updateCrew = () => {
    const index = crew.value.findIndex(member => member.id === editingCrew.value.id)
    if (index !== -1) {
        crew.value[index] = { ...editingCrew.value }
    }
    showEditCrewModal.value = false
}

const deleteCrew = (member) => {
    if (confirm('Are you sure you want to delete this crew member?')) {
        const index = crew.value.findIndex(m => m.id === member.id)
        if (index !== -1) {
            crew.value.splice(index, 1)
        }
    }
}

// Add these new refs and functions
const showAddModificationModal = ref(false)
const newModification = ref({
    type: '',
    description: '',
    dateCompleted: new Date().toISOString().split('T')[0],
    location: '',
    contractor: '',
    status: 'Pending'
})

const showEditModificationModal = ref(false)
const editingModification = ref({
    id: null,
    type: '',
    description: '',
    dateCompleted: '',
    location: '',
    contractor: '',
    status: 'Pending'
})

const addNewModification = () => {
    const newId = shipModifications.value.length + 1
    shipModifications.value.push({
        id: newId,
        type: newModification.value.type,
        description: newModification.value.description,
        dateCompleted: newModification.value.dateCompleted,
        location: newModification.value.location,
        contractor: newModification.value.contractor,
        status: newModification.value.status
    })
    
    // Reset form
    newModification.value = {
        type: '',
        description: '',
        dateCompleted: new Date().toISOString().split('T')[0],
        location: '',
        contractor: '',
        status: 'Pending'
    }
    
    // Close modal
    showAddModificationModal.value = false
}

const editModification = (modification) => {
    editingModification.value = { ...modification }
    showEditModificationModal.value = true
}

const updateModification = () => {
    const index = shipModifications.value.findIndex(mod => mod.id === editingModification.value.id)
    if (index !== -1) {
        shipModifications.value[index] = { ...editingModification.value }
    }
    showEditModificationModal.value = false
}

const deleteModification = (modification) => {
    if (confirm('Are you sure you want to delete this modification?')) {
        const index = shipModifications.value.findIndex(mod => mod.id === modification.id)
        if (index !== -1) {
            shipModifications.value.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
// Add any custom styles here
</style> 