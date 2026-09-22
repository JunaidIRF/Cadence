const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { calculateWPM, calculateAccuracy, formatTime, evaluateChar } = require('../src/logic.js');

describe('Cadence Logic Tests', () => {
  describe('calculateWPM()', () => {
    it('calculates accurate WPM for 60 seconds', () => {
      assert.equal(calculateWPM(250, 60), 50);
    });

    it('calculates accurate WPM for 30 seconds', () => {
      assert.equal(calculateWPM(150, 30), 60);
    });

    it('returns 0 if no characters were typed', () => {
      assert.equal(calculateWPM(0, 30), 0);
    });

    it('returns 0 if elapsed time is zero or negative', () => {
      assert.equal(calculateWPM(100, 0), 0);
      assert.equal(calculateWPM(100, -5), 0);
    });
  });

  describe('calculateAccuracy()', () => {
    it('returns 100% when all typed characters are correct', () => {
      assert.equal(calculateAccuracy(50, 50), 100);
    });

    it('returns 100% when no characters have been typed yet', () => {
      assert.equal(calculateAccuracy(0, 0), 100);
    });

    it('calculates correct percentage with mistakes', () => {
      assert.equal(calculateAccuracy(90, 100), 90);
    });

    it('returns 0% when no characters are correct', () => {
      assert.equal(calculateAccuracy(0, 20), 0);
    });
  });

  describe('formatTime()', () => {
    it('formats 60 seconds as 1:00', () => {
      assert.equal(formatTime(60), '1:00');
    });

    it('formats single-digit seconds with leading zero', () => {
      assert.equal(formatTime(5), '0:05');
      assert.equal(formatTime(65), '1:05');
    });

    it('handles zero seconds', () => {
      assert.equal(formatTime(0), '0:00');
    });

    it('handles negative numbers safely', () => {
      assert.equal(formatTime(-10), '0:00');
    });
  });

  describe('evaluateChar()', () => {
    it('identifies matching characters as correct', () => {
      assert.equal(evaluateChar('a', 'a'), 'correct');
      assert.equal(evaluateChar(' ', ' '), 'correct');
    });

    it('identifies mismatched characters as incorrect', () => {
      assert.equal(evaluateChar('a', 'b'), 'incorrect');
      assert.equal(evaluateChar('{', '('), 'incorrect');
    });

    it('identifies untyped positions', () => {
      assert.equal(evaluateChar('a', undefined), 'untyped');
      assert.equal(evaluateChar('a', null), 'untyped');
    });
  });
});
