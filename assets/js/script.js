// added radio js
const radioBtns = document.querySelectorAll('input[name="music"]');
const searchBands = document.querySelector("#search-bands");
const submitBtn = document.querySelector("#submit-btn");
const resultsTable = document.querySelector(".results-table");

let selection = "";
// get user input from search bar.
let searchInput = "";

//artist query
const Query = selection => {
  // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual Client ID and Client Secret
  const CLIENT_ID = "0c8075639deb423fb168d3128753a4f7";
  const CLIENT_SECRET = "49239f31e67d4dea9e7242036b02e8fe";

  // Base64 encode the client ID and secret
  const encodedCredentials = btoa(CLIENT_ID + ":" + CLIENT_SECRET);

  // Define the API endpoint for token
  const tokenUrl = "https://accounts.spotify.com/api/token";

  // Define the request options for token
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + encodedCredentials
    },
    body: "grant_type=client_credentials"
  };

  // Function to get the access token
  fetch(tokenUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
      const accessToken = data.access_token;
      // console.log('Access Token:', accessToken);

      // if (searchBands.value === localStorage.getItem('searchValue')) {
      //     alert("please enter different search content!")
      //     return 0;
      // }

      if (searchBands.value) {
        searchInput = searchBands.value;
        localStorage.setItem("searchValue", searchBands.value);
      } else {
        alert("please enter content to search!");
        return 0;
      }

      const URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=${selection}&limit=20`;

      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
        .then(response => response.json())
        .then(Data => {
          if (selection === "artist") {
            // resultsTable.innerHTML = JSON.parse(localStorage.getItem('recent-input'));
            resultsTable.innerHTML = "";
            const artistItems = Data.artists.items;
            // console.log(artistItems);
            const storeArtistName = [];
            const storeArtistHREF = [];
            const storeArtistImg = [];
            const artistTable = document.createElement("div");
            artistTable.innerHTML += `<h3 class="text-lg font-bold">Artists: </h3>`;
            artistTable.classList = "flex flex-wrap justify-between";
            for (const artistItem of artistItems) {
              console.log(artistItem.images[1].url);
              storeArtistName.push(artistItem.name);
              storeArtistHREF.push(artistItem.external_urls.spotify);
              storeArtistImg.push(artistItem.images[1].url);
            }
            localStorage.setItem(
              "artist-names",
              JSON.stringify(storeArtistName)
            );
            localStorage.setItem(
              "artist-hrefs",
              JSON.stringify(storeArtistHREF)
            );
            localStorage.setItem("artist-imgs", JSON.stringify(storeArtistImg));
            let historicalArtistNames = JSON.parse(
              localStorage.getItem("artist-names")
            );
            let historicalArtistHREFs = JSON.parse(
              localStorage.getItem("artist-hrefs")
            );
            let historicalArtistImgs = JSON.parse(
              localStorage.getItem("artist-imgs")
            );
            for (let i = 0; i < historicalArtistNames.length; i++) {
              // console.log(historicalArtistNames[i]);
              // console.log(historicalArtistHREFs[i]);
              let artistDiv = document.createElement("div");
              let artistIMG = document.createElement("img");
              let artistLink = document.createElement("a");
              let artistButton = document.createElement("button");
              artistButton.classList = "border-2 border-slate-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
              artistButton.textContent = historicalArtistNames[i];
              artistLink.classList =
                "group cursor-auto result border-2 border-blue-200 w-[50%] p-2 mb-2 text-center shadow-md rounded-md hover:cursor-pointer hover:bg-blue-200 hover:text-white transition duration-200 font-bold";
              artistLink.textContent = historicalArtistNames[i];
              artistLink.href = historicalArtistHREFs[i];
              artistLink.target = "_blank";
              artistDiv.classList = "flex flex-wrap justify-center items-center";
              artistIMG.src = historicalArtistImgs[i];
              artistDiv.appendChild(artistIMG);
              artistDiv.appendChild(artistButton);
              artistLink.appendChild(artistDiv);
              artistTable.appendChild(artistLink);
            }
            resultsTable.appendChild(artistTable);
            localStorage.setItem(
              "recent-input",
              JSON.stringify(resultsTable.innerHTML)
            );
          } else if (selection === "track") {
            resultsTable.innerHTML = "";
            const trackItems = Data.tracks.items;
            const storeTrackName = [];
            const storeTrackHREFs = [];
            const storeTrackImg = [];
            const trackTable = document.createElement("div");
            trackTable.innerHTML += `<h3 class="text-lg font-bold">Songs: </h3>`;
            trackTable.classList = "flex flex-wrap justify-between";
            for (const trackItem of trackItems) {
              // console.log(trackItem.album.images[1].url);
              storeTrackName.push(trackItem.name);
              storeTrackHREFs.push(trackItem.external_urls.spotify);
              storeTrackImg.push(trackItem.album.images[1].url);
            }
            localStorage.setItem("track-names", JSON.stringify(storeTrackName));
            localStorage.setItem(
              "track-hrefs",
              JSON.stringify(storeTrackHREFs)
            );
            localStorage.setItem("track-imgs", JSON.stringify(storeTrackImg));
            let historicalTrackNames = JSON.parse(
              localStorage.getItem("track-names")
            );
            let historicalTrackHREFs = JSON.parse(
              localStorage.getItem("track-hrefs")
            );
            let historicalTrackImgs = JSON.parse(
              localStorage.getItem("track-imgs")
            );
            for (let i = 0; i < historicalTrackNames.length; i++) {
              // console.log(historicalTrackNames[i]);
              // console.log(historicalTrackHREFs[i]);
              let trackDiv = document.createElement("div");
              let trackIMG = document.createElement("img");
              let trackLink = document.createElement("a");
              trackLink.classList =
                "group cursor-auto result border-2 border-blue-200 w-[50%] p-2 mb-2 text-center shadow-md rounded-md hover:cursor-pointer hover:bg-blue-200 hover:text-white transition duration-200 font-bold";
              trackLink.textContent = historicalTrackNames[i];
              trackLink.href = historicalTrackHREFs[i];
              trackLink.target = "_blank";
              trackDiv.classList = "flex justify-center items-center font-bold";
              trackIMG.src = historicalTrackImgs[i];
              trackDiv.appendChild(trackIMG);
              trackLink.appendChild(trackDiv);
              trackTable.appendChild(trackLink);
            }
            resultsTable.appendChild(trackTable);
            localStorage.setItem(
              "recent-input",
              JSON.stringify(resultsTable.innerHTML)
            );
          }
        });
    });
};

const handleRadioInputs = event => {
  event.preventDefault();
  radioBtns.forEach(radioBtn => {
    if (radioBtn.checked) {
      // console.log(radioBtn.value);
      // return radioBtn.value;
      selection = radioBtn.value;
      //function here;
      // console.log(selection);
      // Fetch the band's information using the access token
      Query(selection);
    }
  });
};

window.onload = () => {
  searchBands.value = localStorage.getItem("searchValue");
  resultsTable.innerHTML = JSON.parse(localStorage.getItem("recent-input"));
};
submitBtn.addEventListener("click", handleRadioInputs);
//end of the radio selection

// // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual Client ID and Client Secret
// const CLIENT_ID = '0c8075639deb423fb168d3128753a4f7';
// const CLIENT_SECRET = '49239f31e67d4dea9e7242036b02e8fe';

// // Base64 encode the client ID and secret
// const encodedCredentials = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

// // Define the API endpoint for token
// const tokenUrl = 'https://accounts.spotify.com/api/token';

// // Define the request options for token
// const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + encodedCredentials
//     },
//     body: 'grant_type=client_credentials'
// };

// // Function to get the access token
// fetch(tokenUrl, requestOptions)
//     .then(response => response.json())
//     .then(data => {
//         const accessToken = data.access_token;
//         console.log('Access Token:', accessToken);

//         // Get the input field
//         const searchBands = document.getElementById('search-bands');

//         // Add an event listener to the input field
//         searchBands.addEventListener('keyup', function(event) {
//             // Get the band name from the input field
//             const bandName = event.target.value;

//             // Fetch the band's information using the access token
//             const bandUrl = `https://api.spotify.com/v1/search?q=${bandName}&type=artist&limit=1`;

//             fetch(bandUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': 'Bearer ' + accessToken
//                 }
//             })
//             .then(response => response.json())
//             .then(bandData => {
//                 // Get the band's Spotify ID and genres
//                 const bandId = bandData.artists.items[0].id;
//                 const bandGenres = bandData.artists.items[0].genres;

//                 // Fetch the band's related artists using the access token
//                 const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${bandId}/related-artists`;

//                 fetch(relatedArtistsUrl, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': 'Bearer ' + accessToken
//                     }
//                 })
//                 .then(response => response.json())
//                 .then(relatedArtistsData => {
//                     // Filter related artists by matching genres
//                     let filteredRelatedArtists = relatedArtistsData.artists.filter(artist => {
//                         // Find the common genres
//                         const commonGenres = artist.genres.filter(genre => bandGenres.includes(genre));

//                         // Check if there are at least 2 common genres
//                         return commonGenres.length >= 2;
//                     });

//                     // If no artists match the 2-genre criteria, check for at least 1 common genre
//                     if (filteredRelatedArtists.length === 0) {
//                         filteredRelatedArtists = relatedArtistsData.artists.filter(artist => {
//                             // Find the common genres
//                             const commonGenres = artist.genres.filter(genre => bandGenres.includes(genre));

//                             // Check if there is at least 1 common genre
//                             return commonGenres.length >= 1;
//                         });
//                     }

//                     // If no artists match the genre criteria, log a message
//                     if (filteredRelatedArtists.length === 0) {
//                         console.log('No related artists with common genres found.');
//                     } else {
//                         // Log the filtered related artists
//                         console.log('Filtered Related Artists:', filteredRelatedArtists.map(artist => artist.name));

//                         // Append the first 10 related artists to the specified div elements
//                         for (let i = 0; i < Math.min(10, filteredRelatedArtists.length); i++) {
//                             const artistDiv = document.getElementById(`result-${i+1}`);
//                             artistDiv.textContent = filteredRelatedArtists[i].name;
//                         }
//                     }
//                 })
//                 .catch(error => console.error('Error fetching related artists data:', error));
//             })
//             .catch(error => console.error('Error fetching band data:', error));
//         });
//     })
//     .catch(error => console.error('Error fetching access token:', error));
