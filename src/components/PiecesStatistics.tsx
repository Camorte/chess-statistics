import { Pieces } from '../utils/types.ts';

const PiecesStatistics = ({
    pieces,
    playerName,
    playerType
}: {
    pieces: Pieces;
    playerName: string;
    playerType: 'White' | 'Black';
}) => {
    return (
        <div className="border-2 border-black p-4">
            <h3 className="text-lg font-bold border-b-2 border-black mb-2">
                {playerType} – {playerName}
            </h3>
            <ul>
                {Object.keys(pieces).map((piece) => {
                    const pieceKey = piece;
                    const pieceValue = pieces[pieceKey];
                    return (
                        <li
                            className="flex flex-col text-base"
                            key={pieceKey + '-' + playerType}
                        >
                            <p>
                                <span className="font-bold">
                                    {pieceValue.pieceName}, {pieceKey}
                                </span>{' '}
                                - {pieceValue.moves} move(s)
                            </p>
                            <p>
                                Captured pieces – [
                                {pieceValue.captures.join(', ')}],{' '}
                                <span className="font-bold">
                                    total: {pieceValue.captures.length}
                                </span>
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PiecesStatistics;
