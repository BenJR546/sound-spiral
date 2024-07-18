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
        // alert("please enter content to search!");
        resultsTable.innerHTML += `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Error!</h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">You can't search for artist or songs without any text input!</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button type="button" id="cancel-button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        const buttonCancel = document.querySelector('#cancel-button');
        buttonCancel.addEventListener("click", () => resultsTable.innerHTML = "")
        return 0;
      }

    

      const URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=${selection}&limit=50`;

      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
        .then(response => response.json())
        .then(Data => {
          if (selection === "artist") {
            resultsTable.innerHTML = `` ;
            // resultsTable.innerHTML = JSON.parse(localStorage.getItem('recent-input'));
            const artistItems = Data.artists.items;
            // console.log(artistItems);
            const storeArtistName = [];
            const storeArtistHREF = [];
            const storeArtistImg = [];
            const artistTable = document.createElement("div");
            artistTable.innerHTML += `<h3 class="text-lg font-bold">Artists: </h3>`;
            artistTable.classList = "flex flex-wrap justify-between";
            for (const artistItem of artistItems) {
              // console.log(artistItem.images[1].url);
              storeArtistName.push(artistItem.name);
              storeArtistHREF.push(artistItem.external_urls.spotify);
              if (artistItem.images.length !== 0) {
                storeArtistImg.push(artistItem.images[1].url);
              } else {
                storeArtistImg.push("../assets/img/placeholder-img.svg")
              }
            }
            // console.log(storeArtistImg);
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
              let artistSecondaryDiv = document.createElement("div");
              let artistIMG = document.createElement("img");
              let artistLink = document.createElement("a");
              let artistButton = document.createElement("button");
              artistIMG.classList = "w-[190px] h-[190px] m-5 rounded-md"
              artistButton.classList = "w-[50%] border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200";
              artistButton.textContent = `${historicalArtistNames[i]} YouTube`;
              artistButton.addEventListener('click', function() {
                const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(historicalArtistNames[i])}`;
                window.open(youtubeSearchUrl, '_blank');
              });
              artistLink.classList =
                "cursor-auto result border-2 border-slate-400 w-[50%] p-2 mb-2 text-center shadow-md rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-white transition duration-200 font-bold";
              artistDiv.classList =
                "flex flex-col justify-center items-center cursor-auto result border-2 border-blue-400 w-[50%] p-2 mb-2 text-center shadow-md rounded-md";
              if (historicalArtistImgs[i] === "../assets/img/placeholder-img.svg") {
                artistDiv.classList.add('opacity-50','pointer-events-none');
              }
              artistSecondaryDiv.classList = "flex flex-row items-center justify-around";
              artistLink.textContent = `${historicalArtistNames[i]} Spotify`;
              artistLink.href = historicalArtistHREFs[i];
              artistLink.target = "_blank";
              artistIMG.src = historicalArtistImgs[i];
              artistDiv.appendChild(artistIMG);
              artistSecondaryDiv.appendChild(artistButton);
              artistSecondaryDiv.appendChild(artistLink);
              artistDiv.appendChild(artistSecondaryDiv);
              artistTable.appendChild(artistDiv);
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
            // trackTable.classList = "flex flex-wrap"
            for (const trackItem of trackItems) {
              // console.log(trackItem.album.images[1].url);
              storeTrackName.push(trackItem.name);
              storeTrackHREFs.push(trackItem.external_urls.spotify);
              if (trackItem.album.images.length !== 0) {
                storeTrackImg.push(trackItem.album.images[1].url);
              } else {
                storeTrackImg.push("../assets/img/placeholder-img.svg")
              }
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
              // console.log(historicalTrackImgs[i]);
              // console.log(historicalTrackNames[i]);
              // console.log(historicalTrackHREFs[i]);
              let trackDiv = document.createElement("div");
              let trackSecondaryDiv = document.createElement("div");
              let trackIMG = document.createElement("img");
              let trackLink = document.createElement("a");
              let trackButton = document.createElement("button");
              trackIMG.classList = "w-[190px] h-[190px] m-5 rounded-md"
              trackButton.classList = "w-[50%] border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200";
              trackButton.textContent = `${historicalTrackNames[i]} YouTube`;
              trackButton.addEventListener('click', function() {
                const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(historicalTrackNames[i])}`;
                window.open(youtubeSearchUrl, '_blank');
              });
              trackDiv.classList = "flex flex-col justify-center items-center cursor-auto result border-2 border-blue-400 w-[50%] p-2 mb-2 text-center shadow-md rounded-md";
              trackSecondaryDiv.classList = "flex flex-row items-center justify-around";
              if (historicalTrackImgs[i] === "../assets/img/placeholder-img.svg") {
                artistDiv.classList.add('opacity-50','pointer-events-none');
              }
              trackLink.classList = "cursor-auto result border-2 border-slate-400 w-[50%] p-2 mb-2 ml-2 text-center shadow-md rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-white transition duration-200 font-bold";
              trackLink.textContent = `${historicalTrackNames[i]} Spotify`;
              trackLink.href = historicalTrackHREFs[i];
              trackLink.target = "_blank";
              trackIMG.src = historicalTrackImgs[i];
              trackDiv.appendChild(trackIMG);
              trackSecondaryDiv.appendChild(trackButton);
              trackSecondaryDiv.appendChild(trackLink);
              trackDiv.appendChild(trackSecondaryDiv);
              trackTable.appendChild(trackDiv);
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

// window.onload = () => {
//   // resultsTable.innerHTML = `<p class="text-slate-500 italic">Please search for results and select desired type.</p>` ;
//   // searchBands.value = localStorage.getItem("searchValue");
//   // resultsTable.innerHTML = JSON.parse(localStorage.getItem("recent-input"));
// };
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
