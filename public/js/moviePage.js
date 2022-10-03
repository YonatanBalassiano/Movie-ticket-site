var seats = new Array();

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
    seatsNumbers.forEach((seat)=>{
        document.getElementById(seat).classList.add("sold");
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
    if(seats.length==0){
        $(".errorMessage").html("please select seats")
    }
    else{
        $(".errorMessage").html("")
        $(".seatSelectContainer").addClass("hidden")
        $(".placeOrderContainer").removeClass("hidden")
        updateBillingForm()
    }
})

$(document).on("click",".seatSelectButton", (event)=>{
    $(".seatSelectContainer").removeClass("hidden")
    $(".placeOrderContainer").addClass("hidden")

    updateBillingForm()
})

function updateBillingForm(){
    document.getElementById("numOfSeats").innerText=`${seats.length}`
    $(".cartList").html("")
    seats.forEach((seat)=>{
        let html = cartListItemHtml(seat)
        $(".cartList").append(html)
    })

    html = cartListSum()
    $(".cartList").append(html)

   
}

function cartListItemHtml(seat){
    let row = seat/16 == Math.floor(seat/16) ? seat/16 : Math.floor(seat/16) + 1;
    let seatNum = seat%16 == 0 ? 16 : seat%16;
    return `<li class="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0">Movie ticket</h6><small class="text-muted">row ${row} seat ${seatNum}</small>
    </div><span class="text-muted">$12</span>
  </li>`
}

function cartListSum(){
    let sum = seats.length*12
    return `<li class="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$${sum}</strong></li>`
}

$(document).on("click",".placeOrderButton",(event)=>{
    document.getElementById('hiddenField').value = seats;
    document.getElementById("orderForm").submit();
})