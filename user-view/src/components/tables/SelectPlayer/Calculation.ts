// PlayerCalculations.ts
import { Player } from "./PlayersData";

/**
 * Calculate Batting Strike Rate
 * Formula: (Total Runs / Total Balls Faced) × 100
 */
export const calculateBattingStrikeRate = (player: Player): number => {
  if (!player["Balls Faced"] || player["Balls Faced"] === 0) return 0;
  return (player["Total Runs"] / player["Balls Faced"]) * 100;
};

/**
 * Calculate Batting Average
 * Formula: Total Runs / Innings Played
 */
export const calculateBattingAverage = (player: Player): number => {
  if (!player["Innings Played"] || player["Innings Played"] === 0) return 0;
  return player["Total Runs"] / player["Innings Played"];
};

/**
 * Calculate Bowling Strike Rate
 * Formula: Total Balls Bowled / Total Wickets Taken
 */
export const calculateBowlingStrikeRate = (player: Player): number => {
  if (!player.Wickets || player.Wickets === 0) return 0;

  // Convert overs to balls (1 over = 6 balls)
  const totalBallsBowled = player["Overs Bowled"] * 6;

  return totalBallsBowled / player.Wickets;
};

/**
 * Calculate Economy Rate
 * Formula: (Total Runs Conceded / Total Balls Bowled) × 6
 */
export const calculateEconomyRate = (player: Player): number => {
  // Convert overs to balls (1 over = 6 balls)
  const totalBallsBowled = player["Overs Bowled"] * 6;

  if (!totalBallsBowled || totalBallsBowled === 0) return 0;
  return (player["Runs Conceded"] / totalBallsBowled) * 6;
};

/**
 * Calculate Player Points
 * Formula: (Batting Strike Rate / 5 + Batting Average × 0.8) + (500 / Bowling Strike Rate + 140 / Economy Rate)
 */
export const calculatePlayerPoints = (player: Player): number => {
  const battingStrikeRate = calculateBattingStrikeRate(player);
  const battingAverage = calculateBattingAverage(player);
  const bowlingStrikeRate = calculateBowlingStrikeRate(player);
  const economyRate = calculateEconomyRate(player);

  let points = 0;

  // Calculate batting component
  if (battingStrikeRate > 0 || battingAverage > 0) {
    points += battingStrikeRate / 5 + battingAverage * 0.8;
  }

  // Calculate bowling component
  if (bowlingStrikeRate > 0 || economyRate > 0) {
    points +=
      (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
      (economyRate > 0 ? 140 / economyRate : 0);
  }

  return Number(points.toFixed(2));
};

export const calculatePlayerValue = (player: Player): number => {
  const points = calculatePlayerPoints(player);
  const exactValue = (9 * points + 100) * 1000;

  // Round to the nearest multiple of 50,000
  return Math.round(exactValue / 50000) * 50000;
};

export const formatCurrency = (value: number): string => {
  return `RS${value.toLocaleString("en-IN")}`;
};
