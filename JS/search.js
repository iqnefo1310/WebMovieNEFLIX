let page = 1;
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q') || '';
const apiKey = '20294adf51756709c0db49a1d6218100';
const baseUrl = 'https://api.themoviedb.org/3/search/movie';

function fetchMovies() {
    const linkSearch = `${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    //mengambil api
    fetch(linkSearch)
    //merubah jadi json
        .then(response => response.json())
        .then(data => {
            tampil(data.results);
            updateMoreButton(data.page, data.total_pages);//melempar jumlah page dari data
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

function tampil(movies) {

    // mengambil container

    let container = document.getElementById('search-results');

    movies.forEach(movie => {
        
        // membuar element

        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let figcaption = document.createElement('figcaption');
        let movieLink = document.createElement('a');
        let title = document.createElement('h1');
        let movDesc = document.createElement('p');

        // mengatur atribut dan value

        movieLink.href = `../HTML/detail.html?id=${movie.id}`;
        img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg';
        img.alt = movie.title;
        movDesc.textContent = movie.overview;
        title.textContent = movie.title;

        //menambahkan ke parent

        movieLink.appendChild(img);
        figure.appendChild(movieLink);
        figcaption.appendChild(title);
        figcaption.appendChild(movDesc);
        figure.appendChild(figcaption);
        container.appendChild(figure);
    });
}

function updateMoreButton(currentPage, totalPages) {
    const moreBtn = document.getElementById('more-btn');
    if (currentPage >= totalPages) {
        moreBtn.disabled = true;
        moreBtn.textContent = 'No more results';
    } else {
        moreBtn.disabled = false;
        moreBtn.textContent = 'More';
    }
}

document.getElementById('form-search').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

//mengatur untuk menambahkan halaman

    page = 1;
    fetchMovies();
});

document.getElementById('more-btn').addEventListener('click', function() {
    page++;
    fetchMovies();
});
//memanggil function
fetchMovies();