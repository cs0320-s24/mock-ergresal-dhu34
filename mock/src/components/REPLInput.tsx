import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { Console } from "console";
import { exampleCSV1 } from "./mockedJson";
import { exampleCSV2 } from "./mockedJson";
import { exampleCSV3 } from "./mockedJson";
import { REPLFunction } from "./REPLFunction";

const mock_files: Map<string, any> = new Map([
  ["file1", exampleCSV1],
  ["file2", exampleCSV2],
  ["file3", exampleCSV3],
]);

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  mode: boolean;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [myData, setMyData] = useState<string[][]>([]);
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<boolean>(props.mode);

  // loads file into myData, returns whether or not fileName was found
  function load_file(filename: string): Boolean {
    const fileData: any[][] = mock_files.get(filename);
    if (fileData) {
      setMyData(fileData);
      return true;
    } else {
      return false;
    }
  }

  // finds column number to search through.
  // User may input the column index (as an int), or the column string,
  // and this function should return the correct column number they desired
  // If the column strings themselves are ints, then whichever is found
  // first will be the designated column (ie searching for column 1 in 3 2 1
  // will yield column 1, or in this case "2", since it is found first
  function findColumnNumber(columnNumberString: string): number {
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

  // searches through dataset for object in designated column
  // starting at the 2nd row, since 1st is considered columnHeaders
  function search(commands: string[]): string {
    if (myData == undefined) {
      return "this shouldnt happen";
    }
    if (commands.length < 3) {
      return "Function needs 3 arguments: search {column} {object}";
    }
    if (myData.length == 0) {
      return "No data loaded";
    }
    let columnNumber: number = findColumnNumber(commands[1]);
    if (columnNumber == -1) {
      return "Column not found";
    }
    const results: string[] = [];
    for (let i = 1; i < myData.length; i++) {
      if (columnNumber >= 0 && columnNumber < myData[i].length) {
        if (myData[i][columnNumber].toLowerCase() === commands[2]) {
          results.push(myData[i].toString());
        }
      }
    }
    if (results.length == 0) {
      return commands[2] + " not found in column " + columnNumber;
    }
    return "Found in rows: " + results;
  }

  function handleOutput(command: string[]) {
    let results = "";

    if (commandString === "mode") {
      setMode(!mode);
      results = "Mode changed";
    } else if (command[0] == "t") {
      load_file("file1");
      let myarray = ["hu", "1", "The"];
      results = search(myarray);
    } else if (command[0] == "load_file") {
      if (load_file(command[1])) {
        results = "Data loaded successfully";
      } else {
        results = "File not found";
      }
    } else if (commandString == "view") {
      if (myData) {
        for (let i = 0; i < myData.length; i++) {
          results = myData[i].toString();
        }
      } else {
        results = "No data loaded";
      }
    } else if (command[0] == "search") {
      results = search(command);
    } else {
      results = "Invalid command";
    }
    return results;
  }

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    const results: string[] = [];
    const output = REPLFunction({
      command: commandString.split(" "),
    });
    if (!mode) {
      props.setHistory([
        ...props.history,
        "" + handleOutput(commandString.split(" "))])
    }
    //verbose
    else {
      props.setHistory([
        ...props.history,
        "input: " + commandString,
        "output: " + handleOutput(commandString.split(" ")),
      ]);
    }
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        aria-label={"Submit"}
        onClick={() => handleSubmit(commandString.toLowerCase())}
      >
        Submitted {count} times
      </button>
    </div>
  );
}
