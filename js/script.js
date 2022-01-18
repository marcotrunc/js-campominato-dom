console.log('JS Ok')
/*L'utente indica un livello di difficoltà in base al quale 
viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range 
della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati 
- abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare 
a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o 
raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, 
il software scopre tutte le bombe nascoste
2- quando si clicca su una bomba e finisce la partita, 
evitare che si possa cliccare su altre celle */

// ! Funzioni già presenti
// ** Funzione che genera la cella
function generateCell(cellInRow, i) {
    const newElement = document.createElement('div');
    const number = i + 1;
    newElement.classList.add('cell');
    newElement.innerHTML = `<span>${number}</span>`;

    // Style
    newElement.style.width = `calc(100% / ${cellInRow} )`;
    newElement.style.height = `calc(100% / ${cellInRow})`;
    return newElement;
}

//** Funzione che mi permette di ricavare le celle per riga
function getLevel(levelValue) {
    if (levelValue === 'first-level') {
        return 10;
    } else if (levelValue === 'second-level') {
        return 9;
    } else {
        return 7;
    }
}
// ** Funzione che mi genera un numero casuale
const getrandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// ! Funzione principale del gioco
const play = () => {
    // Cambio testo al bottone
    button.innerText = 'Ricomincia';
    //   Reset griglia
    grid.innerHTML = '';
    //  Acquisisco dati
    const level = levelField.value;
    console.log(`Il livello selezionato è:${level}`);
    //  Associo al livello un numero di celle per riga
    const elementForRow = getLevel(level);
    console.log(getLevel(level));
    //  Numero di celle
    const numberOfElement = elementForRow * elementForRow;
    console.log(numberOfElement);
    // Variabile per contare i punti
    let attemps = 0;
    // Dato: numero delle bombe
    const TOTAL_BOMBS = 16;
    // Celle safe
    const MAX_ATTEMPTS = numberOfElement - TOTAL_BOMBS;
    //! Funzione che mi crea un array di 16 numeri casuali
    const generateBombs = (totalBombs, numberOfElement) => {
        const bombs = [];
        while (bombs.length < totalBombs) {
            const randomNumber = getrandomNumber(1, numberOfElement);
            if (!bombs.includes(randomNumber)) {
                bombs.push(randomNumber);
            }
        }
        return bombs
    }
    const bombs = generateBombs(TOTAL_BOMBS, numberOfElement);
    // ! Funzione che mi genera un gameover sia in caso di vittoria che di sconfitta
    const gameOver = (bombs, points, isVictory) => {
        let message;
        const messageElement = document.createElement('h2');
        messageElement.className = 'message';
        if (isVictory) {
            message = 'Hai vinto';
        } else {
            message = `Hai perso!, Il tuo punteggio è:${points}`;
        }

        const cellsElement = document.querySelectorAll('.cell');
        for (let i = 0; i < cellsElement.length; i++) {
            const newElement = cellsElement[i];
            const cellNumber = parseInt(newElement.innerText);
            newElement.removeEventListener('click', onCellClick);
            if (bombs.includes(cellNumber)) {
                // Diamo il colore red alle bombe
                newElement.classList.add('bomb');
            }
        }
    }
    //! Funzione che mi definisce cosa succede al click
    const onCellClick = (clickedCell, bombs, number) => {
        // Rimuovo l'eventListener
        clickedCell.removeEventListener('click', onclick);

        if (bombs.includes(number)) {
            // TODO di sconfitta

            gameOver(bombs, attemps, false)
        } else {
            clickedCell.classList.add('safe');
            attemps += 1;
            if (attemps === MAX_ATTEMPTS) {
                // TODO game over di vittoria
                gameOver(bombs, attemps, true)
            }
        }

    }
    //  Costruzione griglia
    for (let i = 0; i < numberOfElement; i++) {
        const newElement = generateCell(elementForRow, i);

        newElement.addEventListener('click', event => onCellClick(event.target, bombs, i));

        grid.appendChild(newElement);
    }
}
// !------------------------------------------------------

// ? Prendo elementi dal Dom
const levelField = document.getElementById('level-select');
const grid = document.getElementById('grid');
const button = document.getElementById('button');

// !----------------------------------------
// ! PROGRAMMA PRINCIPALE
// !----------------------------------------

button.addEventListener('click', play);

