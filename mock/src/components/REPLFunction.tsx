import { useState } from "react";
import { mock_files } from "./mockedJson";
/**
 * A command-processor function for our REPL. The function returns a string[], 
 * which is the value to print to history when
 * the command is done executing.
 */
export interface REPLFunction {
  (
    command: string[], // user command-line input
    inputMode: boolean, // mode (verbose/brief)
    setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
    myData: any[][], // (mocked) csv data
    setMyData: React.Dispatch<React.SetStateAction<any[][]>>
  ): string[];
}
/**
 * This commandMap maps a string to a REPLFunction which the user is essentially
 * calling by inputting that word. This map also ensures that each of the 
 * functions implements REPLFunction, so they must output an array of strings
 * (and provide the input arguments as defined in the REPLFunction interface)
 */
const commandMap: Record<string, REPLFunction> = {
  load_file: load_file,
  mode: set_mode,
  view: view,
  search: search,
};

/**
 * This REPLFunction function is what connects all the functions
 * which implement REPLFunction to the actual commandMap. In other words,
 * we look for instances of the user's first word in commandMap (to
 * see if the command is valid), and call the necessary function if applicable
 * @param command // user command-line input
 * @param inputMode // mode (verbose/brief)
 * @param setInputMode 
 * @param myData // (mocked) csv data
 * @param setMyData 
 * @returns an array of strings to be provided to the user
 */
export const REPLFunction: REPLFunction = (
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
) => {
  const func = commandMap[command[0]];
  if (func) {
    return func(command, inputMode, setInputMode, myData, setMyData);
  } else {
    return ["Invalid command"];
  }
};
/**
 * loads file into myData, returns whether or not fileName was found
 * @param command // user command-line input
 * @param inputMode // mode (verbose/brief)
 * @param setInputMode 
 * @param myData // (mocked) csv data
 * @param setMyData 
 * @returns an array of strings which is 'Data loaded succesfully' if everything
 * was correctly done. 
 */
function load_file(
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
): string[] {
  if (command.length < 2) {
    return ["Function requires two parameters: load_file {file_name}"];
  }
  const fileData: any[][] = mock_files.get(command[1]);
  if (fileData) {
    setMyData(fileData); // set the universal data to be that of the fileData
    return ["Data loaded successfully"];
  } else {
    return ["File not found"];
  }
}
/**
 * outputs the file which has been loaded into myData, in the form of 
 * an array of strings, wherein each index of the array is a row of the 
 * mocked csv
 * @param command // user command-line input
 * @param inputMode // mode (verbose/brief)
 * @param setInputMode 
 * @param myData // (mocked) csv data
 * @param setMyData 
 * @returns array of strings, each element is a row in the data
 */
function view(
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
): string[] {
  const results: string[] = [];
  if (myData.length != 0) {
    for (let i = 0; i < myData.length; i++) {
      results.push("row " + i + ": " + myData[i].toString());
    }
  } else {
    results.push("No data loaded");
  }
  return results;
}
/**
 * searches through dataset for object in designated column
 * starting at the 2nd row, since 1st is considered columnHeaders
 * @param command // user command-line input
 * @param inputMode // mode (verbose/brief)
 * @param setInputMode 
 * @param myData // (mocked) csv data
 * @param setMyData 
 * @returns an array of strings wherein object is found in the designated 
 * column number
 */
function search(
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
): string[] {
  const results: string[] = [];
  if (command.length < 3) {
    results.push("Function needs 3 arguments: search {column} {object}");
    return results;
  }
  if (myData.length == 0) {
    results.push("No data loaded");
    return results;
  }
  let columnNumber: number = findColumnNumber(command[1], myData);
  if (columnNumber == -1) {
    results.push("Column not found");
  }
  for (let i = 1; i < myData.length; i++) {
    if (columnNumber >= 0 && columnNumber < myData[i].length) {
      if (myData[i][columnNumber]) {
        //checking for inconsistent row lengths
        if (myData[i][columnNumber].toLowerCase() === command[2]) {
          results.push(
            command[2] + " found in row " + i + ": " + myData[i].toString()
          );
        }
      }
    }
  }
  if (results.length == 0) {
    results.push(command[2] + " not found in column " + columnNumber);
  }
  return results;
}
/**
 * changes mode to/from verbose/brief
 * @param command // user command-line input
 * @param inputMode // mode (verbose/brief)
 * @param setInputMode 
 * @param myData // (mocked) csv data
 * @param setMyData 
 * @returns ["Mode changed"], since theoretically this function should always
 * work
 */
function set_mode(
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
): string[] {
  setInputMode(!inputMode);
  return ["Mode changed"];
}
/**
 * finds column number to search through.
 *  User may input the column index (as an int), or the column string,
 * and this function should return the correct column number they desired
 * If the column strings themselves are ints, then whichever is found
 * first will be the designated column (ie searching for column 1 in 3 2 1
 * will yield column 1, or in this case "2", since it is found first
 * @param columnNumberString // 2nd element of 'search {columnNumberString} {object}'
 *              can either be a number (representing index) or string 
 *              (representing the name of the column header)
 * @param myData // the (mocked) csv data
 * @returns number at which desired column's index is
 */ 
function findColumnNumber(columnNumberString: string, myData: any[][]): number {
  let mystring = columnNumberString;
  let colNum: number = parseInt(mystring);
  if (isNaN(colNum)) {
    colNum = -1;
  }
  if (myData) {
    for (let i = 0; i < myData[0].length; i++) {
      if (
        columnNumberString === myData[0][i].toString().toLowerCase() ||
        colNum == i
      ) {
        return i;
      }
    }
  }
  return -1;
}
