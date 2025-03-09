import React from "react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Button from "../../ui/button/Button";

// Accept closeModal as a prop instead of using useModal inside
interface PlayerAddFormProps {
  closeModal: () => void;
}

const PlayerAddForm: React.FC<PlayerAddFormProps> = ({ closeModal }) => {
  const handleSave = () => {
    // Handle save/add player logic here
    console.log("Adding new player...");
    closeModal();
  };

  return (
    <div>
      <div className="mb-6">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Add New Player
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter the player details below.
        </p>
      </div>

      <form className="flex flex-col">
        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pb-3">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="col-span-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Enter player name" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>University</Label>
              <Input type="text" placeholder="Enter university name" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Category</Label>
              <select className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-base text-gray-600 outline-none focus:border-primary focus-visible:shadow-none dark:border-gray-600 dark:text-gray-400">
                <option value="">Select category</option>
                <option value="Batsman">Batsman</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Bowler">Bowler</option>
              </select>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Total Runs</Label>
              <Input type="number" placeholder="Enter total runs" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Balls Faced</Label>
              <Input type="number" placeholder="Enter balls faced" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Innings Played</Label>
              <Input type="number" placeholder="Enter innings played" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Wickets</Label>
              <Input type="number" placeholder="Enter wickets" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Overs Bowled</Label>
              <Input type="number" placeholder="Enter overs bowled" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Runs Conceded</Label>
              <Input type="number" placeholder="Enter runs conceded" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Add Player
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlayerAddForm;
