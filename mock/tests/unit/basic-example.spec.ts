/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from 'vitest';
import { REPLFunction } from "../../src/components/REPLFunction";

// import { REPLFunction } from '..src/components';
// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from '../../src/main';

test('is 1 + 1 = 2?', () => {
  const  fileData: any[][] = []
  const output = REPLFunction(["load_file", "file1"], true, [] , )
//  const x =  REPLFunction.load_file("file1")
     expect(output).toBe(["Invalid command"])
     const output2 = REPLFunction(["search", "2"], true, [] )
//  const x =  REPLFunction.load_file("file1")
     expect(output).toBe(["Invalid command"])
})


// test('is replfunction working', () => {
//   const output = REPLFunction(commandString.split(" "), mode)
//   expect(REPLFunction(commandString.split(" "), mode)).toBe(2)
// })

// // Notice how you can test vanilla TS functions using Playwright as well!
// test('main.zero() should return 0', () => {
//   expect(main.zero()).toBe(0)
// })

// For more information on how to make unit tests, visit:
// https://jestjs.io/docs/using-matchers