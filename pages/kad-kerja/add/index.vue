<template>
    <div class="bg-white rounded-lg shadow p-6  mx-auto">
        <h2 class="text-xl font-bold text-center mb-4">BORANG LAPORAN KEROSAKAN</h2>
        <!-- MAKLUMAT KAPAL -->
        <div class="mb-4">
            <rs-fieldset  label="MAKLUMAT KAPAL">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">                
                    <FormKit label="Nama kapal/bot"  v-model="form.namaKapal"  type="text" disabled/>                
                    <FormKit label="No. daftar kad kerja" v-model="form.noKadKerja"  type="text" disabled/>                
                    <FormKit label="Kelas kapal" v-model="form.kelasKapal"  type="text" disabled/>                
                    <FormKit label="Tarikh Daftar" v-model="form.tarikhDaftar"  type="date" disabled/>                
                    <FormKit type="radio" label="Jenis laporan" help="Jenis laporan?" :options="jenislaporan"/> 
                </div>
            </rs-fieldset>            
        </div>
        <!-- MAKLUMAT PEMOHON -->
        <div class="mb-4">
            <rs-fieldset  label="MAKLUMAT PEMOHON">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormKit label="Nama" v-model="form.namaPemohon"  type="text" disabled/>
                    <FormKit label="Jawatan" v-model="form.jawatan"  type="text" disabled/>
                    <FormKit label="Tarikh mohon" v-model="form.tarikhMohon"  type="date" disabled/>
                </div>
            </rs-fieldset>            
        </div>

        <!-- MAKLUMAT KEROSAKAN -->
        <div class="mb-4">
            <rs-fieldset  label="MAKLUMAT KEROSAKAN">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit type="select" label="Kumpulan utama" v-model="form.kumpulanUtama" :options="kumpulanUtamaList" />
                    <FormKit type="select" label="Lokasi" v-model="form.lokasi" :options="lokasiList" />

                    <FormKit type="select" label="Sub-kumpulan/sistem" v-model="form.subKumpulan" :options="subKumpulanList" />
                    <FormKit type="select" label="Penguna terakhir" v-model="form.penggunaTerakhir" :options="pengunaTerakhirList" />
                    
                    <FormKit type="select" label="Sub-sistem/peralatan" v-model="form.subSistem" :options="subSistemList" />
                    <FormKit type="textarea" label="Ringkasan kerosakan" v-model="form.ringkasanKerosakan"  rows="2"/>

                    <FormKit type="select" label="Sub-peralatan" v-model="form.subPeralatan" :options="subPeralatanList" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit type="text" label="Running hours" v-model="form.runningHours"  disabled />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit  type="text" label="Round fired" v-model="form.roundFired"  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit  type="text" label="Manufacture / Model" v-model="form.manufactureModel" disabled />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit  type="text" label="Serial No." v-model="form.serialNo" disabled />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormKit type="number" label="Kuantiti" v-model="form.kuantiti" min="1" @keyup="updateSerialInputs" />
                </div>
                
                <div class="grid grid-cols-1 gap-4 mt-4">
                    <div v-for="(serial, index) in serialInputs" :key="index" class="flex items-center gap-4">
                        <label class="block text-sm w-24">Siri No. {{ index + 1 }}:</label>
                        <FormKit  type="text"  v-model="form.serialNumbers[index]" />
                    </div>
                </div>
            </rs-fieldset> 
        </div>

        <!-- GAMBAR KEROSAKAN -->
        <div class="mb-4">
            <rs-fieldset label="GAMBAR KEROSAKAN">
                <div class="flex justify-end mb-2">
                    <button @click="showAddPeralatanModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Icon name="material-symbols:add" />
                        Tambah Gambar
                    </button>
                </div>
                <rs-table
                    :data="gambarKerosakan"
                    :options="{
                        variant: 'default',
                        striped: true,
                        borderless: true,
                    }"
                    :options-advanced="{
                        sortable: true,
                        responsive: true,
                        filterable: false,
                    }"
                    advanced
                >
                    <template v-slot:tindakan="data">
                        <button 
                            @click="openFile(data.value)"
                            class="text-blue-600 hover:text-blue-800 py-3 px-4"
                        >
                            Lihat
                        </button>
                        <button 
                            @click="deleteItem(data.value)"
                            class="text-red-600 hover:text-red-800 py-3 px-4"
                        >
                            Hapus
                        </button>
                    </template>
                </rs-table>
            </rs-fieldset>
        </div>

        <!-- DOKUMEN SOKONGAN PERALATAN ROSAK -->
        <div class="mb-4">
            <rs-fieldset label="DOKUMEN SOKONGAN PERALATAN ROSAK">
                <rs-table
                    :data="dokumenSokonganKerosakan"
                    :options="{
                        variant: 'default',
                        striped: true,
                        borderless: true,
                    }"
                    :options-advanced="{
                        sortable: true,
                        responsive: true,
                        filterable: false,
                    }"
                    advanced
                >
                    <template v-slot:tindakan="data">
                        <button 
                            @click="openFile(data.value)"
                            class="text-blue-600 hover:text-blue-800 py-3 px-4"
                        >
                            Lihat
                        </button>
                    </template>
                </rs-table>
            </rs-fieldset>
        </div>

        <!-- LAMPIRAN DOKUMEN -->
        <div class="mb-4">
            <rs-fieldset label="LAMPIRAN DOKUMEN">
                <div class="flex justify-end mb-2">
                    <button @click="showAddLampiranModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Icon name="material-symbols:add" />
                        Tambah Lampiran
                    </button>
                </div>
                <rs-table
                    :data="lampiranDokumen"
                    :options="{
                        variant: 'default',
                        striped: true,
                        borderless: true,
                    }"
                    :options-advanced="{
                        sortable: true,
                        responsive: true,
                        filterable: false,
                    }"
                    advanced
                >
                    <template v-slot:tindakan="data">
                        <button 
                            @click="openFile(data.value)"
                            class="text-blue-600 hover:text-blue-800 py-3 px-4"
                        >
                            Lihat
                        </button>
                        <button 
                            @click="deleteLampiran(data.value)"
                            class="text-red-600 hover:text-red-800 py-3 px-4"
                        >
                            Hapus
                        </button>
                    </template>
                </rs-table>
            </rs-fieldset>
        </div>

        <!-- CATATAN -->
        <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">CATATAN:</label>
        <textarea v-model="form.catatan" class="FormKit  w-full" rows="3"></textarea>
        </div>
        <!-- BUTTONS -->
        <div class="flex gap-2 justify-end mt-6">
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Hantar</button>
        <button class="bg-blue-400 text-white px-4 py-2 rounded">Simpan</button>
        <button class="bg-blue-300 text-white px-4 py-2 rounded">Cetak</button>
        </div>
      
    </div>

    <!-- Add Damaged Equipment Modal -->
    <rs-modal v-model="showAddPeralatanModal" size="lg" title="Tambah Peralatan Rosak">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nama Fail</label>
                    <FormKit
                        v-model="newPeralatan.fileName"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Sila masukkan nama fail"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Muat Naik Fail</label>
                    <FormKit
                        type="file"
                        @change="onPeralatanFileChange"
                        class="mt-1 block w-full"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <p class="text-xs text-gray-500 mt-1">Format yang dibenarkan: PDF, DOC, DOCX, JPG, JPEG, PNG (Saiz mtindakanmum: 10MB)</p>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showAddPeralatanModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </button>
                <button
                    @click="addNewPeralatan"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Tambah Peralatan
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Edit File Modal -->
    <rs-modal v-model="showEditModal" size="lg" title="Edit Fail">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nama Fail</label>
                    <FormKit
                        v-model="editingFile.fileName"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Masukkan nama fail"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Muat Naik Fail Baru</label>
                    <FormKit
                        type="file"
                        @change="onEditFileChange"
                        class="mt-1 block w-full"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <p class="text-xs text-gray-500 mt-1">Format yang dibenarkan: PDF, DOC, DOCX, JPG, JPEG, PNG (Saiz mtindakanmum: 10MB)</p>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showEditModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </button>
                <button
                    @click="saveEdit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Simpan
                </button>
            </div>
        </template>
    </rs-modal>

    <!-- Add Lampiran Modal -->
    <rs-modal v-model="showAddLampiranModal" size="lg" title="Tambah Lampiran">
        <div class="p-4">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nama Fail</label>
                    <FormKit
                        v-model="newLampiran.fileName"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Sila masukkan nama fail"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Muat Naik Fail</label>
                    <FormKit
                        type="file"
                        @change="onLampiranFileChange"
                        class="mt-1 block w-full"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <p class="text-xs text-gray-500 mt-1">Format yang dibenarkan: PDF, DOC, DOCX, JPG, JPEG, PNG (Saiz mtindakanmum: 10MB)</p>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <button
                    @click="showAddLampiranModal = false"
                    class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </button>
                <button
                    @click="addNewLampiran"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Tambah Lampiran
                </button>
            </div>
        </template>
    </rs-modal>
   
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  const jenislaporan = ["Defect", "OSL"];
  const kumpulanUtamaList = ["PROPELLER", "ENGINE", "GENERATOR", "STEAM", "AIR", "OIL", "FUEL", "BALLAST", "OTHER"];
  const subKumpulanList = ["PROPELLER SUPPORT SYSTEM", "ENGINE SUPPORT SYSTEM", "GENERATOR SUPPORT SYSTEM", "STEAM SUPPORT SYSTEM", "AIR SUPPORT SYSTEM", "OIL SUPPORT SYSTEM", "FUEL SUPPORT SYSTEM", "BALLAST SUPPORT SYSTEM", "OTHER SUPPORT SYSTEM"];
  const subSistemList = ["STABILISER"];
  const lokasiList = ["JETI APMM SG.PULAI"];
  const pengunaTerakhirList = ["KM TAMBISAN"]; 
  const subPeralatanList= ["HYDRAULIC POWER UNIT"];
  
  
  const form = reactive({
    namaKapal: 'KM TAMBISAN',
    noKadKerja: 'APMM/TBN/11/23',
    kelasKapal: 'Tanker',
    tarikhDaftar: new Date().toISOString().split('T')[0],
    jenisLaporan: 'Defect',
    namaPemohon: 'BK(M) ABD HALIM BIN HAMID',
    jawatan: 'BENTARA KANAN MARITIM',
    tarikhMohon: new Date().toISOString().split('T')[0],
    kumpulanUtama: '',
    subKumpulan: '',
    subSistem: '',
    subPeralatan: '',
    lokasi: '',
    penggunaTerakhir: '',
    ringkasanKerosakan: '',
    runningHours: '450',
    roundFired: '',
    manufactureModel: 'HYDROMOT HYDRAULIC SOLUTION',
    serialNo: '1111000022',
    kuantiti: 1,
    serialNumbers: [''],
    gambarKerosakan: [],
    dokumenSokongan: [{ name: 'Maintenance Schedule Sheet dan Maintenance Instruction Sheet' }],
    lampiranDokumen: [],
    catatan: ''
  })

  const serialInputs = ref([0])

  function updateSerialInputs() {
    const quantity = parseInt(form.kuantiti) || 0
    if (quantity > 0) {
        serialInputs.value = Array(quantity).fill(0)
        const existingSerialNumbers = [...form.serialNumbers]
        form.serialNumbers = Array(quantity).fill('')
        for (let i = 0; i < Math.min(quantity, existingSerialNumbers.length); i++) {
            form.serialNumbers[i] = existingSerialNumbers[i]
        }
    } else {
        serialInputs.value = [0]
        form.serialNumbers = ['']
    }
  }

  function onImageUpload(e) {
    for (const file of e.target.files) {
      form.gambarKerosakan.push({ name: file.name })
    }
  }
  function onAttachmentUpload(e) {
    for (const file of e.target.files) {
      form.lampiranDokumen.push({ name: file.name })
    }
  }

