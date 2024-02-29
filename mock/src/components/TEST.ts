
import { expect, test } from 'vitest';
import { REPLFunction } from "./REPLFunction";
// import { REPLFunction } from '..src/components';
// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as main from '../../src/main';

test('is 1 + 1 = 2?', () => {
  expect(1 + 1).toBe(2)
})

test('replfunction working?', async () => {
    const output = REPLFunction(["load_file file1"], true)
     expect(output.toEqual(["JKBHV"]))
  })
