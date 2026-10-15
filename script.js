
async function getArtistData() {
    // Fetch the data from the JSON file.
    const response = await fetch('data.json');
    const data = await response.json();

    // Store the artist information.
    const artistData = data;

    // Loop through the array of artists.
    for (let i = 0; i < artistData.length; i++) {
        // Create a card for each artist.
        const c = new Card(
            artistData[i].name,
            artistData[i].songs,
            artistData[i].image
        );

        // Display the artist's information on the card.
        c.displayCard();
    }
}

class Card {
    constructor(name, songs, image) {
        // Save the artist information so the card can use it.
        this.name = name;
        this.songs = songs;
        this.image = image;

        // Create the main card element.
        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card');

        // Create the elements for the artist information.
        this.imageElement = document.createElement('img');
        this.nameElement = document.createElement('h2');

        // Create a divider between the name and songs.
        this.cardDivider = document.createElement('hr');

        // Create a heading for the three hit songs.
        this.songsHeading = document.createElement('h3');
        this.songsHeading.innerText = '3 HIT SONGS';

        // Create a container for the song titles.
        this.songsElement = document.createElement('div');
        this.songsElement.classList.add('songs');

        // Add the elements inside the card.
        this.cardElement.appendChild(this.imageElement);
        this.cardElement.appendChild(this.nameElement);
        this.cardElement.appendChild(this.cardDivider);
        this.cardElement.appendChild(this.songsHeading);
        this.cardElement.appendChild(this.songsElement);

        // Create a click event for the card.
        const that = this;
        this.onClick = function () {
            that.selectCard();
        };

        this.cardElement.addEventListener('click', this.onClick);

        // Add the card to the webpage.
        document.getElementById('artist_container')
            .appendChild(this.cardElement);
    }

    displayCard() {
        // Display the artist's photo and name.
        this.imageElement.src = this.image;
        this.imageElement.alt = this.name;
        this.nameElement.innerText = this.name;

        // Clear the song container before adding songs.
        this.songsElement.innerHTML = '';

        // Loop through the artist's three songs.
        for (let i = 0; i < this.songs.length; i++) {
            // Create a paragraph for each song.
            const songElement = document.createElement('p');

            // Display the song title.
            songElement.innerText = this.songs[i];

            // Add the song to the card.
            this.songsElement.appendChild(songElement);
        }
    }

    selectCard() {
        // Check if this card is already highlighted.
        if (this.cardElement.classList.contains('selected')) {

            // If it is highlighted, remove the highlight.
            this.cardElement.classList.remove('selected');

        } else {
            // Find all the artist cards.
            const allCards = document.querySelectorAll('.card');

            // Remove the highlight from every card.
            for (let i = 0; i < allCards.length; i++) {
                allCards[i].classList.remove('selected');
            }

            // Highlight the card that was clicked.
            this.cardElement.classList.add('selected');
        }
    }
}

// Run the function to load the artists.
getArtistData();
