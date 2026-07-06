const form = document.getElementById('reviewForm');
const pesan = document.getElementById('pesan');
const hasilReview = document.getElementById('hasilReview');
const tombolHapus = document.getElementById('hapusData');

const storageKey = 'gameCornerReview';

function ambilDataForm() {
  return {
    nama: document.getElementById('nama').value.trim(),
    game: document.getElementById('game').value.trim(),
    genre: document.getElementById('genre').value,
    rating: document.getElementById('rating').value
  };
}

function tampilkanPesan(teks, tipe) {
  pesan.textContent = teks;
  pesan.className = 'pesan ' + tipe;
}

function tampilkanReview(data) {
  if (!data) {
    hasilReview.className = 'hasil-review kosong';
    hasilReview.innerHTML = `
      <h3>Data Review Tersimpan</h3>
      <p>Belum ada data review yang disimpan.</p>
    `;
    return;
  }

  hasilReview.className = 'hasil-review';
  hasilReview.innerHTML = `
    <h3>Data Review Tersimpan</h3>
    <ul>
      <li><strong>Nama:</strong> ${data.nama}</li>
      <li><strong>Game Favorit:</strong> ${data.game}</li>
      <li><strong>Genre:</strong> ${data.genre}</li>
      <li><strong>Rating:</strong> ${data.rating}/10</li>
    </ul>
  `;
}

function isiFormDariStorage() {
  const dataTersimpan = localStorage.getItem(storageKey);

  if (!dataTersimpan) {
    tampilkanReview(null);
    return;
  }

  const data = JSON.parse(dataTersimpan);

  document.getElementById('nama').value = data.nama || '';
  document.getElementById('game').value = data.game || '';
  document.getElementById('genre').value = data.genre || '';
  document.getElementById('rating').value = data.rating || '';

  tampilkanReview(data);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    tampilkanPesan(
      'Data belum valid. Cek lagi bagian yang masih kosong atau salah.',
      'error'
    );
    return;
  }

  const data = ambilDataForm();

  localStorage.setItem(storageKey, JSON.stringify(data));
  tampilkanReview(data);
  tampilkanPesan('Review berhasil disimpan ke localStorage.', 'sukses');
});

tombolHapus.addEventListener('click', function () {
  localStorage.removeItem(storageKey);
  form.reset();
  tampilkanReview(null);
  tampilkanPesan('Data review sudah dihapus.', 'sukses');
});

isiFormDariStorage();