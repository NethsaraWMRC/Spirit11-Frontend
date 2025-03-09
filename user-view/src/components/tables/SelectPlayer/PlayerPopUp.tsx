import React from "react";

interface Player {
  Name: string;
  University: string;
  Category: string;
  "Total Runs": number;
  "Balls Faced": number;
  "Innings Played": number;
  Wickets: number;
  "Overs Bowled": number;
  "Runs Conceded": number;
}

interface ViewDetailsModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerPopUp: React.FC<ViewDetailsModalProps> = ({
  player,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
        style={{ backdropFilter: "blur(4px)" }}
      ></div>

      {/* Modal - landscape orientation */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[80vh] w-full max-w-4xl mx-4 overflow-auto">
        <div className="flex flex-col md:flex-row h-full">
          {/* Header & Details section */}
          <div className="p-6 flex-1">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {player.Name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {player.University}
              </p>
            </div>

            {/* Player details in landscape layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <DetailItem
                  label="Category"
                  value={player.Category}
                  highlight
                />

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                    Batting Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <DetailItem
                      label="Total Runs"
                      value={player["Total Runs"]}
                    />
                    <DetailItem
                      label="Balls Faced"
                      value={player["Balls Faced"]}
                    />
                    <DetailItem
                      label="Innings Played"
                      value={player["Innings Played"]}
                    />
                    <DetailItem
                      label="Batting Average"
                      value={(
                        player["Total Runs"] / player["Innings Played"] || 0
                      ).toFixed(2)}
                    />
                    <DetailItem
                      label="Strike Rate"
                      value={(
                        (player["Total Runs"] / player["Balls Faced"]) * 100 ||
                        0
                      ).toFixed(2)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                  Bowling Statistics
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <DetailItem label="Wickets" value={player.Wickets} />
                  <DetailItem
                    label="Overs Bowled"
                    value={player["Overs Bowled"]}
                  />
                  <DetailItem
                    label="Runs Conceded"
                    value={player["Runs Conceded"]}
                  />
                  {player["Overs Bowled"] > 0 ? (
                    <>
                      <DetailItem
                        label="Economy Rate"
                        value={(
                          player["Runs Conceded"] / player["Overs Bowled"]
                        ).toFixed(2)}
                      />
                      <DetailItem
                        label="Bowling Average"
                        value={
                          player.Wickets > 0
                            ? (
                                player["Runs Conceded"] / player.Wickets
                              ).toFixed(2)
                            : "N/A"
                        }
                      />
                    </>
                  ) : (
                    <DetailItem label="Bowling" value="No bowling statistics" />
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying label-value pairs
const DetailItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div className={highlight ? "mb-2" : ""}>
    <span className="text-xs text-gray-500 dark:text-gray-400 block">
      {label}
    </span>
    <span
      className={`font-medium ${
        highlight ? "text-lg" : ""
      } text-gray-800 dark:text-white`}
    >
      {value}
    </span>
  </div>
);

export default PlayerPopUp;
