import { ServiceItem, CareProductItem, OrderItem, ReviewItem, QueueSlot } from '../types';

export const initialServices: ServiceItem[] = [
  // === FOKUS 1: PERBAIKAN LENGKAP & REPARASI SOL (COMPLETE REPAIR) ===
  {
    id: 'srv-reglue',
    name: 'Full Sol Reglue & Jahit Sol (Lem PU Heat-Press)',
    category: 'repair',
    focusType: 'repair',
    price: 110000,
    durationHours: 72,
    description: 'Pengeleman ulang sol copot / menganga total menggunakan adhesive polyurethane industri khusus sepatu dengan pembersihan residu lem lama dan kompresi oven heat-press 24 jam. Termasuk opsi jahit sol melingkar agar ekstra kuat anti-lepas.',
    benefits: [
      'Pembersihan residu lem lama secara kimiawi tanpa merusak karet',
      'Aplikasi adhesive polyurethane grade industri tahan air & panas',
      'Penekanan kompresi oven heat-press suhu terkontrol 24 jam',
      'Garansi rekat kuat anti-menganga 30 hari pemakaian aktif'
    ],
    recommendedFor: ['Sepatu futsal / basket sol copot', 'Sneakers harian menganga', 'Sepatu lari / outdoor lepas sol'],
    imageUrl: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Rekat Kuat 30 Hari',
    badge: 'Spesialis Sol Copot',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-heel-rebuild',
    name: 'Heel Drag Rebuild & Tambal Tumit Aus (Resin Komposit)',
    category: 'repair',
    focusType: 'repair',
    price: 120000,
    durationHours: 72,
    description: 'Rekonstruksi tambal tapak sol bagian tumit yang tergerus habis (heel drag) atau motif bintang depan aus menggunakan resin komposit karet fleksibel tahan abrasi tinggi, menyelaraskan kembali sudut pijakan kaki.',
    benefits: [
      'Menyeimbangkan kembali postur kemiringan tumit saat melangkah',
      'Bahan resin karet komposit anti-aus tahan gesekan aspal',
      'Pewarnaan serasi dengan warna outsole orisinal',
      'Memperpanjang umur pemakaian sneaker kesayangan hingga bertahun-tahun'
    ],
    recommendedFor: ['Sneakers dengan tumit terkikis miring', 'Sepatu skate aus sebelah', 'Sneakers vintage kolektor'],
    imageUrl: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Tambal Kokoh 30 Hari',
    badge: 'Rekonstruksi Tumit',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-sole-swap',
    name: 'Full Sole Swap & Midsole Replacement (Hydrolysis Fix)',
    category: 'repair',
    focusType: 'repair',
    price: 220000,
    durationHours: 96,
    description: 'Penggantian total unit sol bawah (outsole & midsole) yang hancur karena hidrolisis atau retak termakan usia dengan unit sol donor baru. Meliputi alignment presisi, heat-press bonding, dan finishing rapi.',
    benefits: [
      'Menghidupkan kembali sneaker vintage yang sol aslinya sudah remuk / rapuh',
      'Penyatuan sol baru dengan upper asli secara presisi tanpa bekas lem meluber',
      'Struktur sol kembali kenyal, elastis, dan aman untuk dipakai melangkah',
      'Termasuk deep cleaning upper sebelum pemasangan sol donor'
    ],
    recommendedFor: ['Air Max vintage sol hidrolisis', 'Jordan Retro sol retak rapuh', 'Sneakers koleksi 5+ tahun'],
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Pasang Sol 60 Hari',
    badge: 'Sol Hidrolisis Sembuh',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-stitching',
    name: 'Jahit Sol Melingkar 360° & Reparasi Jahitan Upper Sobek',
    category: 'repair',
    focusType: 'repair',
    price: 65000,
    durationHours: 48,
    description: 'Jahit tangan pengrajin sol ahli (360° lock-stitch) mengitari outsole menggunakan benang nilon berlilin anti-air tebal, serta penambalan jahitan upper kanvas/kulit yang terlepas atau sobek di sela jari.',
    benefits: [
      'Jahitan tembus sol mengunci outsole kuat permanen',
      'Benang nilon berlilin tahan gesekan dan tidak menyerap air',
      'Penambalan lapisan dalam upper tanpa merusak estetika luar',
      'Sol dijamin tidak akan pernah menganga lagi'
    ],
    recommendedFor: ['Sepatu bola & futsal', 'Sepatu skate', 'Boots kerja berat', 'Sneakers kanvas'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Jahitan Kuat 30 Hari',
    badge: 'Jahit Tangan Kokoh',
    intensityLevel: 'Medium'
  },
  {
    id: 'srv-lining-repair',
    name: 'Rekonstruksi Heel Lining & Tambal Busa Kerah Tumit',
    category: 'repair',
    focusType: 'repair',
    price: 85000,
    durationHours: 48,
    description: 'Perbaikan kain kerah tumit bagian dalam (inner heel lining) yang bolong, robek, atau busanya kempes akibat gesekan kaki. Diganti dengan bahan kain mesh/kulit microfiber baru dan busa empuk ortopedik.',
    benefits: [
      'Menghilangkan gesekan keras yang membuat tumit lecet',
      'Busa kerah tumit kembali tebal dan mengunci kaki dengan nyaman',
      'Pilihan bahan lining: Breathable Mesh atau Microfiber Suede lembut',
      'Tampilan dalam sepatu kembali rapi seperti baru'
    ],
    recommendedFor: ['Sepatu lari tumit dalam sobek', 'Sneakers harian kerah bolong', 'Sepatu basket'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bahan Awet 30 Hari',
    badge: 'Bebas Lecet Tumit',
    intensityLevel: 'Medium'
  },
  {
    id: 'srv-repaint',
    name: 'Repaint Upper & Retouch Kulit Retak / Pecah',
    category: 'repair',
    focusType: 'repair',
    price: 150000,
    durationHours: 96,
    description: 'Pengecatan ulang dan perbaikan retakan kulit menggunakan filler compound dempul khusus sepatu dan cat akrilik fleksibel Angelus. Tidak kaku, elastis mengikuti lekukan langkah kaki, dan anti-pecah.',
    benefits: [
      'Menambal retakan crease pada toe box dengan leather filler fleksibel',
      'Pewarnaan ulang presisi matching shade orisinal pabrik',
      'Lapisan top-coat matte / gloss pelindung anti-gores dan anti-air',
      'Termasuk deep clean menyeluruh sebelum pengecatan'
    ],
    recommendedFor: ['Kulit sepatu tergores / baret dalam', 'Upper pudar & kusam', 'Toe box retak pecah-pecah'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Cat Anti-Pecah 60 Hari',
    badge: 'Restorasi Kulit Pro',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-sole-protector',
    name: 'Pemasangan Sole Protector 3M Anti-Abrasion & Anti-Slip',
    category: 'repair',
    focusType: 'repair',
    price: 140000,
    durationHours: 24,
    description: 'Instalasi film stiker pelindung sol transparan ultra-tebal merk 3M dengan tekstur anti-licin (traction pad) yang dipanaskan presisi mengikuti lekuk tapak bawah sneaker mahal agar tidak aus.',
    benefits: [
      'Menyelamatkan tapak outsole dari gesekan aspal kasar',
      'Mencegah aus pada logo ikonik dan detail bintang sol',
      'Bahan tebal anti-robek dan mudah diganti tanpa merusak karet',
      'Termasuk deep cleaning tapak sol sebelum pemasangan'
    ],
    recommendedFor: ['Jordan 1 High', 'Nike Dunk Low SB', 'Dior B23', 'Travis Scott Sneakers', 'Sneakers Koleksi'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Rekat Presisi 30 Hari',
    badge: 'Pelindung Tapak Sol',
    intensityLevel: 'Medium'
  },

  // === FOKUS 2: PEMBERSIHAN MENDALAM & SPA DETAILING (COMPLETE CLEANING) ===
  {
    id: 'srv-deep-clean',
    name: 'Deep Clean Signature 360° (Luar, Dalam & Tali)',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 75000,
    durationHours: 48,
    description: 'Pembersihan mendalam 360 derajat menyeluruh pada seluruh komponen sepatu: Upper, Midsole, Outsole, Insole, hingga Laces menggunakan formula pembersih enzim biodegradable alami.',
    benefits: [
      'Pembersihan 360 derajat menyeluruh luar dan dalam',
      'Pengeringan steril UV-C Chamber bersuhu dingin (bebas jamur)',
      'Aplikasi deodorizer antibakteri aroma segar teh hijau & mint',
      'Garansi bersih kembali 48 jam'
    ],
    recommendedFor: ['Sneakers kotor berat harian', 'Sepatu lari becek', 'Kanvas kotor lumpur', 'Sneakers kasual'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bersih 48 Jam',
    badge: 'Paling Diminati',
    intensityLevel: 'Deep'
  },
  {
    id: 'srv-fast-clean',
    name: 'Fast Clean Express (One Day 24 Jam Jadi)',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 45000,
    durationHours: 24,
    description: 'Dry cleaning cepat presisi untuk bagian luar (Upper & Midsole) bagi kamu yang butuh sepatu bersih kilat untuk acara penting besok, meeting kerja, atau hangout mendadak.',
    benefits: [
      'Pembersihan noda luar cepat dengan sikat microfiber lembut',
      'Teknik minim basah aman serat kain',
      'Aplikasi semprotan wangi segar tahan lama',
      'Siap diambil dalam 24 jam kerja'
    ],
    recommendedFor: ['Noda ringan harian', 'Persiapan acara mendadak', 'Perawatan rutin berkala'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Tepat Waktu 24 Jam',
    badge: 'Kilat 24 Jam',
    intensityLevel: 'Light'
  },
  {
    id: 'srv-unyellowing',
    name: 'Unyellowing & Deoksidasi Sol Karet / Boost',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 95000,
    durationHours: 72,
    description: 'Pembersihan dan penghilangan noda kuning membandel pada sol karet dan foam boost yang teroksidasi usia menggunakan formula hidrogen peroksida deoksidasi & penyinaran UV Chamber 12 jam.',
    benefits: [
      'Menghilangkan noda kuning oksidasi pada karet sol / foam boost',
      'Termasuk pencucian deep clean upper gratis',
      'Penyinaran UV Chamber merata tanpa membuat karet sol getas',
      'Warna sol kembali putih cerah alami'
    ],
    recommendedFor: ['Air Jordan 1', 'Air Force 1 White', 'Adidas Ultraboost', 'Converse Chuck 70'],
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Putih Cerah 3 Bulan',
    badge: 'Sol Kuning Bersih',
    intensityLevel: 'Master Restorer'
  },
  {
    id: 'srv-canvas-whitening',
    name: 'Canvas Whitening & Netralisir Residu Noda Deterjen',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 85000,
    durationHours: 48,
    description: 'Pembersihan serat benang kanvas putih dari noda kusam kecokelatan akibat residu deterjen rumah tangga yang mengering. Menggunakan optical brightener khusus kain kanvas.',
    benefits: [
      'Penetralan residu alkali deterjen pada serat kanvas',
      'Pembersihan mendalam tanpa melunturkan lem binding sol',
      'Warna kain kanvas kembali putih bersih bebas belang',
      'Aplikasi pelindung serat kanvas'
    ],
    recommendedFor: ['Converse All Star Putih', 'Vans Authentic White', 'Superga Canvas', 'Sepatu Sekolah Putih'],
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bebas Belang Kuning',
    badge: 'Spesialis Kanvas Putih',
    intensityLevel: 'Medium'
  },
  {
    id: 'srv-leather-spa',
    name: 'Luxury Leather Spa & Suede Nap Revival Conditioning',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 135000,
    durationHours: 72,
    description: 'Pembersihan dan spa mewah khusus bahan kulit asli (full grain, calfskin) atau suede/nubuck. Meliputi pembersihan busa pH netral, deep conditioning minyak mink oil murni, dan penyisiran bulu suede halus.',
    benefits: [
      'Pembersihan aman tanpa membuat kulit kaku atau belang',
      'Deep conditioning minyak mink oil mengembalikan kelembapan alami kulit',
      'Sikat kawat kuningan khusus membangkitkan bulu halus suede yang mati',
      'Menjaga kulit dari retak dan pecah akibat cuaca panas kering'
    ],
    recommendedFor: ['Dr. Martens', 'Timberland Boots', 'Loafers formal', 'Suede Jordan / New Balance'],
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Kelembutan Kulit 30 Hari',
    badge: 'Spa Kulit Mewah',
    intensityLevel: 'Deep'
  },
  {
    id: 'srv-ozone-disinfection',
    name: 'Sterilisasi Gas Ozon & UV-C Anti-Jamur / Bakteri Insole',
    category: 'cleaning',
    focusType: 'cleaning',
    price: 50000,
    durationHours: 24,
    description: 'Sanitasi higienis rongga dalam sepatu menggunakan ozon medis dan sinar ultraviolet UV-C untuk membasmi 99.9% jamur tinea pedis dan bakteri penyebab bau apek menyengat tanpa cairan berlebih.',
    benefits: [
      'Membunuh 99.9% bakteri dan spora jamur penyebab bau apek menahun',
      'Menjangkau rongga toe box terdalam yang tidak bisa dicapai sikat',
      'Sepatu steril, higienis, dan langsung kering siap pakai',
      'Sangat dianjurkan untuk kaki yang sering berkeringat'
    ],
    recommendedFor: ['Sepatu lari bau apek', 'Sepatu futsal / basket lembap', 'Sepatu kerja harian'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    warranty: 'Garansi Bebas Bau 14 Hari',
    badge: 'Higienis Bebas Jamur',
    intensityLevel: 'Light'
  }
];

export const initialCareProducts: CareProductItem[] = [
  // === FOKUS 1: PRODUK PERBAIKAN LENGKAP & REPARASI (REPAIR PRODUCTS) ===
  {
    id: 'prod-repair-glue',
    name: 'ShoeLab Polyurethane Flexible Shoe Glue 60ml',
    category: 'repair',
    focusType: 'repair',
    price: 65000,
    stock: 45,
    description: 'Formula lem sol sepatu polyurethane industri. Merekatkan karet sol, midsole, dan upper yang menganga dengan daya rekat fleksibel tahan tekukan, tahan air, dan tahan panas.',
    volumeOrSpec: '60 ml Tube / ~10 Pasang',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 420
  },
  {
    id: 'prod-sole-protector-kit',
    name: 'Sole Protector 3M Film Guard Kit + Traction Pad (Pair)',
    category: 'repair',
    focusType: 'repair',
    price: 95000,
    stock: 38,
    description: 'Stiker pelindung tapak bawah sol sneaker tebal 3M transparan dengan bantalan anti-licin (anti-slip traction pad). Mencegah tapak sol bawah aus tergerus aspal.',
    volumeOrSpec: '1 Pasang Film + 4 Pad Anti-Slip',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 310
  },
  {
    id: 'prod-leather-filler',
    name: 'Leather Crack Repair Filler & Scratch Compound 50g',
    category: 'repair',
    focusType: 'repair',
    price: 55000,
    stock: 30,
    description: 'Dempul kompon perbaikan kulit sepatu yang retak (crease cracks) atau tergores dalam. Mengisi pori kulit secara elastis sebelum dicat ulang agar permukaan mulus kembali.',
    volumeOrSpec: '50 gram Jar',
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 195
  },
  {
    id: 'prod-crease-protector',
    name: 'Anti-Crease Sneaker Shields TPR Flexible (Pair)',
    category: 'repair',
    focusType: 'repair',
    price: 39000,
    stock: 64,
    description: 'Pelindung struktur toe box bagian dalam sneaker agar tidak menekuk, patah, atau retak saat dipakai melangkah. Bahan TPR lentur dengan ventilasi udara nyaman.',
    volumeOrSpec: 'Size Universal (Fit 38-45)',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 430
  },
  {
    id: 'prod-stitching-kit',
    name: 'ShoeLab Heavy Duty Sol Stitching Awl & Waxed Cord Kit',
    category: 'repair',
    focusType: 'repair',
    price: 49000,
    stock: 25,
    description: 'Alat jarum jahit sol bengkok gagang tembaga dan benang nilon berlilin tebal 0.8mm anti-air 50 meter. Solusi mandiri untuk memperkuat jahitan sol dan upper sepatu.',
    volumeOrSpec: 'Jarum Lengkung + Benang 50m',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 160
  },

  // === FOKUS 2: PRODUK PEMBERSIHAN & PERAWATAN SEPATU (CLEANING PRODUCTS) ===
  {
    id: 'prod-complete-cleaning-kit',
    name: 'ShoeLab Complete 5-in-1 Cleaning Starter Kit',
    category: 'cleaner',
    focusType: 'cleaning',
    price: 165000,
    stock: 40,
    description: 'Paket lengkap pembersih sneaker profesional: Foaming Cleaner 250ml + Sikat Bulu Kuda Jerman + Sikat Hard Outsole + Lap Microfiber Waffle 400GSM + Tas Pouch Canvas.',
    volumeOrSpec: 'Kit 5 Produk Lengkap',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    salesCount: 780
  },
  {
    id: 'prod-cleaner-250',
    name: 'ShoeLab Natural Foaming Cleaner 250ml',
    category: 'cleaner',
    focusType: 'cleaning',
    price: 85000,
    stock: 52,
    description: 'Formula pembersih busa konsentrat dari minyak kelapa dan jojoba alami. Ampuh mengangkat noda lumpur dan minyak tanpa perlu bilas air berlebih.',
    volumeOrSpec: '250 ml Pump / ~100 pasang',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 520
  },
  {
    id: 'prod-unyellowing-kit',
    name: 'ShoeLab Unyellowing Oxidant Cream & Solar Film Kit 100ml',
    category: 'cleaner',
    focusType: 'cleaning',
    price: 75000,
    stock: 35,
    description: 'Krim deoksidasi penghilang warna kuning pada sol karet, boost, dan icy sole akibat oksidasi matahari. Dilengkapi kuas aplikator dan plastik film UV pelindung.',
    volumeOrSpec: '100 ml Jar + Kuas + Film Wrap',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 380
  },
  {
    id: 'prod-horsehair-brush',
    name: 'Premium German Horsehair Detailing Brush',
    category: 'brush',
    focusType: 'cleaning',
    price: 55000,
    stock: 34,
    description: 'Sikat bulu kuda asli Jerman dengan gagang kayu jati kokoh. Lembut dan aman untuk bahan sensitif seperti Suede, Nubuck, Leather, dan Knit.',
    volumeOrSpec: 'Bulu Kuda Alami 100%',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    salesCount: 285
  },
  {
    id: 'prod-hard-brush',
    name: 'Hard Bristle Sole & Midsole Heavy Cleaning Brush',
    category: 'brush',
    focusType: 'cleaning',
    price: 35000,
    stock: 40,
    description: 'Sikat dengan bulu kaku kokoh khusus untuk menyikat tapak outsole dan sela midsole yang kotor tanah liat atau aspal tanpa membuat tangan pegal.',
    volumeOrSpec: 'Nylon Hard Bristle + Wood Grip',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    salesCount: 340
  },
  {
    id: 'prod-microfiber-waffle',
    name: 'Ultra-Absorbent Microfiber Waffle Towel 400GSM',
    category: 'cleaner',
    focusType: 'cleaning',
    price: 25000,
    stock: 80,
    description: 'Kain lap microfiber serat wafel 400 GSM dengan daya serap busa dan kotoran 5x lebih cepat dari kain biasa tanpa meninggalkan serat rontok.',
    volumeOrSpec: 'Ukuran 40 x 40 cm',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 670
  },
  {
    id: 'prod-deodorant-pill',
    name: 'Active Charcoal Sneaker Freshener Pills (Pair)',
    category: 'cleaner',
    focusType: 'cleaning',
    price: 45000,
    stock: 50,
    description: 'Kapsul deodoran sepatu berisi karbon aktif dan aroma teh hijau segar. Membunuh 99.9% bakteri penyebab bau tak sedap dan menyerap lembap sol.',
    volumeOrSpec: '1 Pasang (2 Kapsul Putar)',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    salesCount: 290
  },
  {
    id: 'prod-nano-spray',
    name: 'HydroShield Nano Water Repellent Spray 200ml',
    category: 'spray',
    focusType: 'cleaning',
    price: 95000,
    stock: 45,
    description: 'Spray pelapis waterproof teknologi partikel nano. Menolak air, saus, kopi, dan debu secara instan dengan efek daun talas hingga 3 bulan pemakaian normal.',
    volumeOrSpec: '200 ml Aerosol Can',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    salesCount: 580
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
