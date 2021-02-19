const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
//Query selector all selects all the seats in the row that are not occupied and put it in a type of node like an array//
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;
//putting a plus sign infront of the movieSelect.value will change it from a string into a number

//saves selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
    
}




//updates total and count
function updateSelectedCount(){

    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

   localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //copy selected seats into array
    //map through array
    //return a new array
    
}


// Get data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }



//movie select event
movieSelect.addEventListener("change", function(e) {
    ticketPrice = + e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//seat click event
container.addEventListener("click", function(e) {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
    }

    updateSelectedCount();
    //If it has the class of seat but does not have the class of occupied, run this!
    //the toggle method allows us to toggle between adding selected class and removing it.
})

//initial Count and total set
updateSelectedCount();