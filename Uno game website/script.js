let players = [];
let deck = [];
let discardPile = [];
let currentPlayer = 0;

// CREATE UNO DECK (108 cards)
function createDeck() {
    let colors = ["red", "green", "blue", "yellow"];

    deck = [];

    colors.forEach(color => {
        deck.push({ color, value: 0 });

        for (let i = 1; i <= 9; i++) {
            deck.push({ color, value: i });
            deck.push({ color, value: i });
        }

        ["Skip", "Reverse", "+2"].forEach(action => {
            deck.push({ color, value: action });
            deck.push({ color, value: action });
        });
    });

    for (let i = 0; i < 4; i++) {
        deck.push({ color: "black", value: "Wild" });
        deck.push({ color: "black", value: "+4" });
    }
}

// SHUFFLE
function shuffleDeck() {
    deck.sort(() => Math.random() - 0.5);
}

// START GAME
function startGame() {
    let count = document.getElementById("playerCount").value;

    createDeck();
    shuffleDeck();

    players = [];

    for (let i = 0; i < count; i++) {
        let hand = deck.splice(0, 5);
        players.push(hand);
    }

    discardPile.push(deck.pop());

    render();
}

// RENDER
function render() {
    document.getElementById("discard").innerText =
        discardPile[discardPile.length - 1].value;

    document.getElementById("turn").innerText =
        "Player " + (currentPlayer + 1) + " Turn";

    let playersDiv = document.getElementById("players");
    playersDiv.innerHTML = "";

    players.forEach((hand, index) => {
        let div = document.createElement("div");
        div.className = "player";

        div.innerHTML = `<h3>Player ${index + 1}</h3>`;

        let cardsDiv = document.createElement("div");
        cardsDiv.className = "cards";

        hand.forEach((card, i) => {
            let c = document.createElement("div");
            c.className = "card " + card.color;
        c.innerHTML = `<span>${card.value}</span>`;

            if (index === currentPlayer) {
                c.onclick = () => playCard(i);
            }

            cardsDiv.appendChild(c);
        });

        div.appendChild(cardsDiv);
        playersDiv.appendChild(div);
    });
}

// PLAY CARD
function playCard(index) {
    let card = players[currentPlayer][index];
    let top = discardPile[discardPile.length - 1];

    if (card.color === top.color || card.value === top.value || card.color === "black") {
        discardPile.push(card);
        players[currentPlayer].splice(index, 1);

        nextTurn();
    } else {
        alert("Invalid move!");
    }

    render();
}

// DRAW CARD
function drawCard() {
    players[currentPlayer].push(deck.pop());
    nextTurn();
    render();
}

// NEXT TURN
function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
}