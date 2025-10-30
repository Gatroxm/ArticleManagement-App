import '@testing-library/jest-dom';

// Polyfills for TextEncoder/TextDecoder in the Jest jsdom environment
// These are minimal shims sufficient for code that expects these globals.
if (typeof (global as any).TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  (global as any).TextEncoder = TextEncoder;
  (global as any).TextDecoder = TextDecoder;
}

