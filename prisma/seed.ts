import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding the database with deeply detailed courses and chapters...')

  await prisma.course.deleteMany()

  const pythonCourse = await prisma.course.create({
    data: {
      title: 'Python Dasar hingga Lanjutan',
      slug: 'python-dasar',
      description: 'Pelajari pemrograman Python secara mendalam. Modul ini dirancang dengan standar industri perangkat lunak modern untuk melatih logika berpikir komputasional Anda.',
      language: 'python',
      chapters: {
        create: [
          {
            title: '1. Hello World & Pengenalan Eksekusi Kode',
            order: 1,
            content: `
<h1>Pengenalan Eksekusi Python (Terminal Output)</h1>
<p>Selamat datang di Python, salah satu bahasa pemrograman paling populer di dunia, yang digunakan oleh raksasa teknologi seperti Google, Netflix, dan NASA. Keunggulan utama Python adalah sintaksnya yang sangat ringkas, bersih, dan mendekati bahasa manusia.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Mekanisme Output Standar</h3>
<p>Dalam rekayasa perangkat lunak, langkah pertama untuk berinteraksi dengan sistem adalah memberikan perintah untuk memunculkan pesan. Di Python, fungsi bawaan (<em>built-in function</em>) yang bertugas untuk hal ini adalah <code>print()</code>.</p>
<p>Karakteristik penting dari <code>print()</code>:</p>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li>Dapat mencetak tipe data apapun (teks, angka, hingga struktur data kompleks).</li>
  <li>Otomatis menambahkan karakter baris baru (<em>newline</em>) di akhir output secara bawaan.</li>
  <li>Untuk mencetak teks (string), Anda wajib mengapit kalimat dengan tanda kutip ganda <code>"..."</code> atau kutip tunggal <code>'...'</code>.</li>
</ul>

<h3 class="text-xl font-bold mt-8 mb-4">Contoh Kasus Penggunaan:</h3>
<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
# Mencetak teks standar
print("Sistem Navigasi Online")

# Mencetak angka secara langsung
print(404)
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Buktikan bahwa koneksi ke mesin Python berfungsi. Tuliskan kode perintah untuk mencetak pesan persis dengan format <strong>Hello, Python!</strong> (perhatikan huruf kapital dan tanda bacanya).</p>
</div>
            `,
          },
          {
            title: '2. Variabel & Sistem Tipe Data Dinamis',
            order: 2,
            content: `
<h1>Variabel dan Tipe Data Terstruktur</h1>
<p>Sebuah program komputer sejatinya adalah serangkaian instruksi untuk memanipulasi data. Untuk dapat memanipulasi data, program harus menyimpannya ke dalam memori komputer. Di sinilah <strong>Variabel</strong> berperan.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Konsep Dynamic Typing</h3>
<p>Berbeda dengan bahasa seperti C++ atau Java, Python mengadopsi <em>Dynamic Typing</em>. Artinya, Anda tidak perlu mendeklarasikan secara eksplisit apakah variabel tersebut adalah angka atau huruf. Python akan menebaknya dari nilai yang Anda berikan (<em>assignment</em>).</p>

<h3 class="text-xl font-bold mt-8 mb-4">4 Tipe Data Primitif Utama:</h3>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li><strong>String (str):</strong> Untaian teks atau karakter. Contoh: <code>"Alpha"</code></li>
  <li><strong>Integer (int):</strong> Bilangan bulat murni tanpa pecahan. Contoh: <code>100</code></li>
  <li><strong>Float (float):</strong> Bilangan pecahan/desimal. Penulisannya menggunakan titik (bukan koma). Contoh: <code>3.14</code></li>
  <li><strong>Boolean (bool):</strong> Tipe data logika yang hanya memiliki dua kemungkinan: <code>True</code> atau <code>False</code> (Wajib kapital di awal).</li>
</ul>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
# Inisialisasi Variabel
callsign = "Maverick"
ammo_count = 500
shield_integrity = 99.5
is_engine_on = True

# Memanggil/membaca variabel
print(callsign)
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Deklarasikan sebuah variabel bernilai integer dengan nama tepat <code>angka</code> yang memiliki nilai sebesar <strong>100</strong>. Setelah variabel diinisialisasi, cetak variabel tersebut ke layar.</p>
</div>
            `,
          },
          {
            title: '3. Logika Percabangan (Control Flow)',
            order: 3,
            content: `
<h1>Pengambilan Keputusan Kondisional (If/Elif/Else)</h1>
<p>Program yang statis tidaklah pintar. Sistem kecerdasan buatan dan aplikasi logika mutlak membutuhkan kemampuan untuk membuat keputusan berdasarkan berbagai kondisi yang dinamis. Di Python, kita menggunakan <em>Control Flow</em>.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Sintaks Indentasi Python</h3>
<p>Python memiliki aturan ketat mengenai <strong>Indentasi (spasi/tab)</strong>. Blok kode yang dieksekusi oleh <code>if</code> harus menjorok ke dalam (biasanya 4 spasi). Jika Anda lupa memberikan indentasi, program akan mengalami <em>IndentationError</em>.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Anatomi Keputusan:</h3>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li><code>if</code> : Mengevaluasi kondisi pertama. Jika <code>True</code>, blok dijalankan.</li>
  <li><code>elif</code> (Else-If) : Menangkap kondisi sekunder jika <code>if</code> sebelumnya bernilai <code>False</code>. Bisa jumlahnya tak terbatas.</li>
  <li><code>else</code> : Jalur keluar darurat. Dieksekusi jika semua kondisi di atasnya gagal (<code>False</code>).</li>
</ul>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
suhu_mesin = 120

if suhu_mesin > 100:
    print("Overheat! Mendinginkan sistem...")
elif suhu_mesin == 100:
    print("Suhu maksimal aman.")
else:
    print("Sistem beroperasi optimal.")
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Tulislah sebuah algoritma kondisional dasar. Bebas mendeklarasikan kondisi logika apapun, namun pastikan bahwa hasil akhir yang di <code>print</code> pada terminal mencetak string: <strong>Dewasa</strong>.</p>
</div>
            `,
          },
          {
            title: '4. Algoritma Perulangan (Loops)',
            order: 4,
            content: `
<h1>Otomatisasi Eksekusi Berulang (Loops)</h1>
<p>Tugas utama komputer adalah menangani repetisi kalkulasi tanpa henti. Daripada menulis perintah <code>print</code> seribu kali, kita dapat menggunakan konstruksi perulangan (<em>Loops</em>).</p>

<h3 class="text-xl font-bold mt-8 mb-4">Dua Varian Loop di Python</h3>
<ol class="list-decimal pl-6 space-y-4 mt-4 text-muted-foreground">
  <li>
    <strong>For Loop (Definite Iteration):</strong><br/>
    Digunakan saat kita sudah tahu secara pasti berapa kali perulangan harus berjalan. Biasanya diduetkan dengan fungsi <code>range()</code> atau untuk membongkar isi dari tipe data majemuk.
    <pre class="bg-black/50 p-2 mt-2 rounded border border-border/50 text-green-300">for i in range(3):
    print("Pesan ke-", i)</pre>
  </li>
  <li>
    <strong>While Loop (Indefinite Iteration):</strong><br/>
    Digunakan saat perulangan bergantung pada status kondisi yang dinamis. Loop akan berjalan terus tanpa henti (<em>infinite loop</em>) selama kondisi bernilai <code>True</code>.
    <pre class="bg-black/50 p-2 mt-2 rounded border border-border/50 text-green-300">energi = 5
while energi > 0:
    print("Sisa energi:", energi)
    energi -= 1</pre>
  </li>
</ol>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Gunakan <code>for loop</code> dan <code>range()</code> untuk mencetak kata <strong>Ulang</strong> secara berurutan persis sebanyak tiga (3) baris berturut-turut.</p>
</div>
            `,
          },
          {
            title: '5. Modularisasi Kode: Fungsi (Functions)',
            order: 5,
            content: `
<h1>Membangun Modul Kode Reusable</h1>
<p>Saat program Anda bertambah besar dan kompleks, Anda akan menemukan pola kode yang sama digunakan berkali-kali. Membiarkan kode repetitif adalah pelanggaran prinsip pemrograman <em>DRY (Don't Repeat Yourself)</em>.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Definisi Fungsi</h3>
<p>Di Python, blok kode independen dibungkus ke dalam objek Fungsi menggunakan kata kunci <code>def</code>. Fungsi bagaikan "mesin pabrik": kita bisa menyuplai bahan mentah (<em>Parameter/Argument</em>), mesin akan memprosesnya, dan bisa mengembalikan produk jadi menggunakan <code>return</code>, atau langsung melakukan sebuah aksi.</p>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
# 1. Mendifinisikan / Membuat fungsi
def kalkulasi_jarak(kecepatan, waktu):
    hasil = kecepatan * waktu
    return hasil

# 2. Mengeksekusi (Calling) Fungsi
jarak_tempuh = kalkulasi_jarak(300, 2)
print(jarak_tempuh) # Output: 600
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Definisikan fungsi kustom bernama <code>cek_status()</code>. Di dalam fungsi tersebut, cetak kalimat <strong>Sistem Aman</strong>. Terakhir, pastikan Anda juga <strong>memanggil eksekusi</strong> fungsi tersebut pada baris terbawah agar teksnya tampil di layar.</p>
</div>
            `,
          },
          {
            title: '6. Struktur Data Kompleks: List',
            order: 6,
            content: `
<h1>Koleksi Data Sekuensial (Array/List)</h1>
<p>Sejauh ini, satu variabel hanya mampu memuat satu data. Bagaimana jika sistem navigasi Anda perlu memuat nama 100 planet? Membuat variabel <code>planet1</code> hingga <code>planet100</code> adalah ide yang buruk. Solusinya adalah struktur data koleksi terurut, yaitu <strong>List</strong>.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Anatomi List Python</h3>
<p>List ditandai dengan sepasang kurung siku <code>[ ... ]</code> dengan nilai-nilai berjejer yang dipisahkan oleh tanda koma.</p>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li><strong>Indeks (Index):</strong> Urutan elemen selalu dikalkulasi mulai dari angka 0, bukan 1.</li>
  <li><strong>Mutabilitas:</strong> Berbeda dengan Tupple, nilai-nilai di dalam List dapat ditambah, dihapus, dan diubah sesuka hati di tengah jalan.</li>
</ul>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
inventaris_senjata = ["Plasma Gun", "Misil Tracking", "EMP Blast"]

# Akses Elemen
print(inventaris_senjata[1]) # Mencetak "Misil Tracking"

# Modifikasi List
inventaris_senjata.append("Shield Generator") # Ditambahkan ke bagian ujung belakang
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Buat sebuah list ke dalam variabel bernama <code>inventaris</code>. Isi list tersebut dengan setidaknya 3 string, namun posisikan string "Pedang" di indeks pertama. Selanjutnya, print spesifik indeks dari list tersebut agar terminal menghasilkan output tunggal berbunyi: <strong>Pedang</strong>.</p>
</div>
            `,
          },
          {
            title: '7. Objek Key-Value: Dictionary',
            order: 7,
            content: `
<h1>Pemetaan Data Relasional (Map/Dictionary)</h1>
<p>List sangat bagus untuk antrean data, tetapi buruk jika kita membutuhkan data terstruktur seperti sebuah "Identitas Entitas". <strong>Dictionary</strong> (diidentifikasi dengan lambang kurung kurawal <code>{ ... }</code>) memecahkan masalah ini dengan konsep pemetaan Pasangan Kunci dan Nilai (<em>Key-Value Pairs</em>).</p>

<h3 class="text-xl font-bold mt-8 mb-4">Konsep Hashmap</h3>
<p>Dictionary setara dengan JSON Object dalam JavaScript atau Hash Map pada Java. Kunci (<em>Key</em>) harus unik, seringkali berupa String, sedangkan Nilainya (<em>Value</em>) bebas menampung tipe data apapun termasuk Dictionary bersarang (Nested Dictionary).</p>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
data_pesawat = {
    "kode_seri": "RX-78-2",
    "pilot": "Amuro Ray",
    "faksi": "Earth Federation",
    "energi": 9500
}

# Cara memanggil nilai berdasar Key
print("Nama Pilot:", data_pesawat["pilot"])

# Cara mengubah (Update) data
data_pesawat["energi"] = 10000
</pre>

<div class="mecha-panel p-6 mt-10 bg-primary/5 border-l-4 border-primary">
  <h4 class="font-extrabold tracking-widest text-primary mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Buatlah struktur dictionary dalam variabel bernama <code>pesawat</code> yang memiliki kunci <code>"model"</code> dengan nilai string bebas (yang penting mewakili identitas robot tempur). Lalu, gunakan perintah <code>print()</code> untuk memanggil kunci tersebut sehingga output akhirnya berupa teks <strong>Gundam</strong>.</p>
</div>
            `,
          }
        ]
      }
    }
  })

  // JAVASCRIPT SEEDING...
  // Untuk durasi komputasi yang efisien, JavaScript juga diupdate dengan penjelasan yang terperinci.
  const jsCourse = await prisma.course.create({
    data: {
      title: 'JavaScript Masterclass (ES6+)',
      slug: 'javascript-modern',
      description: 'Kuasai fondasi inti dari Web Modern. Modul kurikulum komprehensif ini membimbing Anda dari nol hingga arsitektur asynchronous tingkat lanjut.',
      language: 'javascript',
      chapters: {
        create: [
          {
            title: '1. Output via Console',
            order: 1,
            content: `
<h1>Menampilkan Data ke Terminal Browser (Console)</h1>
<p>Sejak Node.js merevolusi JavaScript sehingga bisa berjalan di luar peramban (browser), <code>console.log()</code> menjadi salah satu API pemrograman paling vital. Ini adalah jendela developer untuk melihat "denyut nadi" dari aplikasi yang sedang dibuat.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Format Eksekusi</h3>
<p>Di balik layar, perintah ini memanggil metodologi *log* dari *runtime Object* bawaan bernama ` + "`console`" + `. Anda bisa memasukkan argumen lebih dari satu dipisahkan dengan koma.</p>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Tulis sebaris perintah JavaScript klasik menggunakan <code>console.log()</code> untuk mencetak string akurat: <strong>JS Ready</strong>.</p>
</div>
            `,
          },
          {
            title: '2. Deklarasi Variabel Modern (ES6)',
            order: 2,
            content: `
<h1>Sistem Variabel Era Baru (Let dan Const)</h1>
<p>Di masa lampau (ES5), pengembang JS terjebak dengan <code>var</code> yang memiliki perilaku (*Scope Hoisting*) yang membingungkan dan sering menyebabkan bug kritis di skala enterprise.</p>

<h3 class="text-xl font-bold mt-8 mb-4">ES6 Merevolusi Deklarasi Memori:</h3>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li><code>let</code> : Digunakan untuk variabel terikat-blok (<em>Block-scoped</em>) yang nilainya dapat dimutasi (diperbarui) sewaktu-waktu.</li>
  <li><code>const</code> : Mewakili Konstanta (<em>Constant</em>). Sekali nilainya diikat pada memori, variabel ini tidak dapat ditimpa ulang! Sangat ideal untuk menjaga keamanan data inti aplikasi.</li>
</ul>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Buat variabel konstanta bernama <code>maxSpeed</code> yang bernilai konstan sebesar <strong>300</strong> dan cetak identitas variabelnya ke console log.</p>
</div>
            `,
          },
          {
            title: '3. Kalkulasi Logika Dasar',
            order: 3,
            content: `
<h1>Operator dan Aritmatika JavaScript</h1>
<p>Selain mampu merespons klik dari pengguna, JavaScript dipersenjatai dengan fungsionalitas aritmatika (*Math*) sekuat bahasa level menengah (C++). Anda bahkan dapat mengeksekusi operasi matematika secara langsung di dalam argumen sebuah fungsi.</p>

<h3 class="text-xl font-bold mt-8 mb-4">Operator Penting:</h3>
<ul class="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
  <li>Aritmatika Dasar: <code>+</code> (Tambah), <code>-</code> (Kurang), <code>*</code> (Kali), <code>/</code> (Bagi).</li>
  <li>Sisa Bagi (Modulo): <code>%</code> (Contoh: 10 % 3 = 1).</li>
  <li>Eksponensial: <code>**</code> (Contoh: 2 ** 3 = 8).</li>
</ul>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Sistem terminal mengekspektasikan angka ajaib alam semesta. Secara instan kalikan dua operand numerik di dalam struktur <code>console.log()</code> sehingga output finalnya mengeluarkan hasil pasti: <strong>42</strong>.</p>
</div>
            `,
          },
          {
            title: '4. Pengkondisian If/Else',
            order: 4,
            content: `
<h1>Mengendalikan Percabangan (Control Flow)</h1>
<p>Menciptakan program yang merespons secara berbeda di setiap situasi dinamis. Javascript mengevaluasi blok kondisional menggunakan penggabungan ekspresi boolean Strict Equality (<code>===</code>).</p>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
if (kunci_benar) {
  // Buka brankas
} else {
  // Bunyikan Alarm
}
</pre>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Gunakan logika IF sederhana (boleh bernilai langsung boolean true) dan sisipkan perintah log yang memunculkan string persis: <strong>Akses Diberikan</strong>.</p>
</div>
            `,
          },
          {
            title: '5. Arsitektur Arrow Functions',
            order: 5,
            content: `
<h1>Sintaks Ekspresi Fungsi Super Ringkas</h1>
<p>Sejak kemunculan ES6 di 2015, paradigma penulisan fungsi berubah drastis dengan adanya <em>Arrow Function Expression</em>. Selain ringkas, Arrow Function juga menyelesaikan isu <code>this</code> <em>binding context</em> yang rumit pada aplikasi berbasis Kelas.</p>

<pre class="bg-black/80 border border-border p-4 rounded-lg my-4 text-sm font-mono text-green-400">
// Pola Lama
function tembak() { console.log("Dor"); }

// Pola ES6 (Arrow Function)
const tembak = () => console.log("Dor");
</pre>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Simulasikan penembakan meriam. Bangun sebuah fungsi arrow berekspresi dengan nama variabel <code>fire</code> yang memuat <code>console.log("Dor!")</code>, kemudian langsung panggil (eksekusi) fungsi tersebut.</p>
</div>
            `,
          },
          {
            title: '6. Manipulasi Array Lanjutan',
            order: 6,
            content: `
<h1>Manipulasi Dimensi Data Linier (Array)</h1>
<p>Array dalam JS sejatinya adalah Object terselubung, dan ia memiliki serangkaian utilitas prototipe canggih (seperti <code>map</code>, <code>filter</code>, <code>reduce</code>).</p>

<h3 class="text-xl font-bold mt-8 mb-4">Metode Mutasi Array:</h3>
<p>Menambah ukuran barisan data secara otomatis menggunakan perintah <code>push()</code> di garis terbelakang sebuah memori Array.</p>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Buat array kosong. Lakukan proses manipulasi <em>Push</em> untuk menyelundupkan satu bilangan bulat bernilai <strong>99</strong> ke dalamnya, lalu cetak nilai 99 tersebut menggunakan penunjukan indeks ke layar.</p>
</div>
            `,
          },
          {
            title: '7. JSON & Konsep Data JavaScript Object',
            order: 7,
            content: `
<h1>Jantung dari JavaScript: Object</h1>
<p>Saking fundamentalnya struktur ini, format <code>JSON (JavaScript Object Notation)</code> bahkan digunakan oleh hampir semua bahasa server (seperti Golang, PHP, Python) saat ini untuk melakukan komunikasi API Lintas Peramban via Internet (REST API).</p>

<p>Kunci dan nilai disatukan dalam sebuah kurung kurawal. Ingat, *Object keys* di JavaScript bersifat sebagai pemetaan String murni.</p>

<div class="mecha-panel p-6 mt-10 bg-accent/5 border-l-4 border-accent">
  <h4 class="font-extrabold tracking-widest text-accent mb-2 uppercase text-sm">/// Target Mission</h4>
  <p class="text-sm font-medium">Ciptakan objek <em>literal</em> dengan konfigurasi properti bernama <code>status</code> yang dideklarasikan dengan tipe data string. Panggil status tersebut ke konsol untuk memastikan tulisan <strong>Online</strong> muncul dengan benar.</p>
</div>
            `,
          }
        ]
      }
    }
  })

  console.log({ pythonCourse, jsCourse })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
