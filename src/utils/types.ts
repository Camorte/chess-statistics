export type Pieces = {
    [key: string]: {
        position: string;
        moves: number;
        pieceName: string;
        captures: string[];
        captured: boolean;
    };
};
