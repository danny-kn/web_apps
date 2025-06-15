/**
 * @fileoverview Card type definitions and constants for the Set card game.
 */

/**
 * @typedef {Object} Card
 * @property {number} count - The number of shapes on the card (1-3).
 * @property {string} shape - The shape type (diamond, oval, squiggle).
 * @property {string} shade - The shading style (open, solid, striped).
 * @property {string} color - The color of the shapes (blue, green, red).
 */

/**
 * Valid card attribute values.
 */
export const CARD_ATTRIBUTES = Object.freeze({
  COUNTS: [1, 2, 3],
  SHAPES: ["diamond", "oval", "squiggle"],
  SHADES: ["open", "solid", "striped"],
  COLORS: ["blue", "green", "red"]
});

/**
 * Total number of unique cards in a complete Set deck.
 */
export const TOTAL_CARDS = 81;

/**
 * Standard number of cards dealt to the gameboard initially.
 */
export const INITIAL_CARDS = 12;

/**
 * Number of cards drawn when adding more to the gameboard.
 */
export const DRAW_COUNT = 3;
