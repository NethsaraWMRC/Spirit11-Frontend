import React, { useState } from "react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Button from "../../ui/button/Button";
import { Player } from "./PlayersData";

interface PlayerEditFormProps {
  player: Player;
  closeModal: () => void;
  onUpdate?: (updatedPlayer: Player) => void;
}

const PlayerEditForm: React.FC<PlayerEditFormProps> = ({ player, closeModal, onUpdate }) => {
  // Create state to track form changes based on received player data
  const [formData, setFormData] = useState<Player>({
    ...player
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "Total Runs" || name === "Balls Faced" || name === "Innings Played" || 
              name === "Wickets" || name === "Overs Bowled" || name === "Runs Conceded"
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating player:", formData);
    
    // Call the onUpdate callback if provided
    if (onUpdate) {
      onUpdate(formData);
    }
    
    closeModal();
  };

  return (
    <div>
      <div className="mb-6">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Player
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update the player details below.
        </p>
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pb-3">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="col-span-2">
              <Label>Name</Label>
              <Input 
                type="text" 
                name="Name"
                value={formData.Name} 
                onChange={handleChange}
                placeholder="Enter player name" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>University</Label>
              <Input 
                type="text" 
                name="University"
                value={formData.University} 
                onChange={handleChange}
                placeholder="Enter university name" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Category</Label>
              <select 
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-base text-gray-600 outline-none focus:border-primary focus-visible:shadow-none dark:border-gray-600 dark:text-gray-400"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Batsman">Batsman</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Bowler">Bowler</option>
              </select>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Total Runs</Label>
              <Input 
                type="number" 
                name="Total Runs"
                value={formData["Total Runs"]} 
                onChange={handleChange}
                placeholder="Enter total runs" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Balls Faced</Label>
              <Input 
                type="number" 
                name="Balls Faced"
                value={formData["Balls Faced"]} 
                onChange={handleChange}
                placeholder="Enter balls faced" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Innings Played</Label>
              <Input 
                type="number" 
                name="Innings Played"
                value={formData["Innings Played"]} 
                onChange={handleChange}
                placeholder="Enter innings played" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Wickets</Label>
              <Input 
                type="number" 
                name="Wickets"
                value={formData.Wickets} 
                onChange={handleChange}
                placeholder="Enter wickets" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Overs Bowled</Label>
              <Input 
                type="number" 
                name="Overs Bowled"
                value={formData["Overs Bowled"]} 
                onChange={handleChange}
                placeholder="Enter overs bowled" 
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Runs Conceded</Label>
              <Input 
                type="number" 
                name="Runs Conceded"
                value={formData["Runs Conceded"]} 
                onChange={handleChange}
                placeholder="Enter runs conceded" 
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="sm" >
            Update Player
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlayerEditForm;