import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for TextEncoder/TextDecoder in the Jest jsdom environment
// These are minimal shims sufficient for code that expects these globals.
if (typeof (global as unknown as { TextEncoder?: typeof TextEncoder }).TextEncoder === 'undefined') {
  (global as unknown as { TextEncoder?: typeof TextEncoder }).TextEncoder = TextEncoder;
  (global as unknown as { TextDecoder?: typeof TextDecoder }).TextDecoder = TextDecoder;
}

