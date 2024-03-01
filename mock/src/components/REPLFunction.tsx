import { useState } from "react";
import { exampleCSV1 } from "./mockedJson";
import { exampleCSV2 } from "./mockedJson";
import { exampleCSV3 } from "./mockedJson";
/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */

const mock_files: Map<string, any> = new Map([
  ["file1", exampleCSV1],
  ["file2", exampleCSV2],
  ["file3", exampleCSV3],
]);
// const [myData, setMyData] = useState<any[][]>([]);
export interface REPLFunction {
  (
    command: string[],
    inputMode: boolean,
    setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
    myData: any[][],
    setMyData: React.Dispatch<React.SetStateAction<any[][]>>
  ): string[];
}

const commandMap: Record<string, REPLFunction> = {
  "load_file": load_file,
  "mode" : set_mode,
  "view" : view ,
  "search": search
};

export const REPLFunction: REPLFunction = (
  command: string[],
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  myData: any[][],
  setMyData: React.Dispatch<React.SetStateAction<any[][]>>
) => {
//   const [localData, setLocalData] = useState<any[][]>(myData);
  const func = commandMap[command[0]];
  if (func) {
    return func(command, inputMode, setInputMode, myData, setMyData);
  } else {
    return ["Invalid command"];
  }
};

// loads file into myData, returns whether or not fileName was found
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
    setMyData(fileData);
    return ["Data loaded successfully"];
  } else {
    return ["File not found"];
  }
}

function view(
    command: string[],
    inputMode: boolean,
    setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
    myData: any[][],
    setMyData: React.Dispatch<React.SetStateAction<any[][]>>
  ): string[] {
    const results: string[] = [];
    if (myData) {
        for (let i = 0; i < myData.length; i++) {
          results.push(myData[i].toString());
        }
      } else {
        results.push("No data loaded");
      }
      return results
  }

  // searches through dataset for object in designated column
  // starting at the 2nd row, since 1st is considered columnHeaders
  function search(
    command: string[],
    inputMode: boolean,
    setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
    myData: any[][],
    setMyData: React.Dispatch<React.SetStateAction<any[][]>>
  ): string[] {
    const results: string[] = [];
    if (command.length < 3) {
      results.push( "Function needs 3 arguments: search {column} {object}");
      return results
    }
    if (myData.length == 0) {
      results.push( "No data loaded");
      return results
    }
    let columnNumber: number = findColumnNumber(command[1], myData);
    if (columnNumber == -1) {
      results.push( "Column not found");
    }
    for (let i = 1; i < myData.length; i++) {
      if (columnNumber >= 0 && columnNumber < myData[i].length) {
        if (myData[i][columnNumber].toLowerCase() === command[2]) {
          results.push(command[2]+" found in row " + i + ": " + myData[i].toString());
        }
      }
    }
    if (results.length == 0) {
      results.push( command[2] + " not found in column " + columnNumber);
    }
    // results.push( "Found in rows: " + results);
    return results
  }

function set_mode(
    command: string[],
    inputMode: boolean,
    setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
    myData: any[][],
    setMyData: React.Dispatch<React.SetStateAction<any[][]>>
  ): string[] {
    setInputMode(!inputMode);
    return ["Mode changed"]
  }


  // finds column number to search through.
  // User may input the column index (as an int), or the column string,
  // and this function should return the correct column number they desired
  // If the column strings themselves are ints, then whichever is found
  // first will be the designated column (ie searching for column 1 in 3 2 1
  // will yield column 1, or in this case "2", since it is found first
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


//   function search(commands: string[]): string[]  {
//     const results: string[] = [];
    
//     if (commands.length < 3) {
//       results.push( "Function needs 3 arguments: search {column} {object}");
//     }
//     if (myData.length == 0) {
//       results.push( "No data loaded");
//     }
//     let columnNumber: number = findColumnNumber(commands[1]);
//     if (columnNumber == -1) {
//       results.push( "Column not found");
//     }
//     // const results: string[] = [];
//     for (let i = 1; i < myData.length; i++) {
//       if (columnNumber >= 0 && columnNumber < myData[i].length) {
//         if (myData[i][columnNumber].toLowerCase() === commands[2]) {
//           results.push(myData[i].toString());
//         }
//       }
//     }
//     if (results.length == 0) {
//       results.push( commands[2] + " not found in column " + columnNumber);
//     }
//     results.push( "Found in rows: " + results);
//     return results
//   }

  function handleOutput(command: string[]): string[] {
    const results: string[] = [];
// functionMap.get(command[0])
    if (command[0] === "mode") {
      setMode(!mode);
      results.push("Mode changed");
    } else if (command[0] == "t") {
      load_file("file1");
      let myarray = ["hu", "1", "The"];
      results.push(search(myarray).toString());
    } else if (command[0] == "load_file") {
      if (load_file(command[1])) {
        results.push("Data loaded successfully");
      } else {
        results.push("File not found");
      }
    } else if (command[0] == "view") {
      if (myData) {
        for (let i = 0; i < myData.length; i++) {
          results.push(myData[i].toString());
        }
      } else {
        results.push("No data loaded");
      }
    } else if (command[0] == "search") {
      results.push(search(command).toString());
    } else {
      results.push("Invalid command");
    }
    return results;
  }
