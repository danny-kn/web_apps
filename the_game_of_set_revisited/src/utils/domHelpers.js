/**
 * @typedef {Object} Card
 * @property {number} count - The number of shapes on the card (1-3).
 * @property {string} shape - The shape type (diamond, oval, squiggle).
 * @property {string} shade - The shading style (open, solid, striped).
 * @property {string} color - The color of the shapes (blue, green, red).
 */

/**
 * Renders an array of cards to a specified DOM container.
 * 
 * This function creates visual representations of cards by generating
 * div elements with appropriate styling and image elements for each card.
 * 
 * @param {Array<Card>} cards - Array of card objects to render.
 * @param {HTMLElement} parentElement - DOM element to render cards into.
 * @param {boolean} [mini=false] - Whether to render cards in mini size for deck display.
 * @throws {Error} If parentElement is not a valid DOM element.
 */
export function renderCards(cards, parentElement, mini = false) {
  if (!parentElement || typeof parentElement.appendChild !== "function") {
    throw new Error("Invalid parent element provided for card rendering");
  }

  parentElement.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = createCardElement(card, mini);
    parentElement.appendChild(cardElement);
  });
}

/**
 * Creates a single card DOM element with appropriate styling and images.
 * 
 * @private
 * @param {Card} card - The card object to create an element for.
 * @param {boolean} mini - Whether to create a mini-sized card.
 * @returns {HTMLElement} The created card element.
 */
function createCardElement(card, mini) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  if (mini) {
    cardDiv.classList.add("mini");
  }

  const baseImage = createCardImage(card);
  
  for (let i = 0; i < card.count; i++) {
    const imageClone = baseImage.cloneNode(true);
    cardDiv.appendChild(imageClone);
  }

  return cardDiv;
}

/**
 * Creates an image element for a card with the appropriate sprite source.
 * 
 * @private
 * @param {Card} card - The card object to create an image for.
 * @returns {HTMLImageElement} The created image element.
 */
function createCardImage(card) {
  const image = document.createElement("img");
  image.src = `sprites/${card.shape}_${card.shade}_${card.color}.png`;
  image.alt = `${card.count} ${card.shade} ${card.color} ${card.shape}${card.count > 1 ? 's' : ''}`;
  return image;
}

/**
 * Toggles the visibility of the deck display container.
 * 
 * @param {HTMLElement} deckElement - The deck container element.
 * @throws {Error} If deckElement is not a valid DOM element.
 */
export function toggleDeck(deckElement) {
  if (!deckElement || typeof deckElement.style === "undefined") {
    throw new Error("Invalid deck element provided");
  }

  const isHidden = deckElement.style.display === "none" || deckElement.style.display === "";
  deckElement.style.display = isHidden ? "grid" : "none";
}

/**
 * Updates the score display in the DOM.
 * 
 * @param {number} score - The current game score to display.
 * @throws {Error} If score is not a number or score element is not found.
 */
export function updateScore(score) {
  if (typeof score !== "number" || !Number.isInteger(score) || score < 0) {
    throw new Error("Score must be a non-negative integer");
  }

  const scoreElement = document.getElementById("score");
  if (!scoreElement) {
    throw new Error("Score display element not found");
  }

  scoreElement.textContent = score.toString();
}

/**
 * Updates the remaining cards count display in the DOM.
 * 
 * @param {number} count - The number of cards remaining in the deck.
 * @throws {Error} If count is not a number or remaining cards element is not found.
 */
export function updateRemainingCards(count) {
  if (typeof count !== "number" || !Number.isInteger(count) || count < 0) {
    throw new Error("Card count must be a non-negative integer");
  }

  const remainingElement = document.getElementById("remaining-cards");
  if (!remainingElement) {
    throw new Error("Remaining cards display element not found");
  }

  remainingElement.textContent = `Cards still in deck: ${count}`;
}

/**
 * Adds visual highlight styling to a selected card element.
 * 
 * @param {HTMLElement} cardElement - The card element to highlight.
 * @throws {Error} If cardElement is not a valid DOM element.
 */
export function highlightCard(cardElement) {
  if (!cardElement || typeof cardElement.classList === "undefined") {
    throw new Error("Invalid card element provided for highlighting");
  }

  cardElement.classList.add("selected");
}

/**
 * Removes visual highlight styling from a card element.
 * 
 * @param {HTMLElement} cardElement - The card element to unhighlight.
 * @throws {Error} If cardElement is not a valid DOM element.
 */
export function unhighlightCard(cardElement) {
  if (!cardElement || typeof cardElement.classList === "undefined") {
    throw new Error("Invalid card element provided for unhighlighting");
  }

  cardElement.classList.remove("selected");
}

/**
 * Updates the timer display element with a formatted time string.
 * 
 * @param {HTMLElement} timerElement - The timer element to update.
 * @param {string} timeString - The formatted time string to display.
 * @throws {Error} If timerElement is not a valid DOM element or timeString is not a string.
 */
export function updateTimer(timerElement, timeString) {
  if (!timerElement || typeof timerElement.innerHTML === "undefined") {
    throw new Error("Invalid timer element provided");
  }

  if (typeof timeString !== "string") {
    throw new Error("Time string must be a string");
  }

  timerElement.innerHTML = timeString;
}
