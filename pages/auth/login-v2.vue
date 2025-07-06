<script setup>
definePageMeta({
  title: "login-v2",
  layout: "empty",
});
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <div class="flex justify-center items-center gap-4 mb-6 bg-[#1b233a] p-4 rounded-lg">
          <img src="@/assets/img/logo/apmm_logo_baru.png" alt="APMM Logo Baru" class="w-32 h-auto object-contain" />
          <img src="@/assets/img/logo/LOGO_apmm.png" alt="APMM Logo" class="w-32 h-auto object-contain" />
        </div>
        <h3 class="mb-4">Log Masuk</h3>
        <p class="mb-6">
          Selamat Datang ke <br>
          SISTEM PENGURUSAN DAN PEMANTAUAN ASET KEJURUTERAAN MARIN APMM <br> (E-JUTRA).<br>
          Sila log masuk untuk meneruskan.</p>
        <div class="grid grid-cols-2">
          <FormKit
            type="text"
            label="Nama Pengguna"
            outer-class="col-span-2"
            label-class="text-left"
          />
          <FormKit
            type="password"
            label="Kata Laluan"
            outer-class="col-span-2"
            label-class="text-left"
          />
          <FormKit type="checkbox" label="Ingat Saya" />
          <NuxtLink
            class="flex items-center justify-end h-5 mt-1 text-primary hover:underline"
            to="/auth/forgot-password-v2"
            >Lupa Kata Laluan?</NuxtLink
          >
          <NuxtLink to="/new/dashboard" class="col-span-2">
            <FormKit type="button" input-class="w-full"> Log Masuk</FormKit>
          </NuxtLink>
          
          <!-- <rs-button
            class="w-full col-span-2 !bg-white !text-inherit shadow-md"
          >
            <img class="w-5 mr-2" src="@/assets/img/brand/google-logo.svg" />
            Log Masuk dengan Google
          </rs-button> -->
        </div>
        <!-- <p class="mt-3 text-center">
          Tiada akaun?
          <NuxtLink to="/auth/register-v2" class="text-primary hover:underline"
            >Daftar</NuxtLink
          >
        </p> -->
      </rs-card>
    </div>
  </div>
</template>
