<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Tetapan Pengguna</h1>
        
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Senarai Pengguna</h2>
                
                <rs-button variant="primary" @click="openBulkRoleModal">
                    <Icon name="ic:baseline-plus" class="mr-2" />
                    Peranan Pukal
                </rs-button>
            </div>

            <rs-table
                :data="users"
                :field="['namaPengguna','bahagian','MN/ZM','peranan','status','tindakan']"
                :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                    hover: true
                }"
                :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: true
                }"
                advanced
            >
                <template v-slot:status="{ text }">
                    <rs-badge :variant="text === 'AKTIF' ? 'success' : 'danger'" >
                        {{ text }}
                    </rs-badge>
                </template>
                <template v-slot:tindakan="{ value }">
                    <div class="flex gap-2">
                        <button class="btn btn-outline-secondary btn-sm" @click="openEditModal(value)">
                            <Icon name="ic:baseline-edit" />
                        </button>
                    </div>
                </template>
            </rs-table>
        </div>

        <!-- Edit Role Modal -->
        <rs-modal v-model="isEditModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">
                    Kemaskini Peranan
                </h3>
            </template>
            <template #body>
                <div class="space-y-6">
                    <!-- User Details Display -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="space-y-2">
                            <div>
                                <label class="text-sm text-gray-600">Nama Pengguna</label>
                                <p class="font-medium">{{ selectedUser?.nama_pengguna }}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-600">Bahagian</label>
                                <p class="font-medium">{{ selectedUser?.bahagian || 'TIADA' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Role Selection Form -->
                    <form @submit.prevent="handleEditSubmit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Peranan</label>
                            <FormKit
                                type="select"
                                v-model="editFormData.peranan"
                                :options="roles"
                                placeholder="Pilih peranan"
                                validation="required"
                            />
                        </div>
                    </form>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button variant="secondary" @click="isEditModalOpen = false">
                        Batal
                    </rs-button>
                    <rs-button variant="primary" @click="handleEditSubmit">
                        Simpan
                    </rs-button>
                </div>
            </template>
        </rs-modal>

        <!-- Add/Edit User Modal -->
        <rs-modal v-model="isModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">
                    {{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna' }}
                </h3>
            </template>
            <template #body>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Nama</label>
                        <FormKit type="text" v-model="formData.nama_pengguna"
                            placeholder="Masukkan nama pengguna" validation="required" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Bahagian</label>
                        <FormKit type="text" v-model="formData.bahagian"
                            placeholder="Masukkan bahagian" validation="required" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">MN/ZM</label>
                        <FormKit type="text" v-model="formData.MNZN"
                            placeholder="Masukkan MN/ZM" validation="required" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Peranan</label>
                        <FormKit type="select" v-model="formData.peranan"
                            :options="roles" placeholder="Pilih peranan"
                            validation="required" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Status</label>
                        <FormKit type="select" v-model="formData.status"
                            :options="['AKTIF', 'TIDAK AKTIF']"
                            placeholder="Pilih status" validation="required" />
                    </div>
                    <div v-if="!isEditing">
                        <label class="block text-sm font-medium mb-1">Password</label>
                        <FormKit type="password" v-model="formData.password"
                            placeholder="Masukkan password" validation="required|length:8"/>
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button variant="secondary" @click="isModalOpen = false">
                        Batal
                    </rs-button>
                    <rs-button variant="primary" @click="handleSubmit">
                        {{ isEditing ? 'Simpan' : 'Tambah' }}
                    </rs-button>
                </div>
            </template>
        </rs-modal>

        <!-- Delete Confirmation Modal -->
        <rs-modal v-model="isDeleteModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">Padam Pengguna</h3>
            </template>
            <template #body>
                <p>Adakah anda pasti untuk memadam pengguna ini?</p>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button variant="secondary" @click="isDeleteModalOpen = false">
                        Batal
                    </rs-button>
                    <rs-button variant="danger" @click="handleDelete">
                        Padam
                    </rs-button>
                </div>
            </template>
        </rs-modal>

        <!-- Add this new modal for bulk role assignment -->
        <rs-modal v-model="isBulkRoleModalOpen" size="lg">
            <template #header>
                <h3 class="text-lg font-semibold">
                    Peranan Pukal
                </h3>
            </template>
            <template #body>
                <form @submit.prevent="handleBulkRoleSubmit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Peranan</label>
                        <FormKit
                            type="select"
                            v-model="bulkRoleData.peranan"
                            :options="roles"
                            placeholder="Pilih peranan"
                            validation="required"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Senarai Pengguna</label>
                        <FormKit
                            type="select"
                            v-model="bulkRoleData.selectedUsers"
                            :options="userOptions"
                            placeholder="Pilih pengguna"
                            validation="required"
                            multiple="true"
                        />
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <rs-button variant="secondary" @click="isBulkRoleModalOpen = false">
                        Batal
                    </rs-button>
                    <rs-button variant="primary" @click="handleBulkRoleSubmit">
                        Simpan
                    </rs-button>
                </div>
            </template>
        </rs-modal>
    </div>
</template>

<script setup>
const users = ref([
    {
        nama_pengguna: 'ABANG HANAFIAH BIN ABANG ZAINUDDIN',
        bahagian: 'TIADA',
        MNZN: 'MARITIM NEGERI TERENGGANU',
        peranan: 'PENGANALISA (TINGKAH LAKU + CROWDSOURCING)',
        status: 'AKTIF'
    },
    {
        nama_pengguna: 'ABANG JAMARI BIN SALIM',
        bahagian: 'TIADA',
        MNZN: 'BAHAGIAN LOGISTIK',
        peranan: 'PENGANALISA (TINGKAH LAKU + CROWDSOURCING)',
        status: 'AKTIF'
    },
    {
        nama_pengguna: 'ABANG LET BIN ABANG BEKAWI',
        bahagian: 'TIADA',
        MNZN: 'WILAYAH MARITIM SARAWAK',
        peranan: 'PENGANALISA PERISIKAN',
        status: 'AKTIF'
    },
    {
        nama_pengguna: 'ABD HAFIS BIN HUSSIN',
        bahagian: 'BAHAGIAN PERANCANGAN STRATEGIK DAN ANTARABANGSA',
        MNZN: 'SEKTOR PEJABAT KETUA PENGARAH',
        peranan: 'PENTADBIR SISTEM',
        status: 'AKTIF'
    },
    {
        nama_pengguna: 'ABD HALIM BIN KHAMIS',
        bahagian: 'TIADA',
        MNZN: 'MARITIM NEGERI PERAK',
        peranan: 'PENGANALISA LOKASI DAN KORELASI',
        status: 'AKTIF'
    }
]);

const roles = [
    'PENGANALISA (TINGKAH LAKU + CROWDSOURCING)',
    'PENGANALISA PERISIKAN',
    'PENTADBIR SISTEM',
    'PENGANALISA LOKASI DAN KORELASI',
    'PEGAWAI PANTAI'
];

const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const selectedUser = ref(null);

const formData = ref({
    nama_pengguna: '',
    bahagian: '',
    MNZN: '',
    peranan: '',
    status: 'AKTIF'
});

const isBulkRoleModalOpen = ref(false);
const bulkRoleData = ref({
    peranan: '',
    selectedUsers: []
});

const isEditModalOpen = ref(false);
const editFormData = ref({
    peranan: ''
});

const userOptions = computed(() => {
    return users.value.map(user => ({
        value: user.nama_pengguna,
        label: `${user.nama_pengguna} - ${user.bahagian}`
    }));
});

const openAddModal = () => {
    isEditing.value = false;
    formData.value = {
        nama_pengguna: '',
        bahagian: '',
        MNZN: '',
        peranan: '',
        status: 'AKTIF'
    };
    isModalOpen.value = true;
};

const openEditModal = (user) => {
    selectedUser.value = user;
    editFormData.value = {
        peranan: user.peranan
    };
    isEditModalOpen.value = true;
};

const confirmDelete = (user) => {
    selectedUser.value = user;
    isDeleteModalOpen.value = true;
};

const handleSubmit = () => {
    if (isEditing.value) {
        // Update existing user
        const index = users.value.findIndex(u => u.nama_pengguna === selectedUser.value.nama_pengguna);
        if (index !== -1) {
            users.value[index] = {
                ...users.value[index],
                ...formData.value
            };
        }
    } else {
        // Add new user
        users.value.push({
            ...formData.value
        });
    }
    isModalOpen.value = false;
};

const handleDelete = () => {
    users.value = users.value.filter(u => u.nama_pengguna !== selectedUser.value.nama_pengguna);
    isDeleteModalOpen.value = false;
};

const openBulkRoleModal = () => {
    bulkRoleData.value = {
        peranan: '',
        selectedUsers: []
    };
    isBulkRoleModalOpen.value = true;
};

const handleBulkRoleSubmit = () => {
    // Update roles for selected users
    users.value = users.value.map(user => {
        if (bulkRoleData.value.selectedUsers.includes(user.nama_pengguna)) {
            return {
                ...user,
                peranan: bulkRoleData.value.peranan
            };
        }
        return user;
    });
    
    isBulkRoleModalOpen.value = false;
};

const handleEditSubmit = () => {
    if (!selectedUser.value) return;

    const index = users.value.findIndex(u => u.nama_pengguna === selectedUser.value.nama_pengguna);
    if (index !== -1) {
        users.value[index] = {
            ...users.value[index],
            peranan: editFormData.value.peranan
        };
    }
    
    isEditModalOpen.value = false;
};
</script>

<style lang="scss" scoped>
.rs-button {
    @apply flex items-center;
}

// Add styles for multi-select
:deep(.formkit-outer) {
    .formkit-input[multiple] {
        @apply min-h-[200px];
    }
}

.bg-gray-50 {
    background-color: #f9fafb;
}
</style>