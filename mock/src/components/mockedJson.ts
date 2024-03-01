
export const exampleCSV1 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
];

export const exampleCSV2 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
  ["O", "K", "C", "O", "O", "L"],
];

export const exampleCSV3 = [
    ["a", "b", "c", "d"],
    ["A", "B", "C", "D"],
    ["F", "G", "H", "I"],
    ["J", "K", "H", "I"],
  ];

export const empty = [
  [],
  ];


export const exampleCSVInconsistentRow = [
  ["a", "b", "c", "d"],
  ["A"],
  ["F", "G",],
  ["J", "K", "H", "I"],
];


 export const mock_files: Map<string, any> = new Map([
  ["file1", exampleCSV1],
  ["file2", exampleCSV2],
  ["file3", exampleCSV3],
  ["file4", exampleCSVInconsistentRow],
  ["empty", empty],
]);
class MockedJson {}
export {};
