let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll kebawah
        navbar.style.top = '-100px'; // manipulasi navigasi
    } else {
        // Scroll keatas
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Menyimpan nilai input ke localStorage saat formulir disubmit
document.getElementById('form-search').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah pengiriman formulir secara default

    // Ambil nilai dari input
    const query = document.getElementById('search-inp').value.trim();

    if (query) {
        // Simpan nilai input ke localStorage
        localStorage.setItem('searchQuery', query);

        // Update URL dengan parameter query
        const newUrl = `../HTML/search.html?q=${encodeURIComponent(query)}`;

        // Arahkan ke URL baru
        window.location.href = newUrl;
        document.getElementById('search-inp').value = '';
    }
});
