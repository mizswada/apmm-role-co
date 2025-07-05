<template>
    <div class="bg-white p-6 rounded-lg shadow mt-2 mb-5 ">
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
                        <th class="text-left py-3 px-4">Location</th>
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
                        <td class="py-3 px-4">{{ member.shipName || 'Not Assigned' }}</td>
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
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ship Assignment</label>
                    <FormKit
                        v-model="newCrew.shipId"
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
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ship Assignment</label>
                    <FormKit
                        v-model="editingCrew.shipId"
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
</template>

<script setup>
// Crew Information
const crew = ref([
  {
    id: 1,
    name: 'John Smith',
    position: 'Captain',
    nationality: 'British',
    licenseNumber: 'CAP123456',
    status: 'On Board',
    joinDate: '2023-01-15',
    shipId: 1,
    shipName: 'MV Ocean Star'
  },
  {
    id: 2,
    name: 'Michael Brown',
    position: 'Chief Engineer',
    nationality: 'American',
    licenseNumber: 'ENG789012',
    status: 'On Board',
    joinDate: '2023-02-20',
    shipId: 2,
    shipName: 'MV Pacific Voyager'
  },
  {
    id: 3,
    name: 'David Wilson',
    position: 'First Officer',
    nationality: 'Australian',
    licenseNumber: 'FO345678',
    status: 'On Leave',
    joinDate: '2023-03-10',
    shipId: 3,
    shipName: 'MV Atlantic Explorer'
  },
  {
    id: 4,
    name: 'Robert Chen',
    position: 'Second Engineer',
    nationality: 'Chinese',
    licenseNumber: 'ENG901234',
    status: 'On Board',
    joinDate: '2023-04-05',
    shipId: 4,
    shipName: 'MV Indian Ocean'
  },
  {
    id: 5,
    name: 'James Lee',
    position: 'Chief Cook',
    nationality: 'Singaporean',
    licenseNumber: 'CC567890',
    status: 'On Board',
    joinDate: '2023-05-15',
    shipId: 1,
    shipName: 'MV Ocean Star'
  },
  {
    id: 6,
    name: 'Thomas Anderson',
    position: 'Bosun',
    nationality: 'Canadian',
    licenseNumber: 'BOS123789',
    status: 'Off Duty',
    joinDate: '2023-06-20',
    shipId: null,
    shipName: null
  },
  {
    id: 7,
    name: 'Maria Garcia',
    position: 'Deck Officer',
    nationality: 'Spanish',
    licenseNumber: 'DO456123',
    status: 'On Board',
    joinDate: '2023-07-10',
    shipId: 2,
    shipName: 'MV Pacific Voyager'
  },
  {
    id: 8,
    name: 'Hans Müller',
    position: 'Electrician',
    nationality: 'German',
    licenseNumber: 'EL789456',
    status: 'On Board',
    joinDate: '2023-08-25',
    shipId: 3,
    shipName: 'MV Atlantic Explorer'
  }
])

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

const addNewCrew = () => {
    const newId = crew.value.length + 1
    const selectedShip = ships.value.find(ship => ship.id === newCrew.value.shipId)
    crew.value.push({
        id: newId,
        name: newCrew.value.name,
        position: newCrew.value.position,
        nationality: newCrew.value.nationality,
        licenseNumber: newCrew.value.licenseNumber,
        status: newCrew.value.status,
        joinDate: new Date().toISOString().split('T')[0],
        shipId: newCrew.value.shipId,
        shipName: selectedShip ? selectedShip.name : null
    })
    
    // Reset form
    newCrew.value = {
        name: '',
        position: '',
        nationality: '',
        licenseNumber: '',
        status: 'On Board',
        joinDate: new Date().toISOString().split('T')[0],
        shipId: null
    }
    
    // Close modal
    showAddCrewModal.value = false
}
const showAddCrewModal = ref(false)
const newCrew = ref({
    name: '',
    position: '',
    nationality: '',
    licenseNumber: '',
    status: 'On Board',
    joinDate: new Date().toISOString().split('T')[0],
    shipId: null
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
    joinDate: '',
    shipId: null,
    shipName: ''
})


const editCrew = (member) => {
    editingCrew.value = { ...member }
    showEditCrewModal.value = true
}

const updateCrew = () => {
    const index = crew.value.findIndex(member => member.id === editingCrew.value.id)
    if (index !== -1) {
        const selectedShip = ships.value.find(ship => ship.id === editingCrew.value.shipId)
        crew.value[index] = { 
            ...editingCrew.value,
            shipName: selectedShip ? selectedShip.name : null
        }
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
</script>

<style lang="scss" scoped>

</style>