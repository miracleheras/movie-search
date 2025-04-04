require('@testing-library/jest-dom')

// Add TextEncoder polyfill
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Fetch polyfill
global.fetch = require('jest-fetch-mock')
global.Response = Response
global.Headers = Headers
global.Request = Request

// Mock window.scrollTo
window.scrollTo = jest.fn()

// Configure DOM testing library to include non-accessible elements if needed
const { configure } = require('@testing-library/dom')
configure({ testIdAttribute: 'data-testid' }) 