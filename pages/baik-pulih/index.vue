<template>
    <div class="bg-white p-6 rounded-lg shadow mt-2 mb-5 ">
        <h2 class="text-lg font-semibold mb-4">Maintenance Schedule</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="border-b">
                        <!-- <th class="text-left py-3 px-4">No.</th> -->
                        <th class="text-left py-3 px-4">Next Due</th>
                        <th class="text-left py-3 px-4">Maintenance Type</th>
                        <th class="text-left py-3 px-4">Description</th>
                        <th class="text-left py-3 px-4">Scheduled Date</th>
                        <th class="text-left py-3 px-4">Status</th>
                        <th class="text-left py-3 px-4">Last Performed</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="maintenance in maintenanceSchedule" :key="maintenance.id" class="border-b hover:bg-gray-50">
                        <!-- <td class="py-3 px-4">{{ maintenance.id }}</td> -->
                        <td class="py-3 px-4">{{ maintenance.nextDue }}</td>
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
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>

</style>