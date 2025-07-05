export default [
  {
    child: [
      {
        title: "Dashboard",
        path: "/new/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
      },
    ],
  },
  {
    header: "PENGURUSAN MAKLUMAT DAN PEMBAIKAN VESEL",
    child: [
      // {
      //   title: "Pendaftaran Vesel",
      //   path: "/new/pendaftaran-vesel",
      //   icon: "uil:ship",
      //   child: [],
      // },
      {
        title: "Pembaikan Vesel",
        icon: "pajamas:issue-type-maintenance",
        child: [         
          {
            title: "Corrective Maintenance",
            path: "/new/pembaikan-vesel/kad-kerja",
          },
          {
            title: "PM/REFIT/AD/AMP/SLEP",
            path: "/new/pembaikan-vesel/pms",
          },
          {
            title: "Cannibalize",
            icon: "ri:ship-line",
            path: "/new/pembaikan-vesel/cannibalize",
          },
          {
            title: "Rupacara Aset",
            icon: "ri:ship-line",
            path: "/new/pembaikan-vesel/rupacara-aset",
          },
          {
            title: "Return of Vessel Availability",
            icon: "ri:ship-line",
            path: "/new/pembaikan-vesel/rova",
          },
          {
            title: "Planning Maintenance Schedule",
            icon: "ri:ship-line",
            path: "/new/pembaikan-vesel/pms",
          },
          
        ],
      },
      {
        title: "Profil Vesel",
        icon: "ri:ship-line",
        path: "/new/lihatVesel/1",
        
      },
    ],
  },
  {
    header: "PENGURUSAN MAKLUMAT KREW TEKNIKAL",
    child: [
      {
        title: "Maklumat Krew",
        path: "/new/data-kru",
        icon: "healthicons:domestic-worker",       
      },
      {
        title: "Permohonan Latihan",
        path: "/new/permohonan-latihan",
        icon: "streamline:interface-user-check-actions-close-checkmark-check-geometric-human-person-single-success-up-user",       
      },
      
    ],
  },
  {
    header: "PENGURUSAN VENDOR",
    child: [
      {
        title: "Data vendor",
        path: "/new/data-vendor",
        icon: "material-symbols-light:article-person-outline",       
      },
      {
        title: "Pengurusan Kontrak",
        path: "/new/pengurusan-kontrak",
        icon: "material-symbols-light:lab-profile-outline-sharp",       
      },
    ],
  },
  // {
  //   header: "PENGURUSAN PENGGUNA DAN SISTEM",
  //   child: [
  //     {
  //       title: "Pengurusan Pengguna",
  //       icon: "pajamas:issue-type-maintenance",
  //       child: [
  //         {
  //           title: "Peranan",
  //           path: "/new/tetapan-peranan",     
  //         },
  //         {
  //           title: "Pengguna",
  //           path: "/new/tetapan-pengguna",     
  //         },
  //       ]     
  //     },
  //     {
  //       title: "Pengurusan Sistem",
  //       icon: "pajamas:issue-type-maintenance",
  //       child: [
  //         {
  //           title: "Audit trail",
  //           path: "/new/tetapan-audit-trail",     
  //         },
  //         {
  //           title: "SMTP",
  //           path: "/new/tetapan-smtp",     
  //         },
  //         {
  //           title: "Pangkalan Data",
  //           path: "/new/tetapan-pengakalan-data",     
  //         },
  //         {
  //           title: "Integrasi Sistem Luar",
  //           path: "/new/tetapan-integrasi-sistem-luar",     
  //         },
  //       ]     
  //     },
  //     {
  //       title: "Pengurusan Data",
  //       path: "/new/pengurusan-data",
  //       icon: "pajamas:issue-type-maintenance",       
  //     }, 
      
  //   ],
  // },

  // {
  //   header: "",
  //   description: "",
  //   child: [
  //     {
  //       title: "Laman Utama",
  //       path: "/dashboard",
  //       icon: "ic:outline-dashboard",
  //       child: [],
  //     },
  //     // {
  //     //   title: "Kad Kerja",
  //     //   path: "/kad-kerja",
  //     //   icon: "lineicons:ship-1",
  //     //   child:[
  //     //     {
  //     //         title: "Tambah Kad Kerja",
  //     //         path: "",
  //     //         icon: "lineicons:ship-1",
  //     //       },
  //     //       {
  //     //         title: "Semak Kad Kerja",
  //     //         path: "",
  //     //         icon: "lineicons:ship-1",
  //     //       },
  //     //       {
  //     //         title: "Lulus Kad Kerja",
  //     //         path: "",
  //     //         icon: "lineicons:ship-1",
  //     //       },
  //     //   ]
  //     // },
  //     {
  //       title: "Vessel",
  //       path: "/kapal",
  //       icon: "lineicons:ship-1",
  //       child: [
  //         {
  //           title: "Tambah Vessel Baru",
  //           path: "/kapal/add",
  //           icon: "lineicons:ship-1",
  //         },
  //         {
  //           title: "Senarai Vessel",
  //           path: "/kapal",
  //           icon: "lineicons:ship-1",
  //         },
  //       ]
  //     },
     
  //     // {
  //     //   "title": "Pengurusan Aset",
  //     //   "icon": "ix:report-general",
  //     //   "child": [
  //     //     // {
  //     //     //   title: "Kad Kerja",
  //     //     //   path: "/kad-kerja",
  //     //     //   icon: "lineicons:ship-1",
  //     //     // },
  //     //     // {
  //     //     //   title: "Kapal",
  //     //     //   path: "/kapal",
  //     //     //   icon: "lineicons:ship-1",
  //     //     // },
  //     //     // {        
  //     //     //   title: "Bot",
  //     //     //   path: "/bot",
  //     //     //   icon: "tabler:speedboat",
  //     //     // },
  //     //     // {
  //     //     //   title: "Senarai Alat Ganti (OSL)",
  //     //     //   path: "/komponen-ship",
  //     //     //   icon: "material-symbols:settings-input-component-outline"
  //     //     // },
  //     //     // {
  //     //     //   title: "Krew",
  //     //     //   path: "/krew",
  //     //     //   icon: "tabler:users-group"
  //     //     // },
  //     //     // {
  //     //     //   title: "Sistem Perancangan Penyelenggaraan (PMS)",
  //     //     //   path: "/baik-pulih",
  //     //     //   icon: "fluent:wrench-screwdriver-32-regular"
  //     //     // },
  //     //     // {
  //     //     //   title: "Pengubahsuaian",
  //     //     //   path: "/ubah-suai",
  //     //     //   icon: "oui:app-upgrade-assistant"
  //     //     // },
  //     //   ]
  //     // },
  //     // {
  //     //   "title": "Pengurusan Pembekal",
  //     //   "icon": "ix:report-general",
  //     //   "child": [
  //     //     {
  //     //       title: "Pembekal",
  //     //       path: "/kapal",
  //     //       icon: "lineicons:ship-1",
  //     //     },
  //     //     {        
  //     //       title: "E-invois",
  //     //       path: "/bot",
  //     //       icon: "tabler:speedboat",
  //     //     },
  //     //   ]
  //     // },
  //     // {
  //     //   "title": "Pengurusan Latihan",
  //     //   "icon": "ix:report-general",
  //     //   "child": [
  //     //     {
  //     //       title: "Latihan",
  //     //       path: "/kapal",
  //     //       icon: "lineicons:ship-1",
  //     //     },
  //     //     {        
  //     //       title: "Permintaan Latihan",
  //     //       path: "/bot",
  //     //       icon: "tabler:speedboat",
  //     //     },
  //     //   ]
  //     // },
      
  //     {
  //       "title": "Laporan",
  //       "icon": "ix:report-general",
  //       "child": [
  //         // {
  //         //   "title": "OA",
  //         //   "path": "/report/oa"
  //         // },
  //         // {
  //         //   "title": "Krew",
  //         //   "path": "/report/krew"
  //         // },
  //         // {
  //         //   "title": "ROVA",
  //         //   "path": "/report/rova"
  //         // }
  //         {
  //           "title": "Kesiapsiagaan Aset Keseluruhan",
  //           "path": "/report/kesiapansiagaan-aset-keseluruhan"
  //         },
  //         {
  //           "title": "Kesiapsiagaan Aset Mengikut Maritim",
  //           "path": "/report/kesiapansiagaan-aset-maritim"
  //         },
  //         {
  //           "title": "Kesiapsiagaan Aset Mengikut Maritim Negeri",
  //           "path": "/report/kesiapansiagaan-aset-maritim-negeri"
  //         },
  //         {
  //           "title": "Kesiapsiagaan Aset Mengikut Jenis Pembaikan",
  //           "path": "/report/kesiapansiagaan-aset-jenis-pembaikan"
  //         },
  //         {
  //           "title": "Kesiapsiagaan Aset Mengikut Jenis",
  //           "path": "/report/kesiapansiagaan-aset-jenis"
  //         },
  //         {
  //           "title": "Laporan Kesiapsiagaan Aset ",
  //           "path": "/report/kesiapansiagaan-aset"
  //         },
  //         {
  //           "title": "Ringkasan",
  //           "path": "/report/ringkasan"
  //         },
  //       ]
  //     },
  //   ],
  // },
  // {
  //   header: "Pandangan Negeri",
  //   description: "Pandangan Negeri",
  //   child: [
  //     {
  //       title: "Papan Pemuka",
  //       path: "/dashboard-negeri",
  //       icon: "ic:outline-dashboard",
  //       child: [],
  //     },
  //     {
  //       title: "Kad Kerja",
  //       path: "/kapal",
  //     },
  //   ],
  // },
  // {
  //   header: "Pandangan Krew",
  //   description: "Pandangan Krew",
  //   child: [
  //     {
  //       title: "Papan Pemuka",
  //       path: "/dashboard-krew",
  //       icon: "ic:outline-dashboard",
  //       child: [],
  //     },
  //     {
  //       title: "Kad Kerja",
  //       path: "/kapal",
  //     },
  //   ],
  // },
 
];
