"use strict"
let form = document.querySelector("form");
let searchInp = document.querySelector("#search");
form.addEventListener('submit', function(e){
  e.preventDefault()
})
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
  
      let currentPosition = `${latitude},${longitude}`;
      getData(currentPosition);
    });
  }
searchInp.addEventListener('input', function () {
  
    getData(searchInp.value)

})
async function getData(location) {
   try{
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1600cec7293a4451b08184142241006&days=3&q=${location}`)
    let data = await response.json()
    display(data)
    document.getElementById('alert').classList.add('d-none')
   }
   catch{
    if(searchInp.value==""){
      document.getElementById('alert').classList.add('d-none')
     }
else{
  document.getElementById('alert').classList.remove('d-none')
}
   }
}

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
function display(response) {
    let cartona = ``;
    for (let i = 0; i < response.forecast.forecastday.length; i++) {
        let date = new Date(response.forecast.forecastday[i].date)
        if (i == 0) {
            cartona += `        
        <div class="col-lg-4 ">
      <div class="today-forcast">
        <div class="forcast-header d-flex justify-content-between align-items-center p-2">
          <p class="m-0">${days[date.getDay()]}</p>
          <p class="m-0"><i class="fa-regular fa-calendar-days fa-sm me-1" style="color: #bfc1c8;"></i>${date.getDate()}${months[date.getMonth()]}</p>
        </div>
        <div class="forcast-content d-flex flex-column p-4">
          <p class="location"><i class="fa-solid fa-city fa-sm me-1" style="color: #bfc1c8;"></i>${response.location.name}</p>
          <div class="num">
            <h1 class="text-white w-100">${response.current.temp_c}<sup>o</sup>C</h1>
          </div>
          <div>
            <img src=${response.current.condition.icon} alt="sun" width="90"/>
          </div>
          <p class="custom">${response.current.condition.text}</p>
          <ul class="d-flex justify-content-start list-unstyled">
            <li class="me-4">
              <img src="assests/images/icon-umberella.png" alt="umbrella" class="me-1"/><span>20%</span>
            </li>
            <li class="me-4">
              <img src="assests/images/icon-wind.png" alt="wind" class="me-1"/><span>18km/h</span>
            </li>
            <li class="me-4">
              <img src="assests/images/icon-compass.png" alt="compass" class="me-1"/><span>East</span>
            </li>
            
            
          </ul>
        </div>
      </div>
    </div>
            `
        }
else{
    cartona += `
    <div class="col-lg-4 ">
      <div class="forcast h-100">
        <div class="forcast-header d-flex justify-content-between align-items-center p-2">
          <p class="m-0">${days[date.getDay()]}</p>
          <p class="m-0"><i class="fa-regular fa-calendar-days fa-sm me-1" style="color: #bfc1c8;"></i>${date.getDate()}${months[date.getMonth()]}</p>
        </div>
        <div class="forcast-content pt-5 d-flex flex-column justify-content-center align-items-center p-4">
          <img src=${response.forecast.forecastday[i].day.condition.icon} alt="sun" width="48" class="mb-4"/>
          <h3 class="text-white">${response.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h3>
          <p>${response.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></p>
          <div>                 
          </div>
          <p class="custom">${response.forecast.forecastday[i].day.condition.text}</p>
        </div>
      </div>
    </div>
    `
}
    }
    document.querySelector('#rowData').innerHTML = cartona;
}