
// added radio js
const radioBtns = document.querySelectorAll('input[name="music"]');
const submitBtn = document.querySelector('#submit-btn')
let selection = "";
// get user input from search bar.
let searchInput = "";

//artist query
const artistQuery = () => {

    // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual Client ID and Client Secret
    const CLIENT_ID = '0c8075639deb423fb168d3128753a4f7';
    const CLIENT_SECRET = '49239f31e67d4dea9e7242036b02e8fe';

    // Base64 encode the client ID and secret
    const encodedCredentials = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

    // Define the API endpoint for token
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    // Define the request options for token
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + encodedCredentials 
        },
        body: 'grant_type=client_credentials'
    };

    // Function to get the access token
    fetch(tokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            // console.log('Access Token:', accessToken);
            const searchBands = document.querySelector('#search-bands');
            searchInput= searchBands.value;
            
            const artistURL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=${selection}&limit=5`;

                fetch(artistURL, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                .then(response => response.json())
                .then(artistData => {
                    console.log(artistData);
                })
            })
        }

const handleRadioInputs = (event) => {
    event.preventDefault();
    radioBtns.forEach(radioBtn => {
        if (radioBtn.checked) {
            // console.log(radioBtn.value);
            // return radioBtn.value;
            selection = radioBtn.value;
            //function here;

            // Fetch the band's information using the access token
            if (selection === "artist") {
                artistQuery();
            }
        }
    })
}

submitBtn.addEventListener('click', handleRadioInputs)
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
