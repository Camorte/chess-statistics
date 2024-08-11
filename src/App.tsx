import { Chess, Move } from 'chess.js';
import pgn from './pgns/Stavanger2024.pgn';
import { useEffect, useState } from 'react';
import { Pieces } from './utils/types.ts';
import PiecesStatistics from './components/PiecesStatistics.tsx';

function App() {
    const chess = new Chess();
    const [header, setHeader] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [whitePlayer, setWhitePlayer] = useState<string>('');
    const [blackPlayer, setBlackPlayer] = useState<string>('');
    const [blackPieces, setBlackPieces] = useState<Pieces>({
        a8: {
            position: 'a8',
            pieceName: 'Rook',
            captures: [],
            captured: false,
            moves: 0
        },
        b8: {
            position: 'b8',
            pieceName: 'Knight',
            captures: [],
            captured: false,
            moves: 0
        },
        c8: {
            position: 'c8',
            pieceName: 'Bishop',
            captures: [],
            captured: false,
            moves: 0
        },
        d8: {
            position: 'd8',
            pieceName: 'Queen',
            captures: [],
            captured: false,
            moves: 0
        },
        e8: {
            position: 'e8',
            pieceName: 'King',
            captures: [],
            captured: false,
            moves: 0
        },
        f8: {
            position: 'f8',
            pieceName: 'Bishop',
            captures: [],
            captured: false,
            moves: 0
        },
        g8: {
            position: 'g8',
            pieceName: 'Knight',
            captures: [],
            captured: false,
            moves: 0
        },
        h8: {
            position: 'h8',
            pieceName: 'Rook',
            captures: [],
            captured: false,
            moves: 0
        },
        a7: {
            position: 'a7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        b7: {
            position: 'b7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        c7: {
            position: 'c7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        d7: {
            position: 'd7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        e7: {
            position: 'e7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        f7: {
            position: 'f7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        g7: {
            position: 'g7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        },
        h7: {
            position: 'h7',
            pieceName: 'Pawn',
            captures: [],
            captured: false,
            moves: 0
        }
    });
    const [whitePieces, setWhitePieces] = useState<Pieces>({
        a1: {
            position: 'a1',
            pieceName: 'Rook',
            moves: 0,
            captures: [],
            captured: false
        },
        b1: {
            position: 'b1',
            pieceName: 'Knight',
            moves: 0,
            captures: [],
            captured: false
        },
        c1: {
            position: 'c1',
            pieceName: 'Bishop',
            moves: 0,
            captures: [],
            captured: false
        },
        d1: {
            position: 'd1',
            pieceName: 'Queen',
            moves: 0,
            captures: [],
            captured: false
        },
        e1: {
            position: 'e1',
            pieceName: 'King',
            moves: 0,
            captures: [],
            captured: false
        },
        f1: {
            position: 'f1',
            pieceName: 'Bishop',
            moves: 0,
            captures: [],
            captured: false
        },
        g1: {
            position: 'g1',
            pieceName: 'Knight',
            moves: 0,
            captures: [],
            captured: false
        },
        h1: {
            position: 'h1',
            pieceName: 'Rook',
            moves: 0,
            captures: [],
            captured: false
        },
        a2: {
            position: 'a2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        b2: {
            position: 'b2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        c2: {
            position: 'c2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        d2: {
            position: 'd2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        e2: {
            position: 'e2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        f2: {
            position: 'f2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        g2: {
            position: 'g2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        },
        h2: {
            position: 'h2',
            pieceName: 'Pawn',
            moves: 0,
            captures: [],
            captured: false
        }
    });

    const CalculateMove = (
        pieces: typeof whitePieces | typeof blackPieces,
        move: Move
    ) => {
        Object.keys(pieces).forEach((piece) => {
            const movedPiece = pieces[piece];
            if (movedPiece.position === move.from) {
                movedPiece.position = move.to;
                movedPiece.moves += 1;

                if (move.captured !== undefined) {
                    movedPiece.captures.push(move.captured);
                }
            }
        });
    };

    useEffect(() => {
        chess.loadPgn(pgn);

        const newHistory = chess.history({ verbose: true });

        const newWhitePieces = { ...whitePieces };
        const newBlackPieces = { ...blackPieces };

        newHistory.forEach((move) => {
            if (move.color === 'w') {
                CalculateMove(newWhitePieces, move);
            } else if (move.color === 'b') {
                CalculateMove(newBlackPieces, move);
            }
        });

        setWhitePieces(newWhitePieces);
        setBlackPieces(newBlackPieces);

        setWhitePlayer(chess.header().White);
        setBlackPlayer(chess.header().Black);

        setResult(chess.header().Result);

        setHeader(
            chess.header().White +
                ' vs. ' +
                chess.header().Black +
                ' - ' +
                chess.header().Event +
                ', ' +
                chess.header().Date
        );
    }, []);

    return (
        <div className="px-16 py-8 h-full overflow-y-auto">
            <h1 className="text-xl font-bold">{header}</h1>
            <h2 className="text-lg mb-4 font-bold">Result: {result}</h2>
            <div className="grid grid-cols-2 gap-4 h-full">
                <PiecesStatistics
                    pieces={whitePieces}
                    playerType={'White'}
                    playerName={whitePlayer}
                />
                <PiecesStatistics
                    pieces={blackPieces}
                    playerType={'Black'}
                    playerName={blackPlayer}
                />
            </div>
        </div>
    );
}

export default App;
