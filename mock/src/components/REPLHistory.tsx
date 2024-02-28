import '../styles/main.css';

interface REPLHistoryProps {
    history: string[];
}

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history" aria-label="repl history">
        
                {/* <table> */}
                    {/* <tbody> */}
                        {/* Map over each cell in the row */}
                        {props.history.map((cell, index) => (
                            <tr key={index}>
                                <td>{cell}</td>
                            </tr>
                        ))}
                    {/* </tbody> */}
                {/* </table> */}
        </div>
    );
}