import '../styles/main.css';

interface REPLHistoryProps {
    history: string[];
}

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history" aria-label="repl history">
            {/* Check if history is an array */}
                <table>
                    <tbody>
                        <tr>
                            {/* Map over each cell in the row */}
                            {props.history.map((cell, index) => (
                                <p><td key={index}>{cell}</td></p>
                            ))}
                        </tr>
                    </tbody>
                </table>
        </div>
    );
}