import { isValidSet } from "../utils/setValidator.js";
import { CARD_ATTRIBUTES, INITIAL_CARDS, DRAW_COUNT } from "../types/Card.js";

const { COUNTS, SHAPES, SHADES, COLORS } = CARD_ATTRIBUTES;

/**
 * @typedef {Object} Card
 * @property {number} count - The number of shapes on the card (1-3).
 * @property {string} shape - The shape type (diamond, oval, squiggle).
 * @property {string} shade - The shading style (open, solid, striped).
 * @property {string} color - The color of the shapes (blue, green, red).
 */

/**
 * Manages game logic and state for the Set card game.
 * 
 * The Set card game consists of 81 unique cards, each with four attributes:
 * count (1-3), shape, shade, and color. A valid set consists of three cards
 * where each attribute is either all the same or all different across the three cards.
 * 
 * @class GameLogic
 */
export class GameLogic {
  /**
   * @private
   * @type {Array<[number, number, number]>}
   */
  #foundSets;

  /**
   * @private
   * @type {number}
   */
  #score;

  /**
   * @private
   * @type {Array<Card>}
   */
  #deck;

  /**
   * @private
   * @type {Array<Card>}
   */
  #gameboard;

  /**
   * Creates a new GameLogic instance and initializes a new game.
   */
  constructor() {
    this.newGame();
  }

  /**
   * Restores the game state from saved data.
   * 
   * @param {number} score - The saved score.
   * @param {Array<Card>} deck - The saved deck state.
   * @param {Array<Card>} gameboard - The saved gameboard state.
   */
  restoreGameState(score, deck, gameboard) {
    this.#score = score;
    this.#deck = deck;
    this.#gameboard = gameboard;
  }

  /**
   * Initializes a new game by resetting all game state and dealing initial cards.
   */
  newGame() {
    this.#score = 0;
    this.#deck = [];
    this.#gameboard = [];
    this.#foundSets = [];
    this.#initializeDeck();
    this.#dealCards();
  }

  /**
   * Returns a copy of the current deck.
   * 
   * @returns {Array<Card>} The current deck of cards.
   */
  getDeck() {
    return [...this.#deck];
  }

  /**
   * Returns a copy of the current gameboard.
   * 
   * @returns {Array<Card>} The current gameboard cards.
   */
  getGameboard() {
    return [...this.#gameboard];
  }

  /**
   * Returns the current score.
   * 
   * @returns {number} The current game score.
   */
  getScore() {
    return this.#score;
  }

  /**
   * Returns the number of cards remaining in the deck.
   * 
   * @returns {number} The number of cards left in the deck.
   */
  getRemaining() {
    return this.#deck.length;
  }

  /**
   * Submits a set of three cards for validation and processes the result.
   * 
   * @param {number} cardIndex1 - Index of the first card in the gameboard.
   * @param {number} cardIndex2 - Index of the second card in the gameboard.
   * @param {number} cardIndex3 - Index of the third card in the gameboard.
   * @returns {boolean} True if the set is valid, false otherwise.
   * @throws {Error} If any card index is invalid or out of bounds.
   */
  submitSet(cardIndex1, cardIndex2, cardIndex3) {
    if (cardIndex1 === undefined || cardIndex2 === undefined || cardIndex3 === undefined) {
      throw new Error("Invalid card indices provided");
    }

    if (!this.#gameboard[cardIndex1] || !this.#gameboard[cardIndex2] || !this.#gameboard[cardIndex3]) {
      throw new Error("Card index out of bounds");
    }

    const isValid = isValidSet(
      this.#gameboard[cardIndex1],
      this.#gameboard[cardIndex2],
      this.#gameboard[cardIndex3]
    );

    if (isValid) {
      this.#score++;
      this.#foundSets.push([cardIndex1, cardIndex2, cardIndex3]);
      this.#removeCards([cardIndex1, cardIndex2, cardIndex3]);
      
      if (this.#deck.length > 0) {
        this.drawFromDeck();
      }
    }

    return isValid;
  }

  /**
   * Checks if the game is over.
   * 
   * @returns {boolean} True if the game is over, false otherwise.
   */
  isOver() {
    return this.#gameboard.length === 0 || !this.#hasValidSetsRemaining();
  }

  /**
   * Draws up to three additional cards from the deck to the gameboard.
   */
  drawFromDeck() {
    const drawCount = Math.min(DRAW_COUNT, this.#deck.length);

    for (let i = 0; i < drawCount; i++) {
      const newCard = this.#deck.pop();
      this.#gameboard.push(newCard);
    }
  }

  /**
   * Finds and returns a valid set in the current gameboard.
   * 
   * @returns {[Card, Card, Card] | undefined} A valid set of three cards, or undefined if none exists.
   */
  findSetInGameboard() {
    for (const card1 of this.#gameboard) {
      for (const card2 of this.#gameboard) {
        for (const card3 of this.#gameboard) {
          if (isValidSet(card1, card2, card3)) {
            return [card1, card2, card3];
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Returns cards that can be used as a hint for the player.
   * 
   * @throws {Error} Always throws as this feature is not yet implemented.
   */
  getCardsForHint() {
    throw new Error("Hint feature not implemented");
  }

  /**
   * Checks if there are any valid sets remaining in the game.
   * 
   * @private
   * @returns {boolean} True if valid sets remain, false otherwise.
   */
  #hasValidSetsRemaining() {
    if (this.#gameboard.length + this.#deck.length > 20) {
      return true;
    }
    return this.findSetInGameboard() !== undefined;
  }

  /**
   * Creates a complete deck of 81 unique cards and shuffles it.
   * 
   * @private
   */
  #initializeDeck() {
    this.#deck = [];
    this.#gameboard = [];

    COUNTS.forEach((count) => {
      SHAPES.forEach((shape) => {
        SHADES.forEach((shade) => {
          COLORS.forEach((color) => {
            this.#deck.push({ count, shape, shade, color });
          });
        });
      });
    });

    this.#shuffleDeck();
  }

  /**
   * Deals initial cards to the gameboard (up to 12 cards).
   * 
   * @private
   */
  #dealCards() {
    while (this.#deck.length > 0 && this.#gameboard.length < INITIAL_CARDS) {
      const newCard = this.#deck.pop();
      this.#gameboard.push(newCard);
    }
  }

  /**
   * Removes specific cards from the gameboard by their indices.
   * 
   * @private
   * @param {Array<number>} removeIndexList - Array of indices to remove.
   */
  #removeCards(removeIndexList) {
    const sortedIndices = [...removeIndexList].sort((a, b) => b - a);
    
    sortedIndices.forEach((index) => {
      this.#gameboard.splice(index, 1);
    });
  }

  /**
   * Shuffles the deck using the Fisher-Yates algorithm.
   * src: https://stackoverflow.com/a/2450976/23078659
   * 
   * @private
   */
  #shuffleDeck() {
    let currentIndex = this.#deck.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.#deck[currentIndex], this.#deck[randomIndex]] = [
        this.#deck[randomIndex],
        this.#deck[currentIndex],
      ];
    }
  }
}
