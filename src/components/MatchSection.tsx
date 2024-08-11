import { Chess, Move } from 'chess.js';
import { useEffect, useState } from 'react';
import { Pieces } from '../utils/types.ts';
import PiecesStatistics from './PiecesStatistics.tsx';

const MatchSection = ({ pgn }: { pgn: string }) => {
    const chess = new Chess();
    const [totalMoves, setTotalMoves] = useState(0);
    const [date, setDate] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [whitePlayer, setWhitePlayer] = useState<string>('');
    const [blackPlayer, setBlackPlayer] = useState<string>('');
    const [blackPieces, setBlackPieces] = useState<Pieces>({
        a8: {
            position: 'a8',
            pieceName: 'r',
            captures: [],
            captured: false,
            moves: 0
        },
        b8: {
            position: 'b8',
            pieceName: 'n',
            captures: [],
            captured: false,
            moves: 0
        },
        c8: {
            position: 'c8',
            pieceName: 'b',
            captures: [],
            captured: false,
            moves: 0
        },
        d8: {
            position: 'd8',
            pieceName: 'q',
            captures: [],
            captured: false,
            moves: 0
        },
        e8: {
            position: 'e8',
            pieceName: 'k',
            captures: [],
            captured: false,
            moves: 0
        },
        f8: {
            position: 'f8',
            pieceName: 'b',
            captures: [],
            captured: false,
            moves: 0
        },
        g8: {
            position: 'g8',
            pieceName: 'n',
            captures: [],
            captured: false,
            moves: 0
        },
        h8: {
            position: 'h8',
            pieceName: 'r',
            captures: [],
            captured: false,
            moves: 0
        },
        a7: {
            position: 'a7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        b7: {
            position: 'b7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        c7: {
            position: 'c7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        d7: {
            position: 'd7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        e7: {
            position: 'e7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        f7: {
            position: 'f7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        g7: {
            position: 'g7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        },
        h7: {
            position: 'h7',
            pieceName: 'p',
            captures: [],
            captured: false,
            moves: 0
        }
    });

    const [whitePieces, setWhitePieces] = useState<Pieces>({
        a1: {
            position: 'a1',
            pieceName: 'r',
            moves: 0,
            captures: [],
            captured: false
        },
        b1: {
            position: 'b1',
            pieceName: 'n',
            moves: 0,
            captures: [],
            captured: false
        },
        c1: {
            position: 'c1',
            pieceName: 'b',
            moves: 0,
            captures: [],
            captured: false
        },
        d1: {
            position: 'd1',
            pieceName: 'q',
            moves: 0,
            captures: [],
            captured: false
        },
        e1: {
            position: 'e1',
            pieceName: 'k',
            moves: 0,
            captures: [],
            captured: false
        },
        f1: {
            position: 'f1',
            pieceName: 'b',
            moves: 0,
            captures: [],
            captured: false
        },
        g1: {
            position: 'g1',
            pieceName: 'n',
            moves: 0,
            captures: [],
            captured: false
        },
        h1: {
            position: 'h1',
            pieceName: 'r',
            moves: 0,
            captures: [],
            captured: false
        },
        a2: {
            position: 'a2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        b2: {
            position: 'b2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        c2: {
            position: 'c2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        d2: {
            position: 'd2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        e2: {
            position: 'e2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        f2: {
            position: 'f2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        g2: {
            position: 'g2',
            pieceName: 'p',
            moves: 0,
            captures: [],
            captured: false
        },
        h2: {
            position: 'h2',
            pieceName: 'p',
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
            const movedPiece = { ...pieces[piece] };
            const capturedPieces = [...pieces[piece].captures];
            if (
                movedPiece.position === move.from &&
                move.piece === movedPiece.pieceName &&
                move.flags !== 'q' &&
                move.flags !== 'k'
            ) {
                movedPiece.position = move.to;
                movedPiece.moves += 1;

                if (move.captured !== undefined) {
                    capturedPieces.push(move.captured);
                }

                pieces[piece] = { ...movedPiece, captures: capturedPieces };
            }
        });
    };

    useEffect(() => {
        chess.loadPgn(pgn);
        const newHistory = chess.history({ verbose: true });
        setTotalMoves(newHistory.length);
        const newWhitePieces = { ...whitePieces };
        const newBlackPieces = { ...blackPieces };

        setWhitePlayer(chess.header().White);
        setBlackPlayer(chess.header().Black);
        setDate(chess.header().Date);
        setResult(chess.header().Result);

        newHistory.forEach((move) => {
            if (move.color === 'w') {
                CalculateMove(newWhitePieces, move);
            } else if (move.color === 'b') {
                CalculateMove(newBlackPieces, move);
            }
        });
        setWhitePieces(newWhitePieces);
        setBlackPieces(newBlackPieces);
    }, [pgn]);

    return (
        <div>
            <h1 className="text-xl font-bold">
                {whitePlayer + ' vs. ' + blackPlayer + ' - ' + date}
            </h1>
            <h2 className="text-lg mb-4 font-bold">
                Total turns: {totalMoves}, Result: {result}
            </h2>
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
};

export default MatchSection;
