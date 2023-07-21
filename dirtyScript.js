// https://youtu.be/Lhng-vcKzK8
// https://github.com/cavemutt/Week06-Card-Game-Unit-Tests.git

// ~~~ WARNING : 'DIRTY' VERSION OF CODE BELOW showing how it evolved

// The completed project should, when executed, do the following:

//     Deal 26 Cards to each Player from a Deck of 52 cards.
//     Iterate through the turns where each Player plays a Card.
//     The Player who played the higher card is awarded a point.
//         Ties result in zero points for both Players.
//     After all cards have been played, display the score and declare the winner.
//     Write a Unit Test using Mocha and Chai for at least one of the functions you write.

//  2-player War card game 

// create cards - 1 deck, 52 cards, with 4 suits of 13 ranks, A to K 
// create players that will take turns, playing one card each 
// shuffle and deal 26 cards to each player 
// keep track of points for each round for each player 
// winner has highest score after all cards are played 


const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♥", "♦", "♣", "♠"]

// console.log('app is working')

// I FIRST TRIED TO CREATE THE CARDS AND THE DECK ALL IN ONE CLASS BUT FOUND IT BETTER TO SEPARATE THE TASKS, AND IT STILL SAYS THE SAME ERROR EVEN AFTER CHANGING 

// I TRIED DIFFERENT VERSIONS OF CARDS IN THE UNIT TESTER AND I WILL USE A NEW VERSION OF THIS CLASS IN MY FINAL CODE

class Cards {
    constructor(rank, suit) {
        // this.deck = []
        // this.card = []
        this.rank = rank
        this.suit = suit
        this.points = 0
    }
    // createCard() {
    //     this.card.push(Object.entries(this.rank, this.suit))
    //     console.log('card', this.card)
    //     createDeck()
    //     return this.card
    // }
    // createDeck() {
    //     this.deck.push(this.card)
    //     return this.deck
    // }
    assignPoints() {
        // rank = this.rank;
        switch(this.rank) {
            case 'A':
                this.points = 1;
                break;
            case 'J':
                this.points = 11;
                break;
            case 'Q':
                this.points = 12;
                break;
            case 'K':
                this.points = 13;
                break;
            default:
                this.points = parseInt(this.rank)
        }
    }
}

// class Deck {
//     constructor(cards) {
//         this.cards = cards
//     }
// }

// const card = new Cards("Q", "hearts")

// I CONSOLE.LOG EVERYTHING TO MAKE CHECK WHAT IS AVAILABLE IN EACH CONTEXT/VARIABLE ENVIRONMENT I MIGHT NEED IT IN, AND IT ALSO SHOWS HOW THINGS NEED TO BE ACCESSED  

// I ORIGINALLY CALLED 'THECARDS' JUST 'CARDS' BUT MOCHA DIDN'T LIKE THE REUSE OF 'CARDS' EVEN THOUGH THERE WAS NO COLLISION POSSIBLE

function createCards() {
    let deck = []
    // deck = suits.forEach(suit => {
    // deck = suits.map(suit => {
    deck = suits.flatMap(suit => {
        let theCards = []
        // console.log(suit)
        theCards = ranks.map(rank => new Cards(rank, suit))
        theCards.forEach(card => card.assignPoints())
        // console.log(theCards)
        return theCards
        })
    return deck 
}

// I TRY EVERYTHING OUT AS I GO ALONG TO AVOID LATER FRUSTRATION

// createCards()

// const deck = new Deck()
// const deck = Array.from(createCards())
// console.log('deck', deck)
// console.log('deck', createCards())
const deck = createCards()
console.log('deck', deck)

function shuffleCards(deck) {
    // deck.sort(() => Math.random() * 52)    
    // deck.sort(() => Math.floor(Math.random() * 52))    
    for(let i = 0; i < 30; i++) {
        deck.sort(() => Math.random() - 0.5)
        // deck.forEach(card => card.assignPoints())  
    }
    return deck
}
const shuffled = shuffleCards(deck)
// const shuffle2 = shuffleCards(shuffle1)
// const shuffle3 = shuffleCards(shuffle2)

// I TRIED DIFFERENT WAYS TO SHUFFLE WITHOUT GOING INTO FANCY ALGORITHMS
// I'M A BAD, INEFFICIENT SHUFFLER IN REAL LIFE, SO THAT WAS RELFECTED HERE


console.log('shuffled', shuffled)


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
        // console.log(`${this.name}'s playedCards`, this.playedCards)
        console.log(`${this.name}'s playedCards`, JSON.stringify(this.playedCards))

        return this.currentCard
    }   
}

