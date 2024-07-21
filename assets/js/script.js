const typeSelectEl = document.getElementById('search-type');
const searchInputEl = document.querySelector('#search-input');
const submitBtn = document.querySelector('#submit-btn');
const results = document.querySelector('#searched-results');

// get spotify access token
function getAccessToken() {
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
    
    // get access token
    fetch(tokenUrl, requestOptions)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data) {
                    localStorage.setItem('accessToken', data.access_token);
                    console.log('Retrieved access token');
                });
            } else {
                alert(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert('Error');
        })
}

// get search method from drop-down
function getSelectionType () {
    let selection = typeSelectEl.value;
    return selection;
}

// submit form and blank input modal error handler
function searchSubmitHandler (event) {
    event.preventDefault();
    $('#searched-results').empty();
    $('#similar-results').empty();
    let selection = getSelectionType ();
    let searchInput = searchInputEl.value.trim();
    console.log('Searching for', searchInput, 'as type', selection);

    if(searchInput) {
        if (selection === 'artist') {
            getSearchedArtist(searchInput);
        } else {
            getSearchedSong(searchInput);

        } 
        searchInputEl.value = '';
    } else {
        results.innerHTML += `
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
                                    <p class="text-sm text-gray-500">An artist or song is needed to begin the sound spiral!</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button type="button" id="cancel-button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        const buttonCancel = document.querySelector('#cancel-button');
        buttonCancel.addEventListener("click", () => document.querySelector('#searched-results').innerHTML = "")
        buttonCancel.addEventListener("click", () => document.querySelector('#similar-results').innerHTML = "")
        return 0;
    }
}

// get artist id
function getSearchedArtist(searchInput) {
    let accessToken = localStorage.getItem('accessToken');
    const artistUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=1`;

    fetch(artistUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (artistData) {                    
                    let artistName = artistData.artists.items[0].name;
                    displaySearchedArtist(artistName);
                    getSearchedArtistWiki(artistName);

                    let artistID = artistData.artists.items[0].id;
                    getRelatedArtists(artistID);
                }) 
            } else {
                console.log(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            console.log('Error');
        })
}

// get artist from song
function getSearchedSong(searchInput) {
    let accessToken = localStorage.getItem('accessToken');

    const trackUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=1`;

    fetch(trackUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (songData) {
                    let artistName = songData.tracks.items[0].artists[0].name;
                    displaySearchedArtist(artistName);
                    getSearchedArtistWiki(artistName);

                    let artistID = songData.tracks.items[0].artists[0].id;
                    getRelatedArtists(artistID);
                })
            } else {
                console.log(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            console.log('Error');
        })
    
}

// display the artist from user search input
function displaySearchedArtist (artistName) {
    let searchedCard = $('<div>').addClass('flex flex-col searched-card content-center justify-center');
    let searchedContent = $('<p>').addClass('mx-auto text-white text-xl font-bold justify-center').text('Showing artists similar to:');
    let name = $('<p>').addClass('mx-auto text-[#33d1ff] text-3xl font-bold').text(artistName);

    searchedCard.append(searchedContent, name);
    $('#searched-results').append(searchedCard);
}

// get related artist using artist id
function getRelatedArtists(artistID) {
    let accessToken = localStorage.getItem('accessToken');
    const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;

    fetch(relatedArtistsUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (relatedArtistsData) {
                    displayRelatedArtists(relatedArtistsData);
                })
            } else {
                console.log(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            console.log('Error');
        })
}

// append results div with related artists
function displayRelatedArtists(relatedArtistsData) {    
    for (i = 0; i < relatedArtistsData.artists.length; i++) {
        let artist = $('<p>').addClass('content-center justify-center').text(relatedArtistsData.artists[i].name);
        let artistCard = $('<div>').addClass('artist-card grid grid-cols-3 gap-4 border-transparent rounded-lg shadow-xl backdrop-blur-xl bg-white/30 text-2xl text-white font-semibold');
        let imgSRC = '';

        if (relatedArtistsData.artists[i].images.length === 0) {
            imgSRC = "./assets/images/artwork-placeholder.jpg";
        } else {
            imgSRC = relatedArtistsData.artists[i].images[1].url;
        }

        let artistImg = $('<img>').addClass('max-h-40 rounded-lg m-2').attr('src', imgSRC);

        let spotifyButton = document.createElement("a");
        spotifyButton.classList = "p-2 my-auto mx-2 cursor-auto border-transparent bg-[#33dd66] text-center shadow-sm rounded-md hover:cursor-pointer hover:bg-green-200 transition duration-200 text-base font-semibold";
        spotifyButton.title = 'Find out more about the artist on Spotify';
        spotifyButton.innerHTML = '<i class="fa-brands fa-spotify"></i> Spotify';
        spotifyButton.href = relatedArtistsData.artists[i].external_urls.spotify;
        spotifyButton.target = "_blank";

        artistCard.append(artistImg, artist, spotifyButton);
        $('#similar-results').append(artistCard);
    }
}

// get the wiki article for the searched artist
function getSearchedArtistWiki(artistName) {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${encodeURIComponent(artistName)}`;

    fetch(wikiUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (wikiData) {
                displaySearchedWiki(wikiData);
            })
        } else {
            console.log('Wiki not found.');
        }
    })
    .catch(function (error) {
        console.log('Error');
    })
}

// append results div with link to artist wiki
function displaySearchedWiki(wikiData) {
    let wikiButton = document.createElement("a");
        wikiButton.classList = "p-2 m-auto cursor-auto border-transparent bg-zinc-900 text-white text-center shadow-md rounded-md hover:cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 transition duration-200 font-semibold";
        wikiButton.title = `Click to go to artists wiki`;
        wikiButton.innerHTML = '<i class="fa-brands fa-wikipedia-w"></i> Artist Wiki';
        wikiButton.href = wikiData[3][0];
        wikiButton.target = "_blank";

    $('#searched-results').append(wikiButton);
}

window.onload = getAccessToken();
submitBtn.addEventListener('click', searchSubmitHandler);