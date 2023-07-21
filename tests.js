const expect = chai.expect
const assert = chai.assert


describe('Week 06 Final Unit Project : War Card Game - Example', () => {
    describe('EXAMPLE TEST - description of function being tested', () => {
        it('should do this certain task', () => {
            function putFunctionHere() {
                console.log('tests working')
            }

            expect(putFunctionHere()).to.equal(console.log('tests working'))
        })
    })
    describe('fail of same function being tested', () => {
        it('should fail', () => {
            function putFunctionHere() {
                console.lg('tests working')
            }

            expect(putFunctionHere()).to.equal(console.log('tests working'))
        })
    })
}) 

describe('Week 06 Final Unit Project : War Card Game - Test 1', () => {
    describe('testing shuffleCards function', () => {
        it('should return a deck of 52 cards', () => {
            function shuffleCards(deck) {
               for(let i = 0; i < 30; i++) {
                    deck.sort(() => Math.random() - 0.5)
                }
                return deck.length
            }

            expect(shuffleCards(deck)).to.equal(52)
        })
    })
    describe('fail of same function being tested', () => {
        it('should fail', () => {
            function shuffleCards(deck) {
                for(let i = 0; i < 30; i++) {
                     deck.sort(() => Math.random() - 0.5)
                 }
                 return deck
             }
 
             expect(shuffleCards(deck)).to.equal(52)        })
    })
}) 

// ** UNIT TESTING HELPED IMPROVE MY CODE HERE **
// I STARTED WTIH THE ORIGINAL CLASS CARDS THEN TRIED IT WITH ASSIGNING POINTS RIGHT IN THE CONSTRUCTOR, SAW THAT IT WORKED AND WILL USE THAT IN THE FINAL VERSION OF THE CODE
describe('Week 06 Final Unit Project : War Card Game - Test 2', () => {
    describe('testing Cards class', () => {
        it('should return a new instance of Cards', () => {
            class Cards {
                constructor(rank, suit) {
                    this.rank = rank
                    this.suit = suit
                    this.points = 0
                }
                assignPoints() {
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
            const newCard = new Cards('Q', "♥")

            expect(newCard).to.deep.equal({ rank: 'Q', suit: "♥", points: 0 })
        })
    })
    describe('testing Cards class with improved code', () => {
        it('should return a new instance of Cards WITH points assigned right away', () => {
            class Cards {
                constructor(rank, suit) {
                    this.rank = rank
                    this.suit = suit
                    this.points = this.assignPoints()
                }
                assignPoints() {
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
                    return this.points
                }
            }
            const newCard = new Cards('Q', "♥")

            expect(newCard).to.deep.equal({ rank: 'Q', suit: "♥", points: 12 })
        })
    })
    describe('fail of same function being tested', () => {
        it('should fail', () => {
            class Cards {
                constructor(rank, suit) {
                    this.rank = rank
                    this.suit = suit
                    this.points = this.assignPoints()
                }
                assignPoints() {
                    switch(rank) {
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
                            this.points = parseInt(rank)
                    }
                }
            }
            const newCard = new Cards('Q', "♥")

            expect(newCard).to.deep.equal({ rank: 'Q', suit: "♥", points: 0 })
        })
    })
}) 

