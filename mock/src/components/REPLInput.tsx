import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { Console } from "console";

import { REPLFunction } from "./REPLFunction";

interface REPLInputProps {
  history: string[][];
  setHistory: Dispatch<SetStateAction<string[][]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  myData: any[][]
  setMyData: Dispatch<SetStateAction<any[][]>>
  
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [myData, setMyData] = useState<any[][]>([]);
  const [mode, setMode] = useState<any[][]>([]);

  // const [mode, setMode] = useState<boolean>(false);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    const output = REPLFunction(
      commandString.split(" "),
      mode, setMode, myData, setMyData
    );
    if (!props.mode) {
      props.setHistory([...props.history, output]);
    }
    //verbose
    else {
      props.setHistory([...props.history, ["Input: " + commandString], output]);
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