const dokumenSokonganKerosakan = ref([
        { 
            id: 1,
            name: 'Maintenance Schedule Sheet dan Maintenance Instruction Sheet 1',
            tindakan:  'View'
        },
        { 
            id: 2,
            name: 'Maintenance Schedule Sheet dan Maintenance Instruction Sheet 2',
            tindakan: 'View'
        },
        { 
            id: 3,
            name: 'Maintenance Schedule Sheet dan Maintenance Instruction Sheet 3',
            tindakan: 'View'
        }
    ])

    const gambarKerosakan = ref([
        { 
            id: 1,
            name: 'Gambar 1',
            tindakan:  'View'
        },
        { 
            id: 2,
            name: 'Gambar 2',
            tindakan: 'View'
        },
        { 
            id: 3,
            name: 'Gambar 3',
            tindakan: 'View'
        }
    ])
  const ships = [
  {
    id: 1,
    name: 'MV Ocean Star',
    imoNumber: 'IMO1234567',
    status: 'Active',
    type: 'Container',
    lastUpdated: '2024-03-15',
    action: 'View'
  },
  {
    id: 2,
    name: 'MV Pacific Voyager',
    imoNumber: 'IMO7654321',
    status: 'Maintenance',
    type: 'Bulk Carrier',
    lastUpdated: '2024-03-14',
    action: 'View'
  },
  {
    id: 3,
    name: 'MV Atlantic Explorer',
    imoNumber: 'IMO9876543',
    status: 'Active',
    type: 'Tanker',
    lastUpdated: '2024-03-13',
    action: 'View'
  },
  {
    id: 4,
    name: 'MV Indian Ocean',
    imoNumber: 'IMO4567890',
    status: 'Inactive',
    type: 'Container',
    lastUpdated: '2024-03-12',
    action: 'View'
  }
]

