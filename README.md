
# Sound Spiral

Sound Spiral is a web application that allows users to search for music artists or tracks using the Spotify API. The application provides detailed search results, including artist names, Spotify links, images, and a quick search button to find the artist on Spotify or Wikipedia.

## Features

- Search for music artists either by artist or track name
- Display results with artist names, images, and links to Spotify
- Quick search button to find artists/tracks on Wikipedia
- Persistent storage of search input and results

## Screenshot

![alttext](/assets/images/Screenshot%202024-07-21%20193517.png)

## Files

1. **index.html**: The main HTML file containing the structure of the web page.
2. **styles.css**: The CSS file used to style the web page, utilizing Tailwind CSS for utility-first styling.
3. **script.js**: The JavaScript file containing the logic for fetching data from the Spotify and Wikipedia API, and handling user interactions.
4. **favicon.png**: The logo used in the web application.
5. **artwork-placeholder.jpg**: A placeholder image used when an artist or track image is not available.

## Setup

1. **Prerequisites**: 
   - Tailwind CSS configured in your project
   - JQuery Basde + UI configured in project

2. **Installation**:
   - Clone the repository
   - Install Tailwind CSS by following the [official guide](https://tailwindcss.com/docs/installation)
   - Ensure you have a Spotify Developer account and have created an application to obtain your Client ID and Client Secret

3. **Configuration**:
   - Replace the placeholders `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` in the `script.js` file with your actual Spotify API credentials.

## Usage

1. **Start the Application**:
   - Open page [here](https://benjr546.github.io/sound-spiral/)

2. **Search for Artists or Tracks**:
   - Enter the name of an artist or track in the search bar.
   - Select either "Artist" or "Song" using the dropdown
   - Click the "Submit" button to fetch and display the search results.

## File Details

**index.html**:
- Contains the structure of the web page including the header, search form, and results section.
- Links to the `styles.css` and `script.js` files.
- Uses Tailwind CSS for styling
- Uses JQuery and JQuery UI for element selection and UI elements

**styles.css**:
- Imports Tailwind CSS utilities, components, and base styles.
- Customizes the appearance of the web page elements.

**script.js**:
- Handles user interactions and fetches data from the Spotify API.
- Handles user interactions and fetches data from the Wikipedia API.
- Defines the `Query` function to request an access token and search for artists or tracks.
- Processes the API response to display the results, including artist/track names, Spotify links, Wikipedia links, and images.
- Adds event listeners to handle form submission and search input validation.

## Contributing

Feel free to submit issues or pull requests for any improvements or new features you would like to see.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Developers

[Ben](https://github.com/BenJR546)
[Alana](github.com/ajhearne-mZAOSW)
[William](github.com/William-figure)
[June](github.com/Lijujujune)

## GitHub Repo

You can find the repo [here](https://github.com/BenJR546/sound-spiral)