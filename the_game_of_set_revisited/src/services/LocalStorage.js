/**
 * @typedef {Object} Card
 * @property {number} count - The number of shapes on the card (1-3).
 * @property {string} shape - The shape type (diamond, oval, squiggle).
 * @property {string} shade - The shading style (open, solid, striped).
 * @property {string} color - The color of the shapes (blue, green, red).
 */

/**
 * @typedef {Object} Timer
 * @property {number} initialTime - Timestamp when the timer started.
 * @property {string | null} finalTime - Final formatted time string when game ended.
 * @property {string} currentDisplay - Current timer display string.
 */

/**
 * @typedef {Object} GameState
 * @property {number} score - Current player score.
 * @property {Array<Card>} deck - Current deck of cards.
 * @property {Array<Card>} gameboard - Cards currently on the game board.
 * @property {Timer} timer - Timer state information.
 */

const STORAGE_KEY = "setGameState";

/**
 * Saves the current game state to local storage.
 * 
 * This function serializes the game state and stores it in the browser's
 * local storage for persistence across sessions.
 * 
 * @param {GameState} gameState - The complete game state to save.
 * @throws {Error} If the game state cannot be serialized or stored.
 */
export function saveGame(gameState) {
  try {
    const serializedState = JSON.stringify(gameState);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Failed to save game state:", error);
    throw new Error("Unable to save game progress. Please check your browser's storage settings.");
  }
}

/**
 * Retrieves the saved game state from local storage.
 * 
 * This function attempts to load and parse a previously saved game state.
 * If no saved state exists or if parsing fails, it returns undefined.
 * 
 * @returns {GameState | undefined} The saved game state, or undefined if none exists or loading fails.
 */
export function getGameState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    
    if (savedState === null) {
      return undefined;
    }
    
    const parsedState = JSON.parse(savedState);
    
    if (!isValidGameState(parsedState)) {
      console.warn("Invalid game state format detected, ignoring saved data");
      return undefined;
    }
    
    return parsedState;
  } catch (error) {
    console.error("Failed to load game state:", error);
    return undefined;
  }
}

/**
 * Clears any saved game state from local storage.
 * 
 * This function removes the saved game data, effectively resetting
 * the storage to a clean state.
 */
export function clearSavedGame() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear saved game state:", error);
  }
}

/**
 * Validates that a parsed object has the expected game state structure.
 * 
 * @private
 * @param {any} state - The object to validate.
 * @returns {boolean} True if the object is a valid game state, false otherwise.
 */
function isValidGameState(state) {
  return (
    typeof state === "object" &&
    state !== null &&
    typeof state.score === "number" &&
    Array.isArray(state.deck) &&
    Array.isArray(state.gameboard) &&
    typeof state.timer === "object" &&
    state.timer !== null
  );
}
