import { useState, useEffect } from "react";
import { getTournamentSummary } from "../../api/tournement";

import runImg from "../../icons/run.png";
import wicImg from "../../icons/wicket.png";

interface PlayerStat {
  totalRuns: number;
  totalWickets: number;
  highestRun: { player: string; runs: number };
  highestWicket: { player: string; wickets: number };
}

const TournamentSummary = () => {
  const [stats, setStats] = useState<PlayerStat | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getTournamentSummary();
      setStats(data);
    };
    fetchStats();
  }, []);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900 p-10">
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 max-w-6xl w-full mx-auto">
          <h3 className="text-2xl font-semibold text-left text-gray-800 dark:text-gray-200 mb-6 pl-4">
            Tournament Summary
          </h3>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Total Runs */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-md flex flex-col items-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl">
                  <img src={runImg} alt="Run Icon" className="w-12 h-12" />
                </div>
                <div className="mt-6 text-center">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Total Runs</span>
                  <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatNumber(stats.totalRuns)}
                  </h4>
                </div>
              </div>

              {/* Total Wickets */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-md flex flex-col items-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl">
                  <img src={wicImg} alt="Wicket Icon" className="w-8 h-8" />
                </div>
                <div className="mt-6 text-center">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Total Wickets</span>
                  <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatNumber(stats.totalWickets)}
                  </h4>
                </div>
              </div>
            </div>
          )}

          {/* Top Performances */}
          {stats && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-left text-gray-800 dark:text-gray-200 mb-6 pl-4">
                Top Performances
              </h3>

              {/* Highest Run Scorer */}
              <div className="mb-10">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md flex flex-col items-start hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                    Highest Run Scorer 🏏
                  </h3>
                  <div className="mt-4 flex items-center space-x-4">
                    <h4 className="text-lg text-gray-800 dark:text-gray-200">{stats.highestRun.player}</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      {formatNumber(stats.highestRun.runs)} runs
                    </p>
                  </div>
                </div>
              </div>

              {/* Highest Wicket Taker */}
              <div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md flex flex-col items-start hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                    Highest Wicket Taker 🎯
                  </h3>
                  <div className="mt-4 flex items-center space-x-4">
                    <h4 className="text-lg text-gray-800 dark:text-gray-200">{stats.highestWicket.player}</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      {formatNumber(stats.highestWicket.wickets)} wickets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
