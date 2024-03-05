import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { Console } from "console";
import { REPLFunction } from "./REPLFunction";

/**
 * REPLInputProps interace which requires the parameters to REPLInput include
 * each of the following
 */
interface REPLInputProps {
  history: string[][]; // history of responses
  setHistory: Dispatch<SetStateAction<string[][]>>;
  mode: boolean; // verbose/brief mode
  setMode: Dispatch<SetStateAction<boolean>>;
  myData: any[][]; // data as loaded from load_file function
  setMyData: Dispatch<SetStateAction<any[][]>>;
}
/**
 * Function which handles user command input as inputted from the
 * command line. This function's handleSubmit gets called upon the user
 * clicking the submit button. However, in order to carry over our data and
 * mode, we must create this outer function storing the metadata.
 * @param props
 * @returns functionality for each iteration of the button getting clicked
 */
export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [myData, setMyData] = useState<any[][]>([]);
  const [mode, setMode] = useState<boolean>(false);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    const output = REPLFunction(
      commandString.split(" "),
      mode,
      setMode,
      myData,
      setMyData
    );
    if (!mode) {
      //brief
      props.setHistory([...props.history, output]);
    }
    //verbose
    else {
      props.setHistory([...props.history, ["Input: " + commandString], output]);
    }
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        aria-label={"Submit"}
        onClick={() => handleSubmit(commandString.toLowerCase())}
      >
        Submitted {count} times {/*Updates submit button to count submissions */}
      </button>
    </div>
  );
}
