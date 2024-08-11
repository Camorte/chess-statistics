import pgn from './pgns/Stavanger2024.pgn';
import { useEffect, useState } from 'react';
import MatchSection from './components/MatchSection.tsx';

function App() {
    const [matches, setMatches] = useState<string[]>([]);

    useEffect(() => {
        const newMatches = pgn.split(/\[Event\s+.*?\]/);

        setMatches(newMatches);
    }, [pgn]);

    return (
        <div className="px-16 py-8 h-full overflow-y-auto">
            <div className="flex flex-col gap-4">
                {matches.map((match) => {
                    if (match !== '') {
                        return <MatchSection key={match} pgn={match} />;
                    }
                })}
            </div>
        </div>
    );
}

export default App;
