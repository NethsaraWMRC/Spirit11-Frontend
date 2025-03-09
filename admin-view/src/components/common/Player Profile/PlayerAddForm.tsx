import React, { useState } from "react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Button from "../../ui/button/Button";
import { Player } from "./PlayersData";

interface PlayerAddFormProps {
  closeModal: () => void;
  onSave: (player: Omit<Player, "id">) => void;
}

const PlayerAddForm: React.FC<PlayerAddFormProps> = ({
  closeModal,
  onSave,
}) => {
  // Use string type for number fields to allow them to be cleared
  const [formData, setFormData] = useState({
    Name: "",
    University: "",
    Category: "",
    "Total Runs": "",
    "Balls Faced": "",
    "Innings Played": "",
    Wickets: "",
    "Overs Bowled": "",
    "Runs Conceded": "",
    "is New Player": true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string values to numbers before submission
    const processedData: Omit<Player, "id"> = {
      Name: formData.Name,
      University: formData.University,
      Category: formData.Category,
      "Total Runs": formData["Total Runs"] === "" ? 0 : Number(formData["Total Runs"]),
      "Balls Faced": formData["Balls Faced"] === "" ? 0 : Number(formData["Balls Faced"]),
      "Innings Played": formData["Innings Played"] === "" ? 0 : Number(formData["Innings Played"]),
      Wickets: formData.Wickets === "" ? 0 : Number(formData.Wickets),
      "Overs Bowled": formData["Overs Bowled"] === "" ? 0 : Number(formData["Overs Bowled"]),
      "Runs Conceded": formData["Runs Conceded"] === "" ? 0 : Number(formData["Runs Conceded"]),
      "is New Player": true,
    };
    
    onSave(processedData);
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
                required
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
                type="text"
                name="Total Runs"
                value={formData["Total Runs"]}
                onChange={handleChange}
                placeholder="Enter total runs"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Balls Faced</Label>
              <Input
                type="text"
                name="Balls Faced"
                value={formData["Balls Faced"]}
                onChange={handleChange}
                placeholder="Enter balls faced"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Innings Played</Label>
              <Input
                type="text"
                name="Innings Played"
                value={formData["Innings Played"]}
                onChange={handleChange}
                placeholder="Enter innings played"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Wickets</Label>
              <Input
                type="text"
                name="Wickets"
                value={formData.Wickets}
                onChange={handleChange}
                placeholder="Enter wickets"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Overs Bowled</Label>
              <Input
                type="text"
                name="Overs Bowled"
                value={formData["Overs Bowled"]}
                onChange={handleChange}
                placeholder="Enter overs bowled"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Runs Conceded</Label>
              <Input
                type="text"
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
          <Button size="sm" onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}>
            Add Player
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlayerAddForm;