var seats = [];

$(document).ready(function(){
    $.get(`/api/TMDB/${movieId}`,(movieInfo)=>{
        addInfo(movieInfo)
        addGenres(movieInfo.genres)
    })

    for(let i = 0; i<10; i++){
        $(".seatsContainer").append(`<div class="row ${i}"></div>`)
        for(let j = 1; j<=16; j++){
            $(`.row.${i}`).append(`<div class="seat" id="${i*16+j}"></div>`)
        }
    }
    
    seatsSold.forEach((seat)=>{
        document.getElementById('seat').classList.add("sold");
    })

})

function addInfo(movieInfo){
    let html = `<div class = titleContainer><h1>${movieInfo.original_title}</h1></div>
    <div class="genresContainer"></div>
    <div class="tecnicalContainer">${movieInfo.release_date.substring(0,4)} | Duration: ${movieInfo.runtime} minutes</div>
    <div class = aboutContainer><p>${movieInfo.overview}</p></div>
    `
    $(".infoContainer").html(html)
}

function addGenres(genres){
    let html = ``
    genres.forEach(genre=>{
        html = html + `<div class="genreContainer">${genre.name}</div>`
    })

    $(".genresContainer").html(html)
}

$(".seatsContainer").click((seat) => {
    if (
        seat.target.classList.contains("seat") &&
      !seat.target.classList.contains("sold")
    ) {
        seat.target.classList.toggle("selected");

        let isChosen = seat.target.classList.contains("selected")
        if (isChosen){
            seats.push(seat.target.id)
        }else{
            seats.splice(seats.indexOf(seat.target.id),1)
        }

        let html = seats.length==0 ? "Please choose seats" : `You choose ${seats.length} seat`
        if (seats.length >1){html+="s"}
        $(".numOfSeatsChosen").html(html)

    }


  });

  $(document).on("click","#placeOrderButton", (event)=>{
    $(".seatSelectContainer").addClass("hidden")
    $(".placeOrderContainer").removeClass("hidden")

    
})