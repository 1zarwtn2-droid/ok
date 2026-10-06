import { ServiceItem, CareProductItem, OrderItem, ReviewItem, QueueSlot } from '../types';

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-deep-clean',
    name: 'Deep Clean Signature 360°',
    category: 'cleaning',
    price: 75000,
    durationHours: 48,
    description: 'Pembersihan menyeluruh 360 derajat pada seluruh bagian sepatu: Upper, Midsole, Outsole, Insole, hingga Laces dengan larutan formula enzim alami biodegradable.',
    benefits: [
      'Pembersihan 360 derajat lengkap (Upper, Midsole, Outsole, Laces)',
      'Free Antibacterial Deodorizing Spray & UV drying',
      'Free Conditioning untuk material kulit/suede',
      'Garansi bersih kembali 48 jam'
    ],
    recommendedFor: ['Sneakers harian', 'Running shoes', 'Kanvas kotor berat', 'High-top sneakers'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bersih 48 Jam',
    badge: 'Paling Populer',
    intensityLevel: 'Deep'
  },
  {
    id: 'srv-fast-clean',
    name: 'Fast Clean Express (One Day 24H)',
    category: 'cleaning',
    price: 45000,
    durationHours: 24,
    description: 'Pembersihan kilat bagian luar sepatu (Upper & Midsole) untuk kamu yang butuh sepatu bersih cepat untuk acara penting besok atau hangout mendadak.',
    benefits: [
      'Pembersihan Upper & Midsole cepat presisi',
      'Dry cleaning teknik minim basah dengan microfiber premium',
      'Pewangi sepatu aroma segar teh hijau & mint',
      'Siap diambil dalam 24 jam kerja'
    ],
    recommendedFor: ['Noda ringan harian', 'Sepatu kasual', 'Persiapan acara mendadak'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Tepat Waktu 24 Jam',
    badge: 'Cepat & Hemat',
    intensityLevel: 'Light'
  },
  {
    id: 'srv-unyellowing',
    name: 'Unyellowing Midsole Boost & Rubber',
    category: 'restoration',
    price: 95000,
    durationHours: 72,
    description: 'Perawatan khusus untuk mengembalikan warna putih alami pada sol karet atau boost yang menguning akibat oksidasi sinar UV menggunakan pasta hidrogen deoksidasi & UV Chamber 12 jam.',
    benefits: [
      'Menghilangkan oksidasi kuning pada sol karet/foam boost',
      'Termasuk Deep Clean upper gratis',
      'Penyinaran UV Chamber merata tanpa merusak kelenturan karet',
      'Hasil cerah seperti baru keluar dari box store'
    ],
    recommendedFor: ['Air Jordan 1', 'Nike Air Force 1', 'Adidas Ultraboost', 'Converse Chuck 70'],
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Anti-Kuning 3 Bulan',
    badge: 'Hasil Menakjubkan',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-icy-sole',
    name: 'Icy Sole De-oxidation Chamber (Jordan/Yeezy)',
    category: 'restoration',
    price: 115000,
    durationHours: 72,
    description: 'Treatment spesialis untuk menjernihkan kembali sol transparan/bening (icy translucent sole) yang telah menguning menjadi biru es jernih original.',
    benefits: [
      'De-oksidasi sol bening transparan',
      'Menghilangkan bintik kuning pada icy sole',
      'Formula non-bleach aman untuk grip karet outsole',
      'Termasuk pembersihan sela bintang tapak'
    ],
    recommendedFor: ['Air Jordan 11', 'Air Jordan 5 & 6', 'Yeezy 350 Translucent', 'Nike SB Dunk Ice'],
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Jernih Icy Blue',
    badge: 'Hypebeast Favorite',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-canvas-whitening',
    name: 'Canvas Whitening & Detergent Bleach Neutralizer',
    category: 'cleaning',
    price: 85000,
    durationHours: 48,
    description: 'Spesialis mengatasi kanvas putih yang kusam atau meninggalkan noda kuning kecokelatan akibat residu deterjen rumah tangga yang mengering di kain.',
    benefits: [
      'Penetralan residu alkali deterjen pada serat kanvas',
      'Aplikasi optical brightener khusus kain',
      'Pencucian mendalam serat benang tanpa merusak lem binding',
      'Warna kanvas kembali putih bersih merata'
    ],
    recommendedFor: ['Converse All Star Putih', 'Vans Authentic White', 'Superga Canvas', 'Compass White'],
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bebas Belang Kuning',
    badge: 'Spesialis Kanvas',
    intensityLevel: 'Medium'
  },
  {
    id: 'srv-repaint',
    name: 'Custom Repaint & Full Color Restoration',
    category: 'restoration',
    price: 150000,
    durationHours: 96,
    description: 'Pengecatan ulang warna yang pudar atau terkelupas menggunakan cat premium impor khusus sepatu (Angelus Acrylic Leather Paint) yang tahan retak dan lentur mengikuti tekukan kaki.',
    benefits: [
      'Pewarnaan ulang presisi sesuai shade orisinal',
      'Finishing matte / gloss seal protector tahan goresan',
      'Tahan air dan tidak pecah saat ditekuk',
      'Termasuk pencucian deep clean awal'
    ],
    recommendedFor: ['Sepatu kulit tergores', 'Upper pudar', 'Midsole luntur', 'Restorasi sneaker langka'],
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Warna Tidak Retak 60 Hari',
    badge: 'Restorasi Pro',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-reglue',
    name: 'Full Sol Reglue & Sole Stitching (Jahit Sol)',
    category: 'repair',
    price: 110000,
    durationHours: 72,
    description: 'Pengeleman ulang sol yang copot/terbuka dengan lem industri polyurethane khusus sepatu dan heat press oven 24 jam, serta opsi jahit sol melingkar agar ekstra kokoh.',
    benefits: [
      'Pembersihan sisa lem lama secara kimiawi menyeluruh',
      'Pengaplikasian primer & lem grade industri suhu tinggi',
      'Press oven kompresi merata 24 jam',
      'Sol kembali kokoh anti-lepas untuk olahraga'
    ],
    recommendedFor: ['Sol menganga', 'Sepatu basket/futsal sol lepas', 'Vintage sneakers', 'Boots'],
    imageUrl: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Rekat Kuat 30 Hari',
    badge: 'Tahan Banting',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-sole-protector',
    name: 'Sole Protector 3M Anti-Abrasion Film Install',
    category: 'protection',
    price: 140000,
    durationHours: 24,
    description: 'Pemasangan lapisan stiker sol pelindung transparan tebal 3M dengan tekstur anti-licin (anti-slip traction pad) untuk menjaga tapak bawah sneaker mahal agar tidak aus.',
    benefits: [
      'Melindungi tapak outsole dari gesekan aspal',
      'Mencegah star loss dan aus pada logo sol',
      'Bahan 3M tebal anti-robek dan mudah dilepas tanpa merusak karet',
      'Termasuk deep clean sol sebelum pemasangan'
    ],
    recommendedFor: ['Jordan 1 Retro High', 'Nike Dunk Low SB', 'Dior B23', 'Travis Scott Sneakers'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Rekat Presisi 30 Hari',
    badge: 'Pelindung Sultan',
    intensityLevel: 'Medium'
  },
  {
    id: 'srv-heel-rebuild',
    name: 'Heel Drag Rebuild & Star Loss Repair',
    category: 'repair',
    price: 120000,
    durationHours: 72,
    description: 'Rekonstruksi tambal sol bagian tumit yang tergerus aus atau ukiran bintang depan outsole yang hilang menggunakan resin komposit karet fleksibel presisi tinggi.',
    benefits: [
      'Menyeimbangkan kembali pijakan sol yang miring',
      'Bahan karet komposit kuat tahan aus',
      'Pewarnaan serasi dengan warna outsole asli',
      'Memperpanjang usia sneaker kesayangan hingga bertahun-tahun'
    ],
    recommendedFor: ['Sneakers dengan tumit terkikis', 'Sepatu skate aus sebelah', 'Sneakers vintage kolektor'],
    imageUrl: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Tambal Kokoh 30 Hari',
    badge: 'Rekonstruksi Sol',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-leather-spa',
    name: 'Luxury Leather Spa & Suede Nap Revival',
    category: 'restoration',
    price: 135000,
    durationHours: 72,
    description: 'Perawatan mewah untuk sepatu kulit asli (full grain, calfskin) atau suede/nubuck. Meliputi conditioning minyak mink oil murni, waxing, dan nap revival lembut.',
    benefits: [
      'Deep conditioning mengembalikan minyak alami kulit agar tidak pecah',
      'Suede brass brush khusus membangkitkan tekstur bulu halus',
      'Wax buffing mengilapkan kulit premium',
      'Perlindungan dari retak akibat cuaca kering'
    ],
    recommendedFor: ['Dr. Martens', 'Timberland Boots', 'Loafers formal', 'Suede Jordan/New Balance'],
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Kelembutan Material',
    badge: 'Perawatan Mewah',
    intensityLevel: 'Deep'
  },
  {
    id: 'srv-mirror-polish',
    name: 'Mirror Gloss Parisian Cobbler Polish (Glaçage)',
    category: 'custom',
    price: 95000,
    durationHours: 36,
    description: 'Teknik semir sepatu formal pantofel tingkat tinggi ala pengrajin Paris menggunakan Saphir Médaille d’Or wax untuk menghasilkan kilap cermin reflektif di toe box.',
    benefits: [
      'Hasil kilap cermin jernih (mirror finish refleksi tinggi)',
      'Aplikasi wax alami carnauba dan beeswax',
      'Sangat elegan untuk acara pernikahan, wisuda, atau gala dinner',
      'Termasuk conditioning kulit awal'
    ],
    recommendedFor: ['Pantofel Formal Oxford', 'Derby Shoes', 'Chelsea Boots', 'Loafers Kulit'],
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Kilap Cermin Tahan Air',
    badge: 'Glaçage Formal',
    intensityLevel: 'Deep'
  },
  {
    id: 'srv-ozone-disinfection',
    name: 'Ozone Gas & UV-C Anti-Fungal Insole Sanitizer',
    category: 'cleaning',
    price: 50000,
    durationHours: 24,
    description: 'Sterilisasi gas ozon konsentrasi tinggi dan sinar UV-C medis untuk membunuh 99.9% jamur tinea pedis, bakteri bau keringat, dan mikroorganisme di dalam rongga sepatu.',
    benefits: [
      'Membasmi 99.9% jamur dan bakteri penyebab bau apek menahun',
      'Menjangkau hingga sela terdalam toe box yang sulit dicapai sikat',
      'Tanpa cairan berlebih sehingga sepatu langsung kering dan higienis',
      'Sangat dianjurkan untuk penderita hiperhidrosis/kaki berkeringat'
    ],
    recommendedFor: ['Sepatu lari bau apek', 'Sepatu futsal/basket', 'Sepatu kerja harian tanpa kaus kaki'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bebas Bau 14 Hari',
    badge: 'Higienis Total',
    intensityLevel: 'Light'
  },
  {
    id: 'srv-nano-protect',
    name: 'Nano Shield Hydrophobic Waterproofing 90D',
    category: 'protection',
    price: 60000,
    durationHours: 24,
    description: 'Pelapisan teknologi partikel nano hidrofobik yang membuat sepatu tahan air (efek daun talas), lumpur, saus, kopi, dan debu tanpa merusak sirkulasi udara kain.',
    benefits: [
      'Efek daun talas tolak air dan cairan berwarna pekat',
      'Tidak mengubah warna orisinal atau tekstur serat bahan',
      'Tetap bernapas (breathable) dan nyaman dipakai',
      'Daya tahan proteksi tahan hingga 90 hari pemakaian harian'
    ],
    recommendedFor: ['Sneakers putih', 'Bahan kanvas & suede', 'Musim hujan & festival outdoor'],
    imageUrl: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    warranty: 'Proteksi Tahan Air 90 Hari',
    badge: 'Anti Noda',
    intensityLevel: 'Light'
  }
];

export const initialCareProducts: CareProductItem[] = [
  {
    id: 'prod-cleaner-250',
    name: 'ShoeLab Natural Foaming Cleaner 250ml',
    category: 'cleaner',
    price: 85000,
    stock: 42,
    description: 'Formula pembersih busa konsentrat dari minyak kelapa dan jojoba alami. Ampuh angkat noda membandel tanpa merusak warna sepatu kesayangan.',
    volumeOrSpec: '250 ml / ~100 pasang',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 320
  },
  {
    id: 'prod-horsehair-brush',
    name: 'Premium German Horsehair Detailing Brush',
    category: 'brush',
    price: 55000,
    stock: 28,
    description: 'Sikat bulu kuda asli Jerman dengan gagang kayu jati kokoh. Sangat lembut dan aman untuk bahan sensitif seperti Suede, Nubuck, dan Primeknit.',
    volumeOrSpec: 'Bulu Kuda Asli 100%',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 215
  },
  {
    id: 'prod-nano-spray',
    name: 'HydroShield Nano Water Repellent Spray',
    category: 'spray',
    price: 95000,
    stock: 35,
    description: 'Spray pelindung waterproof teknologi partikel nano. Menolak air, saus, kopi, dan debu secara instan hingga 3 bulan pemakaian normal.',
    volumeOrSpec: '200 ml Aerosol Can',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 512
  },
  {
    id: 'prod-deodorant-pill',
    name: 'Active Charcoal Sneaker Freshener Pills',
    category: 'accessories',
    price: 45000,
    stock: 50,
    description: 'Kapsul deodoran sepatu berisi karbon aktif dan aroma teh hijau segar. Membunuh 99.9% bakteri penyebab bau tak sedap dan menyerap lembap sol.',
    volumeOrSpec: '1 Pasang (2 Kapsul)',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    salesCount: 189
  },
  {
    id: 'prod-crease-protector',
    name: 'Anti-Crease Sneaker Shields TPR (Pair)',
    category: 'accessories',
    price: 39000,
    stock: 64,
    description: 'Pelindung toe box bagian dalam sneaker agar tidak menekuk dan retak saat dipakai melangkah. Bahan TPR lentur dengan ventilasi udara nyaman.',
    volumeOrSpec: 'Size Universal (Fit 38-45)',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 430
  },
  {
    id: 'prod-microfiber-waffle',
    name: 'Ultra-Absorbent Microfiber Waffle Towel 400GSM',
    category: 'accessories',
    price: 25000,
    stock: 80,
    description: 'Kain lap microfiber serat wafel 400 GSM dengan daya serap busa dan kotoran 5x lebih cepat dari kain biasa tanpa meninggalkan serat rontok.',
    volumeOrSpec: 'Ukuran 40 x 40 cm',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 670
  }
];

export const initialOrders: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: 'SC-2026-9411',
    createdAt: '2026-10-04 10:15',
    serviceId: 'srv-deep-clean',
    serviceName: 'Deep Clean Signature 360°',
    servicePrice: 75000,
    addOns: [
      { id: 'addon-deodorant', name: 'Antibacterial Deep Deodorizer', price: 15000 },
      { id: 'addon-repellent', name: 'Water Repellent Nano Shield', price: 25000 }
    ],
    purchasedProducts: [],
    discountAmount: 0,
    totalPrice: 115000,
    shoe: {
      brand: 'Nike',
      model: 'Air Jordan 1 High Lost & Found',
      color: 'Chicago (Red/White/Black)',
      material: 'Leather',
      conditionNote: 'Noda lumpur di midsole, outsole sedikit kusam, tali sedikit berdebu tebal.',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
      photoAfterUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
    },
    customer: {
      name: 'Rizky Pratama',
      whatsapp: '081234567890',
      email: 'rizky.pratama@example.com',
      address: 'Jl. Wijaya Timur No. 12, Kebayoran Baru, Jakarta Selatan',
      notes: 'Tolong hati-hati dengan tekstur cracked leather di kerah sepatunya.'
    },
    deliveryMethod: 'pickup_delivery',
    pickupAddress: 'Jl. Wijaya Timur No. 12, Kebayoran Baru, Jakarta Selatan',
    scheduledDate: '2026-10-04',
    scheduledTimeSlot: '10:00 - 12:00 WIB',
    status: 'DRYING_DETAILING',
    paymentStatus: 'PAID',
    paymentMethod: 'qris',
    paymentTime: '2026-10-04 10:20',
    technicianName: 'Bima Santoso (Lead Specialist)',
    estimatedCompletion: '2026-10-06 15:00 WIB',
    courierTracking: {
      courierName: 'ShoeLab Express Courier',
      driverName: 'Pak Hendra (0812-9988-1122)',
      trackingCode: 'KURIR-SL-9411',
      status: 'Sepatu telah dijemput dan tiba di Studio'
    },
    timeline: [
      {
        status: 'BOOKING_CONFIRMED',
        title: 'Booking Antrean Berhasil',
        description: 'Jadwal reservasi terkonfirmasi, kuota pengerjaan slot pagi terkunci.',
        timestamp: '2026-10-04 10:15',
        updatedBy: 'Sistem Reservasi Otomatis'
      },
      {
        status: 'SHOES_RECEIVED',
        title: 'Sepatu Tiba & Selesai Diinspeksi',
        description: 'Kurir menjemput sepatu, fisik diperiksa di workshop ShoeLab Studio.',
        timestamp: '2026-10-04 13:45',
        updatedBy: 'Bima Santoso'
      },
      {
        status: 'IN_TREATMENT',
        title: 'Sedang Proses Deep Clean',
        description: 'Proses scrubbing sol, pembersihan upper dengan sikat horsehair bulu lembut.',
        timestamp: '2026-10-05 09:30',
        updatedBy: 'Bima Santoso'
      },
      {
        status: 'DRYING_DETAILING',
        title: 'Pengeringan Suhu Ruang & Detailing',
        description: 'Sepatu masuk ruang pengeringan steril UV bebas panas matahari langsung, aplikasi nano repellent.',
        timestamp: '2026-10-05 16:00',
        updatedBy: 'Bima Santoso'
      }
    ],
    waNotificationHistory: [
      {
        timestamp: '2026-10-04 10:16',
        stage: 'BOOKING_CONFIRMED',
        recipient: '081234567890',
        messageSnippet: 'Reservasi antrean pengerjaan Anda telah DITERIMA & DIKONFIRMASI...'
      },
      {
        timestamp: '2026-10-04 13:50',
        stage: 'SHOES_RECEIVED',
        recipient: '081234567890',
        messageSnippet: 'Sepatu Nike Air Jordan 1 High Lost & Found telah kami terima di Studio...'
      },
      {
        timestamp: '2026-10-05 16:05',
        stage: 'DRYING_DETAILING',
        recipient: '081234567890',
        messageSnippet: 'Pencucian selesai! Sepatu sedang dalam ruang pengeringan bersuhu sejuk...'
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'SC-2026-9412',
    createdAt: '2026-10-05 08:30',
    serviceId: 'srv-unyellowing',
    serviceName: 'Unyellowing Midsole Boost & Rubber',
    servicePrice: 95000,
    addOns: [],
    purchasedProducts: [
      { id: 'prod-nano-spray', name: 'HydroShield Nano Water Repellent Spray', price: 95000, quantity: 1 }
    ],
    totalPrice: 190000,
    shoe: {
      brand: 'Adidas',
      model: 'Ultraboost 1.0 Triple White',
      color: 'Cloud White',
      material: 'Mesh/Knit',
      conditionNote: 'Sol boost sudah menguning kekuningan karena oksidasi umur 2 tahun.',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
      photoAfterUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80'
    },
    customer: {
      name: 'Dimas Wicaksono',
      whatsapp: '087811223344',
      email: 'dimas.w@example.com',
      address: '',
      notes: 'Drop-off langsung ke toko.'
    },
    deliveryMethod: 'drop_off',
    scheduledDate: '2026-10-05',
    scheduledTimeSlot: '13:00 - 16:00 WIB',
    status: 'IN_TREATMENT',
    paymentStatus: 'PAID',
    paymentMethod: 'va_bca',
    paymentTime: '2026-10-05 08:45',
    technicianName: 'Fajar Nugraha (Color & Chemistry Tech)',
    estimatedCompletion: '2026-10-08 17:00 WIB',
    timeline: [
      {
        status: 'BOOKING_CONFIRMED',
        title: 'Booking Antrean Dikonfirmasi',
        description: 'Pelanggan memilih drop-off di studio.',
        timestamp: '2026-10-05 08:30',
        updatedBy: 'Sistem'
      },
      {
        status: 'SHOES_RECEIVED',
        title: 'Sepatu Diserahkan di Kasir Studio',
        description: 'Dilakukan penimbangan dan dokumentasi foto kondisi awal unyellowing.',
        timestamp: '2026-10-05 13:10',
        updatedBy: 'Fajar Nugraha'
      },
      {
        status: 'IN_TREATMENT',
        title: 'Aplikasi Unyellowing Cream & UV Chamber',
        description: 'Sepatu dioleskan formula peroksida deoksidasi sol dan dimasukkan ke UV Chamber.',
        timestamp: '2026-10-05 15:30',
        updatedBy: 'Fajar Nugraha'
      }
    ],
    waNotificationHistory: [
      {
        timestamp: '2026-10-05 08:31',
        stage: 'BOOKING_CONFIRMED',
        recipient: '087811223344',
        messageSnippet: 'Reservasi antrean pengerjaan Anda telah DITERIMA & DIKONFIRMASI...'
      },
      {
        timestamp: '2026-10-05 13:15',
        stage: 'SHOES_RECEIVED',
        recipient: '087811223344',
        messageSnippet: 'Sepatu Adidas Ultraboost 1.0 Triple White telah kami terima di Studio...'
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'SC-2026-9405',
    createdAt: '2026-10-03 14:00',
    serviceId: 'srv-leather-spa',
    serviceName: 'Luxury Leather Spa & Suede Nap Revival',
    servicePrice: 135000,
    addOns: [],
    purchasedProducts: [],
    totalPrice: 135000,
    shoe: {
      brand: 'Dr. Martens',
      model: '1461 Smooth 3-Eye Oxford',
      color: 'Cherry Red / Oxblood',
      material: 'Leather',
      conditionNote: 'Kulit agak kusam, goresan ringan di ujung toe box, butuh conditioning dan mirror gloss shine.',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
      photoAfterUrl: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80'
    },
    customer: {
      name: 'Sabrina Anindya',
      whatsapp: '081399887766',
      email: 'sabrina.anindya@example.com',
      address: 'Apartemen Sudirman Tower A No. 1502, Jakarta Selatan',
      notes: 'Mohon dibantu semir mengilap untuk acara wisuda lusa.'
    },
    deliveryMethod: 'pickup_delivery',
    pickupAddress: 'Apartemen Sudirman Tower A No. 1502, Jakarta Selatan',
    scheduledDate: '2026-10-03',
    scheduledTimeSlot: '16:00 - 19:00 WIB',
    status: 'READY_PICKUP_DELIVERY',
    paymentStatus: 'PAID',
    paymentMethod: 'gopay',
    paymentTime: '2026-10-03 14:10',
    technicianName: 'Agus Wardhana (Leather Craftsman)',
    estimatedCompletion: '2026-10-05 18:00 WIB',
    timeline: [
      {
        status: 'BOOKING_CONFIRMED',
        title: 'Booking Dikonfirmasi',
        description: 'Jadwal penjemputan kurir diagendakan.',
        timestamp: '2026-10-03 14:00',
        updatedBy: 'Sistem'
      },
      {
        status: 'SHOES_RECEIVED',
        title: 'Sepatu Tiba di Workshop',
        description: 'Inspeksi jenis kulit aniline/smooth leather selesai.',
        timestamp: '2026-10-03 17:00',
        updatedBy: 'Agus Wardhana'
      },
      {
        status: 'IN_TREATMENT',
        title: 'Deep Leather Conditioning & Buffing',
        description: 'Pemberian mink oil, waxing, dan penyamakan warna original cherry red.',
        timestamp: '2026-10-04 11:00',
        updatedBy: 'Agus Wardhana'
      },
      {
        status: 'READY_PICKUP_DELIVERY',
        title: 'Selesai & Siap Diantar Kurir',
        description: 'Sepatu telah dipacking dustbag higienis dan siap dikirim sore ini.',
        timestamp: '2026-10-05 14:00',
        updatedBy: 'Agus Wardhana'
      }
    ],
    waNotificationHistory: [
      {
        timestamp: '2026-10-05 14:05',
        stage: 'READY_PICKUP_DELIVERY',
        recipient: '081399887766',
        messageSnippet: 'Kabar gembira! Sepatu Dr. Martens 1461 Smooth sudah 100% bersih, wangi, dan lolos QC...'
      }
    ]
  },
  {
    id: 'ord-104',
    orderNumber: 'SC-2026-9380',
    createdAt: '2026-10-01 09:00',
    serviceId: 'srv-reglue',
    serviceName: 'Full Sol Reglue & Sole Stitching',
    servicePrice: 110000,
    addOns: [{ id: 'addon-deodorant', name: 'Antibacterial Deep Deodorizer', price: 15000 }],
    purchasedProducts: [],
    totalPrice: 125000,
    shoe: {
      brand: 'New Balance',
      model: '990v5 Made in USA Grey',
      color: 'Classic Grey',
      material: 'Suede',
      conditionNote: 'Sol tumit belakang terbuka 5cm dan suede berdebu.',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
      photoAfterUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
    },
    customer: {
      name: 'Kevin Jonathan',
      whatsapp: '081122334455',
      email: 'kevin.j@example.com'
    },
    deliveryMethod: 'drop_off',
    scheduledDate: '2026-10-01',
    scheduledTimeSlot: '09:00 - 12:00 WIB',
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    paymentMethod: 'qris',
    paymentTime: '2026-10-01 09:12',
    technicianName: 'Bima Santoso (Lead Specialist)',
    estimatedCompletion: '2026-10-04 12:00 WIB',
    timeline: [
      {
        status: 'BOOKING_CONFIRMED',
        title: 'Booking Dikonfirmasi',
        description: 'Antrean tercatat.',
        timestamp: '2026-10-01 09:00',
        updatedBy: 'Sistem'
      },
      {
        status: 'COMPLETED',
        title: 'Sepatu Telah Diambil Pelanggan',
        description: 'Pelanggan telah mengambil sepatu di toko dan puas dengan hasil pengeleman.',
        timestamp: '2026-10-04 16:30',
        updatedBy: 'Kasir Studio'
      }
    ],
    waNotificationHistory: [
      {
        timestamp: '2026-10-04 16:35',
        stage: 'COMPLETED',
        recipient: '081122334455',
        messageSnippet: 'Pengerjaan pesanan SC-2026-9380 telah tuntas diserahkan. Kami memberikan Garansi Kepuasan 48 Jam...'
      }
    ]
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    orderNumber: 'SC-2026-9380',
    customerName: 'Kevin Jonathan',
    rating: 5,
    serviceName: 'Full Sol Reglue & Sole Stitching',
    shoeModel: 'New Balance 990v5 Made in USA',
    comment: 'Pengelemannya rapi banget, gak ada belepotan lem di sol luar dan suedenya disikat halus kembali tanpa rontok! Notifikasi WA-nya realtime banget jadi tahu pas sepatu udah masuk oven press.',
    date: '4 Oktober 2026',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    replyFromAdmin: 'Terima kasih banyak Mas Kevin! Garansi lem kami berlaku 30 hari ya, senang bisa membantu NB kesayangannya kembali kokoh.'
  },
  {
    id: 'rev-2',
    orderNumber: 'SC-2026-9240',
    customerName: 'Tiara Amanda',
    rating: 5,
    serviceName: 'Unyellowing Midsole Boost & Rubber',
    shoeModel: 'Air Force 1 Triple White',
    comment: 'Sol AF1 aku yang awalnya udah kuning kecokelatan balik putih cerah lagi kayak beli baru di store! Wanginya juga tahan lama bgt. Recommended parah!',
    date: '2 Oktober 2026',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
    replyFromAdmin: 'Terima kasih Kak Tiara! Simpan sepatunya di tempat sejuk dengan silica gel agar warnanya awet cerah ya kak.'
  },
  {
    id: 'rev-3',
    orderNumber: 'SC-2026-9195',
    customerName: 'Bayu Saputra',
    rating: 5,
    serviceName: 'Deep Clean Signature 360°',
    shoeModel: 'Vans Old Skool Black White',
    comment: 'Cepat, aman, dan kurir jemput tepat waktu di apartemen. Dashboard trackingnya canggih banget bisa lihat update teknisi langsung.',
    date: '28 September 2026',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
  }
];

export const initialQueueSlots: QueueSlot[] = [
  { time: '09:00 - 12:00 WIB', availableCount: 4, maxCount: 8 },
  { time: '13:00 - 16:00 WIB', availableCount: 2, maxCount: 8 },
  { time: '16:00 - 19:00 WIB', availableCount: 5, maxCount: 8 }
];

export const PROMO_VOUCHERS: { code: string; discountPercent?: number; discountFixed?: number; minSpend: number; description: string }[] = [
  { code: 'BERSIHBARU', discountFixed: 20000, minSpend: 75000, description: 'Potongan Rp 20.000 untuk pelanggan baru' },
  { code: 'SNEAKERHEAD', discountPercent: 15, minSpend: 100000, description: 'Diskon 15% untuk layanan restorasi & repaint' },
  { code: 'DUOPASANG', discountFixed: 30000, minSpend: 120000, description: 'Potongan Rp 30.000 untuk booking 2 pasang sepatu' }
];
