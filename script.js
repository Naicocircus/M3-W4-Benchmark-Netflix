
document.addEventListener('DOMContentLoaded', function () {
  
    const scrollLeftButtons = document.querySelectorAll('.scrollLeft');
    const scrollRightButtons = document.querySelectorAll('.scrollRight');
    const cardContainers = document.querySelectorAll('.card-container');

 
    const genreDropdownButton = document.getElementById('genreDropdown');
    const genresList = document.getElementById('genresList');


    const userIcon = document.getElementById('userIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Array delle immagini----------------------------
    const originalImageFiles = [
        '1.png', '2.png', '3.png', '4.png', '5.png',
        '6.png', '7.png', '8.png', '9.png', '10.png',
        '11.png', '12.png', '13.png', '14.png', '15.png',
        '16.png', '17.png', '18.png', '19.png', '20.png',
        '21.png', '22.png', '23.png', '24.png', '25.png',
        '26.png', '27.png', '28.png', '29.png', '30.png'
    ];

    // Funzione per riempire le card con le immagini random-----------------------
    function populateCards(container) {
        let imageFiles = [...originalImageFiles];
        const cards = container.querySelectorAll('.card img');
        cards.forEach(img => {
            const randomIndex = Math.floor(Math.random() * imageFiles.length);
            const selectedImage = imageFiles.splice(randomIndex, 1)[0];
            img.src = `assets/imgs/movies/${selectedImage}`;
        });
    }

  
    cardContainers.forEach(container => populateCards(container));

    // Funzione per calcolare la quantità di scroll -----------------
    function getScrollAmount(container) {
        const card = container.querySelector('.card');
        const cardWidth = card ? card.offsetWidth : 0;
        const isMobile = window.innerWidth <= 576;
        return cardWidth * (isMobile ? 1 : 6); 
    }

    // scorimento laterale al click----------------------
    scrollLeftButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cardContainers[index].scrollBy({
                left: -getScrollAmount(cardContainers[index]),
                behavior: 'smooth'
            });
        });
    });

    scrollRightButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cardContainers[index].scrollBy({
                left: getScrollAmount(cardContainers[index]),
                behavior: 'smooth'
            });
        });
    });

    // Mostra e nascondi menu genres--------------------------------
    genreDropdownButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Impedisce la propagazione del click
        genresList.classList.toggle('show'); // Alterna la visibilità del menu
    });

    // Chiude il menu "Genres" se si clicca fuori--------------------
    document.addEventListener('click', function (event) {
        if (genresList.classList.contains('show') && !genreDropdownButton.contains(event.target)) {
            genresList.classList.remove('show');
        }
    });

    // Menu a tendina------------------------
    userIcon.addEventListener('click', (event) => {
        event.stopPropagation(); 
        dropdownMenu.classList.toggle('show'); 
    });

    // Chiude il menu a tendina dell'utente se si clicca fuori---------------
    document.addEventListener('click', (event) => {
        if (!userIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Effetto per evidenziare i pulsanti quando il cursore si trova sulla prima o sesta card-------
    const cardContainerWrappers = document.querySelectorAll('.card-container-wrapper');

    cardContainerWrappers.forEach(container => {
        const cards = container.querySelectorAll('.card');
        const leftButton = container.querySelector('.scroll-button-left');
        const rightButton = container.querySelector('.scroll-button-right');

        // Funzione per verificare se una card si trova sotto un pulsante
        function isCardUnderButton(card, button) {
            const cardRect = card.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            return (
                cardRect.right > buttonRect.left &&
                cardRect.left < buttonRect.right &&
                cardRect.top < buttonRect.bottom &&
                cardRect.bottom > buttonRect.top
            );
        }

        // Effetto hover per la prima card
        if (cards[0]) {
            cards[0].addEventListener('mouseenter', () => {
                if (!isCardUnderButton(cards[0], leftButton)) {
                    leftButton.classList.add('highlight');
                }
            });

            cards[0].addEventListener('mouseleave', () => {
                leftButton.classList.remove('highlight');
            });
        }

        // Effetto hover per la sesta card (se presente)
        if (cards[5]) {
            cards[5].addEventListener('mouseenter', () => {
                if (!isCardUnderButton(cards[5], rightButton)) {
                    rightButton.classList.add('highlight');
                }
            });

            cards[5].addEventListener('mouseleave', () => {
                rightButton.classList.remove('highlight');
            });
        }
    });
});