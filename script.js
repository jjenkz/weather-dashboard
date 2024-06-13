const fetchButton = document.getElementById("search-button");

function getApi() {
  const requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={e6dfe8b0f0462fe603d660cc1de7b7e0}";
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
