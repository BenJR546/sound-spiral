
# Music Finder

Music Finder is a web application that allows users to search for music artists or tracks using the Spotify API. The application provides detailed search results, including artist names, Spotify links, images, and a quick search button to find the artist or track on YouTube.

## Features

- Search for music artists or tracks
- Display results with artist/track names, images, and links to Spotify
- Quick search button to find artists/tracks on YouTube
- Persistent storage of search input and results

## Files

1. **index.html**: The main HTML file containing the structure of the web page.
2. **styles.css**: The CSS file used to style the web page, utilizing Tailwind CSS for utility-first styling.
3. **script.js**: The JavaScript file containing the logic for fetching data from the Spotify API and handling user interactions.
4. **Music_Finder_Logo.png**: The logo used in the web application.
5. **placeholder-img.svg**: A placeholder image used when an artist or track image is not available.

## Setup

1. **Prerequisites**: 
   - Node.js and npm installed on your machine
   - Tailwind CSS configured in your project

2. **Installation**:
   - Clone the repository
   - Install Tailwind CSS by following the [official guide](https://tailwindcss.com/docs/installation)
   - Ensure you have a Spotify Developer account and have created an application to obtain your Client ID and Client Secret

3. **Configuration**:
   - Replace the placeholders `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` in the `script.js` file with your actual Spotify API credentials.

## Usage

1. **Start the Application**:
   - Open the `index.html` file in your preferred web browser.

2. **Search for Artists or Tracks**:
   - Enter the name of an artist or track in the search bar.
   - Select either "Artist" or "Song" using the radio buttons.
   - Click the "Submit" button to fetch and display the search results.

## File Details

**index.html**:
- Contains the structure of the web page including the header, search form, and results section.
- Links to the `styles.css` and `script.js` files.
- Uses Tailwind CSS for styling.

**styles.css**:
- Imports Tailwind CSS utilities, components, and base styles.
- Customizes the appearance of the web page elements.

**script.js**:
- Handles user interactions and fetches data from the Spotify API.
- Defines the `Query` function to request an access token and search for artists or tracks.
- Processes the API response to display the results, including artist/track names, Spotify links, and images.
- Adds event listeners to handle form submission and search input validation.

## Contributing

Feel free to submit issues or pull requests for any improvements or new features you would like to see.

## License

This project is open-source and available under the [MIT License](LICENSE).
