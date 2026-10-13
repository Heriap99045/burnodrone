export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "setup-rtk-gnss-emlid-reach-m2-ardupilot",
    title: "Panduan Integrasi & Setup RTK GNSS Emlid Reach M2 pada ArduPilot",
    excerpt:
      "Langkah demi langkah mengonfigurasi baud rate serial MAVLink, NTRIP correction, dan GPS injection via Mission Planner untuk pemetaan udara presisi tinggi.",
    category: "Aerial Mapping & RTK",
    date: "10 Oktober 2026",
    readTime: "6 min baca",
    image:
      "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800",
    content: [
      "Akurasi tingkat sentimeter (cm-level accuracy) menjadi standar wajib pada drone pemetaan industri, baik untuk survey tambang, konstruksi, maupun pemetaan lahan pertanian.",
      "Emlid Reach M2 adalah salah satu receiver RTK/PPK GNSS multi-band paling populer yang sangat ringan dan ideal dipasangkan dengan flight controller berbasis ArduPilot seperti CUAV V5+, CUAV X7 Pro, atau Pixhawk 6C.",
      "Langkah 1: Pengaturan Wiring Hardware. Hubungkan port Serial1/Serial2 dari Emlid Reach M2 ke port TELEM2 atau GPS2 pada flight controller menggunakan kabel JST-GH.",
      "Langkah 2: Konfigurasi Parameter ArduPilot. Setel parameter GPS_TYPE = 2 (MAVLink) atau 5 (NMEA), dan atur SERIAL2_BAUD = 38 (38400 baud) atau 115 (115200 baud) sesuai baudrate output Emlid.",
      "Langkah 3: Inject NTRIP Base Station. Pada Mission Planner, buka tab Initial Setup > Optional Hardware > RTK/GPS Inject. Hubungkan ke caster NTRIP lokal untuk mentransmisikan koreksi Differential GPS secara real-time melalui jaringan koneksi seluler/companion computer.",
    ],
  },
  {
    id: "2",
    slug: "pemilihan-esc-motor-frame-heavy-lift-agricultural-drone",
    title:
      "Kalkulasi & Pemilihan ESC, Motor, serta Propeller untuk Drone Agricultural Sprayer",
    excerpt:
      "Cara menghitung Thrust-to-Weight ratio, efisiensi g/W motor, dan pemilihan baterai 12S LiPo/LiFePO4 untuk drone penyemprot cairan kapasitas besar.",
    category: "Hardware & Propulsion",
    date: "08 Oktober 2026",
    readTime: "8 min baca",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
    content: [
      "Merancang drone pertanian (Agricultural Sprayer) membutuhkan perhitungan thrust yang matang karena drone membawa beban muatan cair (payload) yang dinamis dan berbobot berat.",
      "Aturan Utama Thrust-to-Weight Ratio: Untuk kestabilan penerbangan saat angin kencang, usahakan total maksimum thrust dari gabungan seluruh motor minimal berbanding 2:1 terhadap Maximum Takeoff Weight (MTOW).",
      "Integrasi Motor Power System: Penggunaan power system terintegrasi (seperti Hobbywing X8 atau X9) sangat direkomendasikan karena sudah menggabungkan Motor, ESC 80A/100A, FOC driver, dan Propeller folding dalam satu paket tahan air (IPX7).",
      "Pertimbangan Baterai: Baterai standar industri penyemprotan umumnya menggunakan konfigurasi 12S LiPo (44.4V) atau 14S dengan kapasitas besar (misal 16000mAh - 28000mAh) guna menjaga efisiensi arus ampere tetap rendah sehingga komponen ESC tidak overheating.",
    ],
  },
  {
    id: "3",
    slug: "konfigurasi-servo-can-bus-mks-hv6160-dronecan-gui",
    title:
      "Tutorial Konfigurasi Servo CAN Bus MKS HV6160 Menggunakan DroneCAN GUI Tool",
    excerpt:
      "Panduan mengubah Node ID, kalibrasi batas travel actuator, dan debugging telemetry CAN bus pada VTOL & Heavy Multirotor.",
    category: "Avionics & Actuators",
    date: "05 Oktober 2026",
    readTime: "5 min baca",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    content: [
      "Protokol CAN bus (DroneCAN / UAVCAN) perlahan menggantikan sinyal PWM tradisional pada servo control surface drone VTOL dan pesawat nirawak kelas profesional karena sifatnya yang lebih tahan terhadap interferensi elektromagnetik.",
      "Langkah 1: Persiapan Adapter. Hubungkan servo CAN bus (seperti MKS HV6160) ke adapter Makerbase CANable V2.0 Pro yang terhubung ke PC via USB.",
      'Langkah 2: Buka DroneCAN GUI Tool. Jalankan aplikasi, pilih COM port adapter CANable, lalu klik "Start SLCAN".',
      "Langkah 3: Mengubah Node ID & Parameter Actuator. Buka Node Monitor, klik dua kali pada Node ID servo, lalu ubah parameter node_id agar tidak bentrok dengan actuator CAN lainnya di dalam bus network.",
    ],
  },
];
