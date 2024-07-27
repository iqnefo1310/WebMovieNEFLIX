let url = new URLSearchParams(location.search);
let idMovie = url.get('id');
const embedLink = 'https://www.youtube.com/embed/';
const pictureLink = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const close_link = "/videos?api_key=20294adf51756709c0db49a1d6218100&language=en-US"


// get embed id
const apiUrl = 'https://api.themoviedb.org/3/movie/' + idMovie + close_link;
// Fungsi untuk mengambil data dari API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Mengecek apakah array results ada dan tidak kosong
        if (data.results && data.results.length > 0) {
            // Mengambil elemen terakhir dari results
            const lastResult = data.results[data.results.length - 1];

            // Mengambil nilai key dari elemen terakhir
            const lastKey = lastResult.key;
            showMv(lastKey);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Memanggil fungsi fetchData
fetchData();


function showMv(lastKey) {
    // get detail movie
    fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=20294adf51756709c0db49a1d6218100`)
        .then(res => res.json())
        .then(dat => {
            let figcaption = document.querySelector('.header-detail');
            let frame = document.getElementById('frame-embed');
            let title = document.getElementById('title');

            title.textContent = dat.original_title;

            let titleDescrip = document.createElement('h1');
            titleDescrip.classList.add('title-des');
            titleDescrip.textContent = dat.original_title;

            let tagLine = document.createElement('p');
            tagLine.classList.add('tag-line');
            tagLine.textContent = dat.tagline;

            let descr = document.createElement('p');
            descr.classList.add('descr-movie');
            descr.textContent = dat.overview;

            let date = document.createElement('p');
            date.classList.add('date-release');
            date.textContent = `Release Date : ${dat.release_date}`;

            frame.src = `https://www.youtube.com/embed/${lastKey}?autoplay=1`;
            frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            frame.allowFullscreen = true;

            figcaption.appendChild(titleDescrip);
            figcaption.appendChild(tagLine);
            figcaption.appendChild(descr);
            figcaption.appendChild(date);
        })
        .catch(err => console.error('Error fetching movie details:', err));
}
// menampilkan pemain
fetch(`https://api.themoviedb.org/3/movie/${idMovie}/credits?language=en-US&api_key=20294adf51756709c0db49a1d6218100`)
    .then(cast => cast.json())
    .then(cast => {
        let castContainer = document.getElementById('cast');
        cast.cast.forEach(data => {
            let figureCast = document.createElement('figure');
            let imgCast = document.createElement('img');
            imgCast.alt = 'no picture cast';
            let figcCast = document.createElement('figcaption');
            let nameCast = document.createElement('p');
            let carCast = document.createElement('p');
            let as = document.createElement('p');
            as.textContent = 'As';
            imgCast.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.profile_path}`;
            nameCast.textContent = data.original_name;
            carCast.textContent = data.character;

            figcCast.appendChild(nameCast);
            figcCast.appendChild(as);
            figcCast.appendChild(carCast);
            figureCast.appendChild(imgCast);
            figureCast.appendChild(figcCast);
            castContainer.appendChild(figureCast);
        });
    });

// bagian rekomendasi dan similar dari movie
function more(link, tipe) {
    let container = document.getElementById(tipe);
    fetch(link)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {

                // Create elements

                let figure = document.createElement('figure');
                let img = document.createElement('img');
                let figcaption = document.createElement('figcaption');
                let movieLink = document.createElement('a');

                // Set attributes and content

                movieLink.href = `../HTML/detail.html?id=${movie.id}`;
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
                figcaption.textContent = movie.title;

                // Append elements to their respective parents
                
                movieLink.appendChild(img);
                figure.appendChild(movieLink);
                figure.appendChild(figcaption);
                container.appendChild(figure);
            });

        })
}

more(`https://api.themoviedb.org/3/movie/${idMovie}/recommendations?api_key=20294adf51756709c0db49a1d6218100&language=en-US&page=1`, `rekomen`);
more(`https://api.themoviedb.org/3/movie/${idMovie}/similar?api_key=20294adf51756709c0db49a1d6218100&language=en-US&page=1`, `similar`);