// ************************************************************************
// THE CONSOLE.LOG FOR THE PLAYEDCARDS ARRAY SHOWS THE CORRECT ARRAY LENGTH AFTER EACH ROUND,
// BUT SHOWS THE FULL HAND OF CARDS WHEN YOU OPEN UP THE ARRAY IN THE CONSOLE 
// I TRIED MOVING IT TO PRINT OUT IN EACH ROUND, DID NOT CHANGE IT :
// PER MDN DOCS, THIS IS BECAUSE :
// "Please be warned that if you log objects in the latest versions of Chrome and Firefox what you get logged on the console is a reference to the object, which is not necessarily the 'value' of the object at the moment in time you call console.log(), but it is the value of the object at the moment you click it open."
// THE 'FIX' IS TO JSON.STRINGIFY IT, HOWEVER, INSTEAD OF A DROPDOWN ARRAY, IT PRINTS OUT EVERY CARD OBJECT, WHICH IS A BIT MUCH FOR OUR PURPOSES 
// I MAY JUST NOT USE THE PLAYED CARDS ARRAY IN THE FINAL CODE OR LEAVE A NOTE TO SEE THIS NOTE
// ************************************************************************

// I TRIED OUT HOW TO DEAL THE CARDS BEFORE IMPLEMENTING IT
// console.log('filter', shuffled.filter((x, i) => i % 2 === 0))

// SINCE THERE WAS NO USER INPUT (boring!) I JUST STATICALLY CREATED TWO PLAYERS
const player1 = new Player('Raoul Duke',shuffled.filter((x, i) => i % 2 === 0))
const player2 = new Player('Dr. Gonzo', shuffled.filter((x, i) => i % 2 !== 0))
console.log('player1', player1)
console.log('player2', player2)
// console.log('player1 turn', player1.takeATurn())

// THE GAME ITSELF WAS EASIEST TO CREATE IN ONE FUNCTION WITH THE POINT-HOLDERS AS GLOBAL VARIABLES
// THOUGH I KNOW IT IS PROBABLY BETTER PRACTICE TO ENCAPSULATE EVERYTHING -- IT IS CURRENTLY WEDNESDAY, I MIGHT REVISIT THIS

// initiate turns, compare cards, assign points, declare winner at end of turns 
let p1Points = player1.totalPoints
let p2Points = player2.totalPoints
// console.log('length', player1.hand.length)
const numberOfTurns = player1.hand.length

// function tallyPoints() {
function playGame() {
    for(let i = 0; i < numberOfTurns; i++) {
        console.log(`${player1.name}'s points before turn ${i + 1} :`, p1Points)
        console.log(`${player2.name}'s points before turn ${i + 1} :`, p2Points)
        let player1Turn = player1.takeATurn()
        let player2Turn = player2.takeATurn()
        console.log(`${player1.name}'s turn`, player1Turn)
        console.log(`${player2.name}'s turn`, player2Turn)
        if(player1Turn.points > player2Turn.points) {
            p1Points++
        } else if (player1Turn.points < player2Turn.points) {
            p2Points++
        }
        console.log(`${player1.name}'s playedCards`, player1.playedCards)

        console.log(`${player1.name}'s points after turn ${i + 1} :`, p1Points)
        console.log(`${player2.name}'s points after turn ${i + 1} :`, p2Points)
    }
    console.log(`${player1.name}'s total points :`, p1Points)
    console.log(`${player2.name}'s total points :`, p2Points)
    if(p1Points > p2Points) {
        console.log(`The Winner is ${player1.name}!`)
    } else if (p1Points < p2Points) {
        console.log(`The Winner is ${player2.name}!`)
    } else {
        console.log(`${player1.name} and ${player2.name} are tied.`)
    }
}
// console.log(`${player1.name}'s total points`, p1Points)
// console.log(`${player2.name}'s total points`, p2Points)

// tallyPoints()
playGame()

// EVERYTHING WORKS, I BELIEVE I MET THE REQUIREMENTS OF THE ASSIGNMENT
// IT DID NOT SPECIFY THAT ONLY OOP WAS TO BE USED, SO I USED OOP AND FP WHERE I THOUGHT APPROPRIATE

// ALL CODE IS ORIGINAL, THE ONLY THINGS I LOOKED UP WERE THE FLATMAP METHOD AND USING RANDOM - 0.5 INSTEAD OF MY FIRST CHOICE RANDOM * NUMBER-OF-ITEMS, IT SEEMS BETTER FOR SHUFFLING

// I COULD REFACTOR THINGS TO BE MORE DYNAMIC, ENCAPSULATED AND WITH SEPARATE COMPONENTS FOR EACH TASK

// I HAVE REFACTORED SOMEWHAT AND PROVIDED A CLEANER VERSION IN A SEPARATE JS FILE

// I FEEL MUCH MORE CONFIDENT WITH JAVASCRIPT AND OOP IN PARTICULAR AFTER THIS EXERCISE 


