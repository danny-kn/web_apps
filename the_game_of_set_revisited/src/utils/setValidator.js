/**
 * @typedef {Object} Card
 * @property {number} count - The number of shapes on the card (1-3).
 * @property {string} shape - The shape type (diamond, oval, squiggle).
 * @property {string} shade - The shading style (open, solid, striped).
 * @property {string} color - The color of the shapes (blue, green, red).
 */

/**
 * Determines if three cards form a valid set according to Set game rules.
 * 
 * A valid set requires that for each attribute (count, shape, shade, color),
 * the three cards must either all have the same value or all have different values.
 * 
 * @param {Card} card1 - The first card.
 * @param {Card} card2 - The second card.
 * @param {Card} card3 - The third card.
 * @returns {boolean} True if the three cards form a valid set, false otherwise.
 */
export function isValidSet(card1, card2, card3) {
  return (
    isValidAttribute(card1.count, card2.count, card3.count) &&
    isValidAttribute(card1.shape, card2.shape, card3.shape) &&
    isValidAttribute(card1.shade, card2.shade, card3.shade) &&
    isValidAttribute(card1.color, card2.color, card3.color)
  );
}

/**
 * Checks if three attribute values form a valid set pattern.
 * 
 * A valid pattern means all three values are either identical or all different.
 * 
 * @param {string | number} value1 - First attribute value.
 * @param {string | number} value2 - Second attribute value.
 * @param {string | number} value3 - Third attribute value.
 * @returns {boolean} True if the values form a valid pattern, false otherwise.
 */
function isValidAttribute(value1, value2, value3) {
  return areAllSame(value1, value2, value3) || areAllDifferent(value1, value2, value3);
}

/**
 * Checks if all three values are identical.
 * 
 * @param {string | number} value1 - First value.
 * @param {string | number} value2 - Second value.
 * @param {string | number} value3 - Third value.
 * @returns {boolean} True if all values are the same, false otherwise.
 */
function areAllSame(value1, value2, value3) {
  return value1 === value2 && value2 === value3;
}

/**
 * Checks if all three values are different from each other.
 * 
 * @param {string | number} value1 - First value.
 * @param {string | number} value2 - Second value.
 * @param {string | number} value3 - Third value.
 * @returns {boolean} True if all values are different, false otherwise.
 */
function areAllDifferent(value1, value2, value3) {
  return value1 !== value2 && value2 !== value3 && value1 !== value3;
}
