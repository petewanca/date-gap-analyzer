const parse = require('csv-parse')
const assert = require('assert')
const output = []
// Create the parser
const parser = parse({
  delimiter: ':'
})