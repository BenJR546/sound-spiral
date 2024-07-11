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
        console.log('Access Token:', accessToken);

        // Get the input field
        const searchBands = document.getElementById('search-bands');

        // Add an event listener to the input field
        searchBands.addEventListener('keyup', function(event) {
            // Get the band name from the input field
            const bandName = event.target.value;

            // Fetch the band's information using the access token
            const bandUrl = `https://api.spotify.com/v1/search?q=${bandName}&type=artist&limit=1`;

            fetch(bandUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(bandData => {
                // Get the band's Spotify ID
                const bandId = bandData.artists.items[0].id;

                // Fetch the band's related artists using the access token
                const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${bandId}/related-artists`;

                fetch(relatedArtistsUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                .then(response => response.json())
                .then(relatedArtistsData => {
                    console.log('Related Artists Data:', relatedArtistsData);
                })
                .catch(error => console.error('Error fetching related artists data:', error));
            })
            .catch(error => console.error('Error fetching band data:', error));
        });
    })
    .catch(error => console.error('Error fetching access token:', error));
