import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Board } from './board';
import './index.css';

function calculateWinner(squares: string[]): string | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

interface State {
    nextMove: string;
    winner: string | null;
    squares: string[];
    history: string[][];
}

class Game extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            nextMove: 'X',
            winner: null,
            squares: Array(9).fill(''),
            history: [],
        };
    }

    handleClick(i: number): void {
        if (this.state.squares[i] || this.state.winner) {
            return;
        }
        const history = this.state.history.slice();
        history.push(this.state.squares);
        const squares = this.state.squares.slice();
        squares[i] = this.state.nextMove;
        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';
        const winner = calculateWinner(squares);
        this.setState({ nextMove: nextMove, winner: winner, squares: squares, history: history });
    }

    render(): JSX.Element {
        let status = '';
        if (this.state.winner) {
            status = `Winner: ${this.state.winner}`;
        } else {
            status = `Next player: ${this.state.nextMove}`;
        }
        const moves = this.state.history.map(
            (v: string[], i: number): JSX.Element => {
                const desc = i ? `Go to move ${i}` : 'Go to game start';
                return (
                    <li>
                        <button onClick={(): void => console.log(`Move ${i}`)}>{desc}</button>
                    </li>
                );
            }
        );
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i: number): void => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
