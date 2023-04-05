$(document).ready(function () {
    let homeLink = $('#homeLink');
    let footer = $('#footer');
    let searchForm = $('#searchForm');
    let showList = $('#showList');
    let show = $('#show');
    let search_term = $('#search_term');
    let error = $('#error');

    let requestMethod = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows',
    };
    $.ajax(requestMethod).then((res) => {
        let li;
        for (let obj of res) {
            footer.css('position', 'sticky');
            li = `<li><a class="eachshow" href="${obj._links.self.href}">${obj.name}</a></li>`;
            showList.append(li);
        }
        showList.show();
    });

    $(document).on('submit', '#searchForm', function (event) {
        event.preventDefault();
        showList.empty();
        showList.empty();
        show.hide();
        homeLink.show();
        error.empty();
        error.hide();
        show.empty();

        let searchTerm = search_term.val();
        searchTerm = searchTerm.trim();
        if (!searchTerm) {
            let p = `<p class="error">Invalid Search Term.</p>`;
            footer.css('position', 'fixed');
            error.append(p);
            error.show();
        }
        let requestMethod = {
            method: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm,
        };
        $.ajax(requestMethod).then((res) => {
            if (searchTerm && res.length === 0) {
                let p = `<p class="error">No results found.</p>`;
                footer.css('position', 'fixed');
                error.append(p);
                error.show();
            }
            let li;
            for (let obj of res) {
                li = `<li><a class="eachshow" href="${obj.show._links.self.href}">${obj.show.name}</a></li>`;
                footer.css('position', 'fixed');
                showList.append(li);
            }
            showList.show();
        });
    });
    $(document).on('click', 'ul#showList > li > a', function (event) {
        event.preventDefault();
        showList.hide();
        showList.empty();
        show.empty();
        homeLink.show();

        let hreflink = $(this).attr('href');
        let requestMethod = {
            method: 'GET',
            url: hreflink,
        };
        $.ajax(requestMethod).then((res) => {
            footer.css('position', 'sticky');
            if (res.name) {
                let h1 = `<h1>${res.name}</h1>`;
                show.append(h1);
            } else {
                let h1 = `<h1>N/A</h1>`;
                show.append(h1);
            }

            if (res.image) {
                let img = `<img src="${res.image.medium}">`;
                show.append(img);
            } else {
                let img = `<img src="../public/img/no_image.jpeg">`;
                show.append(img);
            }
            let language = res.language
                ? `<dt>Language</dt><dd>${res.language}</dd>`
                : `<dt>Language</dt><dd>N/A</dd>`;
            let genres = `<dt>Genres</dt><dd><ul>`;
            if (res.genres && res.genres.length > 0) {
                $.each(res.genres, function (index, value) {
                    genres += `<li>${value}</li>`;
                });
                genres += `</ul></dd>`;
            } else {
                genres = `<dt>Genres</dt><dd>N/A</dd>`;
            }
            let average = '';
            if (!res.rating.average) {
                average = `<dt>Average Rating</dt><dd>N/A</dd>`;
            } else {
                average = `<dt>Average Rating</dt><dd>${res.rating.average}</dd>`;
            }
            console.log(average);
            let network = res.network
                ? `<dt>Network</dt><dd>${res.network.name}</dd>`
                : `<dt>Network</dt><dd>N/A</dd>`;
            let summary = res.summary
                ? `<dt>Summary</dt><dd>${res.summary}</dd>`
                : `<dt>Summary</dt><dd>N/A</dd>`;
            let dl = `<dl>${language} ${genres} ${average} ${network} ${summary}</dl>`;
            show.append($(dl));
            show.show();
        });
    });
});

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// var slideIndex = 0;
// showSlides();

// async function fetchShows(tag) {
//     const resp = await fetch('https://api.tvmaze.com/shows');
//     const data = await resp.json();
//     // tag = data[getRandomInt(6)].image.medium;
//     // console.log(tag.toString());
//     return data;
// }



// function showSlides() {
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
//     let myImg = document.querySelector('img');
//     console.log(myImg.src);
//     fetchShows(myImg.src)
//     // let imgArray = Array.from(myImg);
//     // imgArray.forEach(element => {
//     //     element.src = imgUrl;
//     // });
//     // console.log(myImg);
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) { slideIndex = 1 }
//     for (let i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
//     setTimeout(showSlides, 3000); // Change image every 3 seconds
// }
