import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';
import { Console } from 'console';

interface REPLInputProps{
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[],
  setHistory: Dispatch<SetStateAction<string[]>>,
  mode: boolean
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // TODO WITH TA : add a count state
    const [count, setCount] = useState<number>(0)
    const [mode, setMode] = useState<boolean>(props.mode)

    function handleOutput(command:string[]) {
      if(commandString === 'mode') {
        setMode(!mode)
        return 'Mode changed'
      }
      else if(command[0] == 'load_file') {
        return 'Loaded'
      }
      else if(commandString == 'view') {
        return 'View'
      }
      else if (command[0] == 'search') {
        return 'Searching'
      }
      else {
        return 'Invalid command'
      }
    }
    
    // This function is triggered when the button is clicked.
    function handleSubmit(commandString:string) {
      setCount(count+1)
      // CHANGED
      // handleOutput(commandString)
      //brief

      if(!mode){
        props.setHistory([...props.history, 'output: ' + handleOutput(commandString.split(" ", 3))])
      }
      //verbose
      else {
        props.setHistory([...props.history, 'input: ' + commandString, 'output: ' + handleOutput(commandString.split(" ", 3))])
      }
      // setOutput('Invalid command')
      setCommandString('')
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
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString.toLowerCase())}>Submitted {count} times</button>
        </div>
    );
  }