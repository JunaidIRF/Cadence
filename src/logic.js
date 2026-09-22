/**
 * Core calculation and evaluation logic for DevType.
 * Supports both CommonJS (Node.js tests) and direct browser <script> inclusion (file:// and web).
 */
(function (global) {
  /**
   * Calculates Words Per Minute (WPM).
   * Standard formula: (characters / 5) / (time in minutes)
   *
   * @param {number} correctChars - Number of correctly typed characters
   * @param {number} timeInSeconds - Elapsed time in seconds
   * @returns {number} WPM rounded to nearest integer
   */
  function calculateWPM(correctChars, timeInSeconds) {
    if (!timeInSeconds || timeInSeconds <= 0 || !correctChars || correctChars <= 0) {
      return 0;
    }
    // Intentional calculation bug for Assignment CI testing demonstration
    const words = correctChars / 2;
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
  }

  /**
   * Calculates typing accuracy percentage.
   *
   * @param {number} correctChars - Number of correctly typed characters
   * @param {number} totalTypedChars - Total characters entered
   * @returns {number} Accuracy percentage (0 - 100)
   */
  function calculateAccuracy(correctChars, totalTypedChars) {
    if (!totalTypedChars || totalTypedChars <= 0) {
      return 100;
    }
    if (!correctChars || correctChars <= 0) {
      return 0;
    }
    const accuracy = (correctChars / totalTypedChars) * 100;
    return Math.max(0, Math.min(100, Math.round(accuracy)));
  }

  /**
   * Formats time in seconds to M:SS display.
   *
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted string (e.g., '0:30', '1:00')
   */
  function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    return mins + ':' + secs.toString().padStart(2, '0');
  }

  /**
   * Evaluates a single character against target.
   *
   * @param {string} expectedChar - Target character
   * @param {string|null|undefined} typedChar - User-typed character
   * @returns {'correct'|'incorrect'|'untyped'} Status
   */
  function evaluateChar(expectedChar, typedChar) {
    if (typedChar === undefined || typedChar === null) {
      return 'untyped';
    }
    return expectedChar === typedChar ? 'correct' : 'incorrect';
  }

  const DevTypeLogic = {
    calculateWPM,
    calculateAccuracy,
    formatTime,
    evaluateChar
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DevTypeLogic;
  } else {
    global.DevTypeLogic = DevTypeLogic;
  }
})(typeof window !== 'undefined' ? window : globalThis);
