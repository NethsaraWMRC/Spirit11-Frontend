import { useState, useEffect } from "react";
import { GroupIcon, BoxIconLine } from "../../icons";

interface Player {
  id: string;
  name: string;
  runs: number;
  wickets: number;
}

const dummyPlayers: Player[] = [
  { id: "1", name: "Virat Kohli", runs: 450, wickets: 2 },
  { id: "2", name: "Babar Azam", runs: 380, wickets: 0 },
  { id: "3", name: "Jasprit Bumrah", runs: 50, wickets: 15 },
  { id: "4", name: "Ben Stokes", runs: 300, wickets: 10 },
  { id: "5", name: "David Warner", runs: 420, wickets: 1 },
];

const TournamentSummary = () => {
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);
  const [highestRunScorer, setHighestRunScorer] = useState<Player | null>(null);
  const [highestWicketTaker, setHighestWicketTaker] = useState<Player | null>(
    null
  );

  useEffect(() => {
    const runs = dummyPlayers.reduce((sum, player) => sum + player.runs, 0);
    const wickets = dummyPlayers.reduce(
      (sum, player) => sum + player.wickets,
      0
    );

    const topRunScorer = dummyPlayers.reduce(
      (top, player) => (player.runs > top.runs ? player : top),
      dummyPlayers[0]
    );

    const topWicketTaker = dummyPlayers.reduce(
      (top, player) => (player.wickets > top.wickets ? player : top),
      dummyPlayers[0]
    );

    setTotalRuns(runs);
    setTotalWickets(wickets);
    setHighestRunScorer(topRunScorer);
    setHighestWicketTaker(topWicketTaker);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-left bg-gray-100 p-10">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-6xl w-full mx-auto">
        <h3 className="text-3xl font-semibold text-left text-gray-800 mb-6 pl-4">Tournament Summary</h3>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Total Runs */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl">
                <GroupIcon className="text-gray-800 size-8" />
              </div>
              <div className="mt-6 text-center">
                <span className="text-lg text-gray-500 font-medium">
                  Total Runs
                </span>
                <h4 className="mt-2 text-3xl font-bold text-gray-800">
                  {totalRuns}
                </h4>
              </div>
            </div>

            {/* Total Wickets */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl">
                <BoxIconLine className="text-gray-800 size-8" />
              </div>
              <div className="mt-6 text-center">
                <span className="text-lg text-gray-500 font-medium">
                  Total Wickets
                </span>
                <h4 className="mt-2 text-3xl font-bold text-gray-800">
                  {totalWickets}
                </h4>
              </div>
            </div>
          </div>


  
          <div className="mt-12">
  <h3 className="text-3xl font-semibold text-left text-gray-800 mb-6 pl-4">Top Performances</h3>

  {/* Highest Run Scorer Card */}
  <div className="mb-10">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md flex flex-col items-start">
      <h3 className="text-2xl font-semibold text-gray-700">Highest Run Scorer 🏆</h3>
      {highestRunScorer && (
        <div className="mt-4 flex items-center justify-start space-x-4">
          <h4 className="text-m font-bold text-gray-800">{highestRunScorer.name}</h4>
          <p className="text-s text-gray-500">{highestRunScorer.runs} runs</p>
        </div>
      )}
    </div>
  </div>

  {/* Highest Wicket Taker Card */}
  <div>
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md flex flex-col items-start">
      <h3 className="text-2xl font-semibold text-gray-700">Highest Wicket Taker🎯</h3>
      {highestWicketTaker && (
        <div className="mt-4 flex items-center justify-start space-x-4">
          <h4 className="text-m font-bold text-gray-800">{highestWicketTaker.name}</h4>
          <p className="text-s text-gray-500">{highestWicketTaker.wickets} wickets</p>
        </div>
      )}
    </div>
  </div>
</div>

</div>

        </div>
      </div>
    
  );
};

export default TournamentSummary;
