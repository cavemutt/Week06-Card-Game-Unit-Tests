// CLEANED-UP AND IMPROVED JS FILE

// CREATE ARRAYS FOR CARD RANKS AND SUITS
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["♥", "♦", "♣", "♠"];

// CREATE CLASS FOR CARDS
class Cards {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.cardPoints = this.assignPoints();
    }

    assignPoints() {
        switch(this.rank) {
            case 'A':
                this.cardPoints = 1;
                break;
            case 'J':
                this.cardPoints = 11;
                break;
            case 'Q':
                this.cardPoints = 12;
                break;
            case 'K':
                this.cardPoints = 13;
                break;
            default:
                this.cardPoints = parseInt(this.rank);
        }
        return this.cardPoints;
    }
}

// CREATE CLASS FOR PLAYERS
class Player {
    constructor(name, hand) {
        this.name = name;
        this.hand = hand;
        this.currentCard = [];
        this.playedCards = [];
        this.totalPoints = 0;
    }
    
    takeATurn() {
        this.currentCard = []
        this.currentCard = this.hand.pop()
        this.playedCards.push(this.currentCard)
        return this.currentCard
    }   
}
// **PLEASE SEE NOTES ABOUT THE WEIRD PLAYEDCARDS ARRAY CONSOLE.LOG ISSUE IN THE DIRTYSCRIPT.JS FILE** 

// CREATE A FUNCTION TO CREATE THE CARDS
function createCards() {
    let deck = [];
    deck = suits.flatMap(suit => {
        let theCards = [];
        theCards = ranks.map(rank => new Cards(rank, suit))
        return theCards
        })
    return deck 
}
// PUT THE CARDS INTO A DECK
const deck = createCards()
console.log('deck created :', deck)

// CREATE A FUNCTION TO SHUFFLE THE DECK OF CARDS
function shuffleCards(deck) {
    for(let i = 0; i < 30; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
    return deck
}
const shuffled = shuffleCards(deck)
console.log('shuffled deck :', shuffled)

// CREATE TWO PLAYERS AND DEAL EACH A HAND OF 26 CARDS, EVERY OTHER CARD FROM THE SHUFFLED DECK
const player1 = new Player('Raoul Duke',shuffled.filter((x, i) => i % 2 === 0))
const player2 = new Player('Dr. Gonzo', shuffled.filter((x, i) => i % 2 !== 0))

// GET READY TO PLAY THE GAME
function playGame() {
    const players = [player1, player2]
    const numberOfTurns = player1.hand.length

    for(let i = 0; i < numberOfTurns; i++) {

// SHOW POINTS BEFORE EACH ROUND
        console.log('%c' + `~~~~~~~~~~~~ Round ${i + 1} ~~~~~~~~~~~~`, "color: cadetBlue; font-weight: bold; font-size: 12px; font-family: Verdana, sans-serif;")
        players.forEach(player => {
            console.log('%c' + `${player.name}'s points before round ${i + 1} : ` + player.totalPoints, "color: goldenrod; font-size: 10px; font-family: Verdana, sans-serif;")
        })

// EACH PLAYER TAKES A TURN
        let player1Turn = player1.takeATurn()
        console.log(`${player1.name}'s turn`, player1Turn)
        console.log(`${player1.name}'s playedCards`, player1.playedCards)
        
        let player2Turn = player2.takeATurn()
        console.log(`${player2.name}'s turn`, player2Turn)
        console.log(`${player2.name}'s playedCards`, player2.playedCards)

// THE WINNER OF EACH TURN RECEIVES A POINT, NO POINTS IF A TIE
        player1Turn.cardPoints > player2Turn.cardPoints ? player1.totalPoints++ : player1Turn.cardPoints < player2Turn.cardPoints ? player2.totalPoints++ : console.log('%c' + '~~ tied round, no points given ~~', "color: cornsilk; font-size: 10px; font-family: Verdana, sans-serif; font-style: italic;")

// SHOW POINTS AFTER EACH ROUND
        players.forEach(player => {
            console.log('%c' + `${player.name}'s points after round ${i + 1} :` + player.totalPoints, "color: goldenrod; font-size: 12px; font-family: Verdana, sans-serif;")
        })
    }
// SHOW PLAYERS' TOTAL POINTS
    console.log("%c" + '--------- Player Totals ---------', "color: cadetBlue; font-size: 12px; font-weight: bold;")
    players.forEach(player => {
        console.log('%c' + `${player.name}'s total points :  ` + player.totalPoints, "color: greenYellow; font-size: 14px; font-family: Verdana, sans-serif;")
    })
    console.log("%c" + '---------------------------------', "color: cadetBlue; font-size: 12px; font-weight: bold;")
// DECLARE THE WINNER OR THE TIED GAME   
    console.log("%c" + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', "color: beige; font-size: 12px; font-weight: bold;")
    if(player1.totalPoints > player2.totalPoints) {
        console.log('%c' + '   The Winner is ' + '%c' + `${player1.name}!`, "color: darkTurquoise; font-weight: bold; font-size: 18px; font-style: italic", "color: gold; font-weight: bold; font-size: 18px; font-family: Verdana, sans-serif;")
    } else if (player1.totalPoints < player2.totalPoints) {
        console.log('%c' + '   The Winner is ' + '%c' + `${player2.name}!`, "color: darkTurquoise; font-weight: bold; font-size: 18px; font-style: italic", "color: greenYellow; font-weight: bold; font-size: 18px; font-family: Verdana, sans-serif;")
    } else {
        console.log('%c' + `${player1.name} and ${player2.name} are tied.`, "color: darkTurquoise; font-weight: bold; font-size: 16px; font-family: Verdana, sans-serif; font-style: italic;")
    }
    console.log("%c" + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', "color: beige; font-size: 12px; font-weight: bold;")
}
// PLAY THE GAME
playGame()

// THE END 
