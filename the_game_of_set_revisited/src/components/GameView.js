import {
  highlightCard,
  renderCards,
  unhighlightCard,
  updateRemainingCards,
  updateScore,
  toggleDeck,
} from "../utils/domHelpers.js";
import { GameLogic } from "../services/GameLogic.js";
import { getGameState, saveGame } from "../services/LocalStorage.js";

/**
 * @typedef {Object} TimerState
 * @property {number} initialTime - Timestamp when the timer started.
 * @property {string | null} finalTime - Final formatted time when game ended.
 * @property {NodeJS.Timeout | null} interval - Timer interval reference.
 */

/**
 * Manages the user interface and game interactions for the Set card game.
 * 
 * This class handles DOM manipulation, user input, timer functionality,
 * and coordinates between the game logic and visual representation.
 * 
 * @class GameView
 */
export class GameView {
  /**
   * @private
   * @type {GameLogic}
   */
  #gameLogic;

  /**
   * @private
   * @type {Array<number>}
   */
  #currentSet;

  /**
   * @private
   * @type {HTMLElement}
   */
  #gameboardElement;

  /**
   * @private
   * @type {HTMLElement}
   */
  #deckElement;

  /**
   * @private
   * @type {HTMLElement}
   */
  #scoreElement;

  /**
   * @private
   * @type {HTMLElement}
   */
  #remainingCardsElement;

  /**
   * @private
   * @type {HTMLElement}
   */
  #timerElement;

  /**
   * @private
   * @type {HTMLElement}
   */
  #gameOverScreen;

  /**
   * @private
   * @type {HTMLElement}
   */
  #notificationContainer;

  /**
   * @private
   * @type {TimerState}
   */
  #timer;

  /**
   * Creates a new GameView instance and initializes the user interface.
   * 
   * @param {GameLogic} gameLogic - The game logic instance to manage.
   */
  constructor(gameLogic) {
    this.#gameLogic = gameLogic;
    this.#currentSet = [];
    this.#timer = {
      initialTime: 0,
      finalTime: null,
      interval: null
    };

    this.#cacheDOM();
    this.#createNotificationContainer();
    this.#initializeEventListeners();
    this.#cleanup();
    this.#loadGameState();
    
    window.addEventListener("beforeunload", () => this.#saveGameState());
  }

