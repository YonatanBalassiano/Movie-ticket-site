$(document).ready(function(){
    //load carusel photos

    
    
    //load movies
    $.get("/movies",(movies)=>{
        outputCards(movies , $(".moviesContainer"));

        for(let i = 0; i<5; i++){
            let active = i==0 ? "active" : "";
            $.get(`/api/TMDB/${movies[i].TMDB_id}`,(movieInfo)=>{
                console.log(movieInfo)
                $("#movieContainer").append(addToCarusel(movieInfo,active));
            })
        }
    })


})

function addToCarusel (movie,active){
    let html = `<div class="carousel-item ${active}"><a href="/"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="First slide"/></a>
    <div class="carousel-caption d-none d-md-block">
      <h5>${movie.original_title}</h5>
      <p>${movie.tagline}</p>
    </div>
  </div>`
    $(".carousel-inner").append(html)
}

function outputCards (movies , container){
    movies.forEach(movie => {
        html = movieCardHtml(movie)
        container.append(html)
    });
}

function movieCardHtml(movie){
    let about = movie.about.substring(0, 100) + "..."
    return `<div class="movieCard" style="cursor: pointer;" data-toggle="modal" data-target="#movieModal" id="${movie._id}">
    <div class="card"><img src="${movie.cover}"/>
      <div class="info">
        <h1>${movie.name}</h1>
        <p>${about}</p>
      </div>
    </div><span>${movie.name}</span>
    <p> shown at : ${movie.time} | ${160 - movie.seats.length*2} seats left </p>
  </div>`
}

$("#movieModal").on("show.bs.modal",(event)=>{
    let div =$(event.relatedTarget);
    let divID = getCardId(div);
    let movieName = "";

    $.get(`/movies/id/${divID}`,(movie)=>{
        movieName = movie.name;
        $.get(`/api/TMDB/${movie.TMDB_id}/videos`,(movieVid)=>{
            addTrailetToMOdal(movieVid.results[0].key)
        })

        $.get(`/api/TMDB/${movie.TMDB_id}`,(movieInfo)=>{
            $("#movieContainer").append(movieInfoHTML(movieInfo));
        })

        $.get(`/api/TMDB/${movie.TMDB_id}/credits`,(cast)=>{
            $("#movieCastContainer").append(addCastHTML(cast.cast))
        })

    })

    $(document).on("click","#orderTicketButton", (event)=>{
        movieName = movieName.replaceAll(' ', '-');
        movieName = movieName.replaceAll(':', '');
       location.href = `/movies/${movieName}`
    })

})

function getCardId (element){
    let isRoot = element.hasClass("movieCard");
    let rootElement = isRoot ? element : element.closest(".movieCard").attr('_id');    
    return rootElement[0].id;
}

function movieInfoHTML(movie){
    return `<div class="movieInfoContainer">
    <div class="movieInfoTitleContainer"> <h3>${movie.original_title}</h3></div>
    <div class="movieInfoBodyCOntainer">${addGenresHTML(movie.genres)}
    <div class="ratingContainer">Rating: ${movie.vote_average}</div>
    </div>
    <div class="tecnicalContainer">${movie.release_date.substring(0,4)} | Duration: ${movie.runtime} minutes</div>
    <hr><div class="movieAboutContainer"><span>About</span><p>${movie.overview}</p></div><hr>
    <div id="movieCastContainer"></div>
    <hr>
    </div>
    `
}

function addGenresHTML(genres){
    let html = `<div class = "genresContainer">`
    genres.forEach(genre=>{
        html = html + `<div class="genreContainer">${genre.name}</div>`
    })
    html+="</div>"
    return html
}

function addCastHTML(cast){
    let html = `<div class="movieCastContainer">`
    for(let i = 0; i<5;i++){
        html+= `<div class ="actorContainer">
        <span class="actorCharacterName">${cast[i].character.substring(0,15)}</span>
        <img src="https://image.tmdb.org/t/p/original${cast[i].profile_path}"/>
        <span class="actorOriginalName">${cast[i].original_name.substring(0,15)}</span>
        </div>`
    }
    html+="</div>"
        
    return html
}

function movieModalHTML(key){
    return `<div><iframe width="100%" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    `
}

function addTrailetToMOdal(key){
    $("#movieContainer").html("");
    let html = movieModalHTML(key);
    $("#movieContainer").append(html);
}