const showAddPeralatanModal = ref(false)
const newPeralatan = reactive({
    name: '',
    serialNo: '',
    model: '',
    tarikhKerosakan: '',
    status: 'Rosak',
    fileName: '',
    file: null
})

function onPeralatanFileChange(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('Saiz fail melebihi 10MB')
            return
        }
        newPeralatan.file = file
        // Set default file name if not already set
        if (!newPeralatan.fileName) {
            newPeralatan.fileName = file.name
        }
    }
}

function addNewPeralatan() {
    if (newPeralatan.fileName && newPeralatan.file) {
        gambarKerosakan.value.push({
            id: gambarKerosakan.value.length + 1,
            name: newPeralatan.fileName,
            tindakan: 'Lihat',
            file: newPeralatan.file
        })
        showAddPeralatanModal.value = false
        newPeralatan.fileName = ''
        newPeralatan.file = null
    } else {
        alert('Sila masukkan nama fail dan muat naik fail')
    }
}

function openFile(item) {
    window.open("http://seapoc.finereport.com:8082/webroot/decision/view/duchamp?viewlet=APMM.fvs&ref_t=design&ref_c=838f563c-e2f6-40d2-8c0f-2a774506c3f4&page_number=1", '_blank')

    // if (item.file) {
    //     // Create a URL for the file
    //     const fileUrl = URL.createObjectURL(item.file)
    //     console.log("")
    //     // Open in new tab
    //     window.open("http://seapoc.finereport.com:8082/webroot/decision/view/duchamp?viewlet=APMM.fvs&ref_t=design&ref_c=838f563c-e2f6-40d2-8c0f-2a774506c3f4&page_number=1", '_blank')
    // } else {
    //     alert('Fail tidak dijumpai')
    // }
}