  /**
   * Caches DOM elements for better performance.
   * 
   * @private
   */
  #cacheDOM() {
    this.#gameboardElement = document.getElementById("gameboard");
    this.#deckElement = document.getElementById("deck-container");
    this.#scoreElement = document.getElementById("score");
    this.#remainingCardsElement = document.getElementById("remaining-cards");
    this.#timerElement = document.getElementById("timer");
    this.#gameOverScreen = document.getElementById("game-over");
  }

  /**
   * Creates and configures the notification container.
   * 
   * @private
   */
  #createNotificationContainer() {
    this.#notificationContainer = document.createElement("div");
    this.#notificationContainer.className = "notification-container";
    document.body.appendChild(this.#notificationContainer);
  }

  /**
   * Initializes all event listeners for the game interface.
   * 
   * @private
   */
  #initializeEventListeners() {
    document.getElementById("new-game")
      .addEventListener("click", () => this.newGame());
    
    document.getElementById("draw-three")
      .addEventListener("click", () => this.drawThree());
    
    document.getElementById("check")
      .addEventListener("click", () => this.submitSet());
    
    document.getElementById("play-again")
      .addEventListener("click", () => this.newGame());
    
    document.getElementById("deck-toggle")
      .addEventListener("click", () => toggleDeck(this.#deckElement));

    this.#gameboardElement.addEventListener("click", (event) => {
      const clickedCard = event.target.closest(".card");
      if (clickedCard) {
        this.#handleCardSelection(clickedCard);
      }
    });
  }

  /**
   * Draws three additional cards from the deck to the gameboard.
   */
  drawThree() {
    this.#gameLogic.drawFromDeck();
    this.#updateDisplay();
  }

  /**
   * Handles card selection and deselection logic.
   * 
   * @private
   * @param {HTMLElement} cardElement - The clicked card element
   */
  #handleCardSelection(cardElement) {
    const index = Array.from(cardElement.parentNode.children).indexOf(cardElement);

    if (this.#currentSet.includes(index)) {
      this.#currentSet = this.#currentSet.filter((i) => i !== index);
      unhighlightCard(cardElement);
    } else if (this.#currentSet.length < 3) {
      this.#currentSet.push(index);
      highlightCard(cardElement);
    } else {
      this.#showNotification("You can only select 3 cards at a time.", "warning");
    }
  }

  /**
   * Submits the currently selected cards as a set for validation.
   */
  submitSet() {
    if (this.#currentSet.length !== 3) {
      this.#showNotification("Please select exactly 3 cards to form a set.", "warning");
      return;
    }

    const isValid = this.#gameLogic.submitSet(
      this.#currentSet[0],
      this.#currentSet[1],
      this.#currentSet[2]
    );

    if (!isValid) {
      this.#showNotification("The selected cards do not form a valid set.", "error");
      return;
    }

    this.#unselectAllCards();
    this.#updateDisplay();
  }

  /**
   * Unselects all currently selected cards.
   * 
   * @private
   */
  #unselectAllCards() {
    this.#currentSet.forEach((cardIndex) => {
      unhighlightCard(this.#gameboardElement.children[cardIndex]);
    });
    this.#currentSet = [];
  }

  /**
   * Updates all visual elements of the game interface.
   * 
   * @private
   */
  #updateDisplay() {
    if (this.#gameLogic.isOver()) {
      this.#stopTimer();
      this.#showGameOverScreen();
    }

    renderCards(this.#gameLogic.getDeck(), this.#deckElement, true);
    renderCards(this.#gameLogic.getGameboard(), this.#gameboardElement);
    updateScore(this.#gameLogic.getScore());
    updateRemainingCards(this.#gameLogic.getRemaining());
  }

  /**
   * Shows the game over screen.
   * 
   * @private
   */
  #showGameOverScreen() {
    this.#gameOverScreen.classList.add("game-over-container-visible");
  }

  /**
   * Starts the game timer.
   * 
   * @private
   */
  #startTimer() {
    this.#cleanup();

    this.#timer.initialTime = Date.now();
    this.#timer.finalTime = null;
    this.#timerElement.innerHTML = "00:00:00";
    this.#timerElement.style.color = "var(--accent-color)";

    this.#timer.interval = setInterval(() => {
      if (this.#timer.finalTime === null) {
        const currentTime = Date.now();
        const totalTime = currentTime - this.#timer.initialTime;
        const timeString = this.#formatTime(totalTime);
        this.#timerElement.innerHTML = timeString;
      } else {
        this.#timerElement.innerHTML = this.#timer.finalTime;
        this.#timerElement.style.color = "var(--red)";
      }
    }, 1000);
  }

  /**
   * Stops the game timer.
   * 
   * @private
   */
  #stopTimer() {
    if (this.#timer.interval) {
      clearInterval(this.#timer.interval);
      this.#timer.interval = null;
    }
    this.#timer.finalTime = this.#timerElement.innerHTML;
    this.#timerElement.style.color = "var(--red)";
  }

  /**
   * Formats milliseconds into HH:MM:SS format.
   * 
   * @private
   * @param {number} milliseconds - Time in milliseconds.
   * @returns {string} Formatted time string.
   */
  #formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours.toString().padStart(2, "0")}:${(minutes % 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  }

  /**
   * Starts a new game, resetting all game state and UI elements.
   */
  newGame() {
    this.#gameLogic.newGame();
    this.#currentSet = [];
    this.#updateDisplay();
    this.#startTimer();
    this.#gameOverScreen.classList.remove("game-over-container-visible");
  }

  /**
   * Cleans up timer resources to prevent memory leaks.
   * 
   * @private
   */
  #cleanup() {
    if (this.#timer.interval) {
      clearInterval(this.#timer.interval);
      this.#timer.interval = null;
    }
  }

  /**
   * Displays a notification message to the user.
   * 
   * @private
   * @param {string} message - The message to display.
   * @param {string} type - The notification type (info, warning, error).
   */
  #showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    this.#notificationContainer.appendChild(notification);
    notification.style.animation = "slideIn 0.5s ease-out";

    setTimeout(() => {
      notification.style.animation = "slideOut 0.5s ease-in";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  /**
   * Saves the current game state to local storage.
   * 
   * @private
   */
  #saveGameState() {
    saveGame({
      score: this.#gameLogic.getScore(),
      deck: this.#gameLogic.getDeck(),
      gameboard: this.#gameLogic.getGameboard(),
      timer: {
        initialTime: this.#timer.initialTime,
        finalTime: this.#timer.finalTime,
        currentDisplay: this.#timerElement.innerHTML,
      },
    });
  }

  /**
   * Loads a previously saved game state from local storage.
   * 
   * @private
   */
  #loadGameState() {
    const state = getGameState();
    if (state !== undefined) {
      this.#gameLogic.restoreGameState(state.score, state.deck, state.gameboard);
      this.#timer.initialTime = state.timer.initialTime;
      this.#timer.finalTime = state.timer.finalTime;
      this.#timerElement.innerHTML = state.timer.currentDisplay;
      this.#updateDisplay();
    } else {
      this.newGame();
    }
  }
}
