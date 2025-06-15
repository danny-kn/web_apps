import { GameView } from "./components/GameView.js";
import { GameLogic } from "./services/GameLogic.js";

/**
 * Initializes the Set card game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  const gameLogic = new GameLogic();
  const gameView = new GameView(gameLogic);
});
