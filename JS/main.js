const apiKey = '20294adf51756709c0db49a1d6218100';
const linkApiPopular = 'https://api.themoviedb.org/3/movie/popular';
const linkTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}}language=en-US&page=1`
let currentGenre = 28; // Genre default adalah Action

// Fungsi untuk mengambil data film berdasarkan genre
const fetchMoviesByGenre = (genreId, maxMovies = 20) => {
    currentGenre = genreId; // Update genre saat ini
    const allMovies = []; // Untuk menyimpan semua film yang diambil
    let pagePop = 1; // Mulai dari halaman 1
    const maxPagePops = 50; // Batas maksimal halaman yang dicari


    // Fungsi untuk mengambil data dari satu halaman tertentu
    const fetchPage = (pagePop) => {
        const linkPopular = `${linkApiPopular}?api_key=${apiKey}&language=en-US&page=${pagePop}`;

        return fetch(linkPopular)
            .then((res) => res.json())
            .then((data) => {
                const filteredMovies = data.results.filter(movie => movie.genre_ids.includes(genreId));
                allMovies.push(...filteredMovies); // Tambahkan film yang diambil ke dalam array
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const loadMovies = async () => {
        while (allMovies.length < maxMovies && pagePop <= maxPagePops) {
            await fetchPage(pagePop);
            pagePop++;
        }
        // Potong array allMovies untuk memastikan hanya ada 20 film
        displayMovies(allMovies.slice(0, maxMovies));
    };

    loadMovies();
};

// Fungsi untuk menampilkan film
const displayMovies = (movies) => {
    const container = document.querySelector('.contain');

    // Bersihkan elemen sebelumnya
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Menambahkan film ke dalam container
    movies.forEach(movie => {
        let figure = document.createElement('figure');
        let figcaption = document.createElement('figcaption');
        let urlImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        let h1 = document.createElement('h1');
        let a = document.createElement('a');

        figure.classList.add('movie-figure');
        figure.style.backgroundImage = `url(${urlImage})`;
        a.href = `../HTML/detail.html?id=${movie.id}`;
        h1.textContent = movie.title;

        a.appendChild(h1);
        figcaption.appendChild(a);
        figure.appendChild(figcaption);
        container.appendChild(figure);
    });
    container.scrollTo({
        left: 0,
        behavior: 'smooth' // Memberikan efek scroll yang halus
    });
};

// Event listener untuk menangani klik pada link genre
document.querySelectorAll('#gendre a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const genreId = parseInt(link.getAttribute('data-genre'));
        fetchMoviesByGenre(genreId);
    });
});

// Memuat film untuk genre default (Action) saat halaman pertama kali dimuat
fetchMoviesByGenre(currentGenre);

//\\\\\\\\\\\\\\\\///////////////////\\\\\\\\\\\\\///////////////\\\\\\\\\\\////////////\\\\\\\\\\///////////\\\\\\\\\\\//////////
//UNTUK BAGIAN top rated

fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`)
    .then(response => response.json())
    .then(response => {
        showHome(response);
    })

function showHome(response) {
    let col_1 = document.querySelector('.contain-top');
    response.results.forEach(movie => {
        let figure = document.createElement('figure');
        let title = document.createElement('p');
        let img_url = movie.poster_path;
        let link = document.createElement('a');

        link.href = `../HTML/detail.html?id=${movie.id}`;
        title.classList.add('title');
        title.textContent = `\n${movie.title}`;
        figure.style.backgroundImage = `url( 'https://image.tmdb.org/t/p/w500${img_url}')`;
        figure.style.backgroundSize = 'cover';
        figure.appendChild(link);
        col_1.appendChild(figure);
        link.appendChild(title);
    });
}


////////////////////////\\\\\\\\\\/////////////////////////
//BAGIAN UP COMING HANYA 5 FILM TERATAS PADA PAGE 1

const linkUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

fetch(linkUpComing)
    .then(response => response.json())
    .then(data => {
        let dataMv = data.results.slice(0, 5); // Ambil 5 film pertama
        let slider = document.getElementById('slider');

        dataMv.forEach(movie => {
            let backUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
            let upFigure = document.createElement('figure');
            upFigure.classList.add('slide');
            upFigure.style.backgroundImage = `url(${backUrl})`;

            let upFigcap = document.createElement('figcaption');
            let upTitle = document.createElement('h1');
            let p = document.createElement('p');
            let date = document.createElement('p');
            let coming = document.createElement('h2');
            coming.classList.add('coming-title');
            coming.textContent = 'Coming Soon';
            date.classList.add('date-release');
            date.textContent = 'release ' + movie.release_date;
            p.textContent = movie.overview;
            upTitle.textContent = movie.title;
            upFigcap.appendChild(upTitle);
            upFigcap.appendChild(p);
            upFigcap.appendChild(date);
            upFigure.appendChild(upFigcap);
            upFigcap.appendChild(coming)

            slider.appendChild(upFigure);
        });

        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dataMv.length;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000); // Ubah slide setiap 5 detik
    })