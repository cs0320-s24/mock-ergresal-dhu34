import { useState } from "react";

/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    // (args: Array<string>): String|String[][]
    command: string[];
    // here we define the map of words to commands ie {view: viewcsv}
//   myData: string[][];
//   setMyData: React.Dispatch<React.SetStateAction<string[][]>>;
//   mode: boolean;
//   setMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export function REPLFunction(props: REPLFunction){
   
}