const showEditModal = ref(false)
const editingFile = reactive({
    id: null,
    fileName: '',
    file: null
})

function editFile(item) {
    editingFile.id = item.id
    editingFile.fileName = item.name
    editingFile.file = item.file
    showEditModal.value = true
}

function onEditFileChange(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('Saiz fail melebihi 10MB')
            return
        }
        editingFile.file = file
        // Set default file name if not already set
        if (!editingFile.fileName) {
            editingFile.fileName = file.name
        }
    }
}

function saveEdit() {
    if (editingFile.fileName) {
        // Find and update the item in gambarKerosakan
        const index = gambarKerosakan.value.findIndex(item => item.id === editingFile.id)
        if (index !== -1) {
            gambarKerosakan.value[index] = {
                ...gambarKerosakan.value[index],
                name: editingFile.fileName,
                file: editingFile.file
            }
        }

        // Find and update the item in dokumenSokongan
        const docIndex = form.dokumenSokongan.findIndex(item => item.name === gambarKerosakan.value[index].name)
        if (docIndex !== -1) {
            form.dokumenSokongan[docIndex] = {
                name: editingFile.fileName,
                file: editingFile.file
            }
        }

        // Close modal and reset form
        showEditModal.value = false
        editingFile.id = null
        editingFile.fileName = ''
        editingFile.file = null
    } else {
        alert('Sila masukkan nama fail')
    }
}

function deleteItem(item) {
    if (confirm('Adakah anda pasti mahu memHapus item ini?')) {
        // Remove from gambarKerosakan list
        const index = gambarKerosakan.value.findIndex(x => x.id === item.id)
        if (index !== -1) {
            gambarKerosakan.value.splice(index, 1)
        }

        // Remove from dokumenSokongan list
        const docIndex = form.dokumenSokongan.findIndex(x => x.name === item.name)
        if (docIndex !== -1) {
            form.dokumenSokongan.splice(docIndex, 1)
        }
    }
}

const lampiranDokumen = ref([
    { 
        id: 1,
        name: 'Lampiran 1',
        tindakan: 'View'
    },
    { 
        id: 2,
        name: 'Lampiran 2',
        tindakan: 'View'
    },
    { 
        id: 3,
        name: 'Lampiran 3',
        tindakan: 'View'
    }
])

const showAddLampiranModal = ref(false)
const newLampiran = reactive({
    fileName: '',
    file: null
})

function onLampiranFileChange(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('Saiz fail melebihi 10MB')
            return
        }
        newLampiran.file = file
        // Set default file name if not already set
        if (!newLampiran.fileName) {
            newLampiran.fileName = file.name
        }
    }
}

function addNewLampiran() {
    if (newLampiran.fileName && newLampiran.file) {
        lampiranDokumen.value.push({
            id: lampiranDokumen.value.length + 1,
            name: newLampiran.fileName,
            tindakan: 'Lihat',
            file: newLampiran.file
        })
        showAddLampiranModal.value = false
        newLampiran.fileName = ''
        newLampiran.file = null
    } else {
        alert('Sila masukkan nama fail dan muat naik fail')
    }
}

function deleteLampiran(item) {
    if (confirm('Adakah anda pasti mahu memHapus lampiran ini?')) {
        const index = lampiranDokumen.value.findIndex(x => x.id === item.id)
        if (index !== -1) {
            lampiranDokumen.value.splice(index, 1)
        }
    }
}
  </script>
  
  <style scoped>
  .FormKit  {
    @apply border rounded px-2 py-1 w-full;
  }
  </style> 