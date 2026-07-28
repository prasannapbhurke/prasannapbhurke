import { useEffect, useRef, useCallback } from 'react';

/**
 * Achievement tracking utility.
 * Stores unlocked badges in localStorage and dispatches custom events.
 */

export const ACHIEVEMENTS = {
  BATMAN_MODE:     { id: 'batman_mode',    emoji: '🦇', title: 'Dark Knight',       desc: 'Activated Batman Mode' },
  ALL_PROJECTS:    { id: 'all_projects',   emoji: '🔭', title: 'Project Explorer',   desc: 'Opened all 6 project modals' },
  CLI_LAUNCHED:    { id: 'cli_launched',   emoji: '🚀', title: 'Terminal Hacker',    desc: 'Launched CLI Mode' },
  HIRED:           { id: 'hired',          emoji: '🏆', title: 'Hired Prasanna',     desc: 'Submitted the contact form' },
  SYNAPSE_FIRED:   { id: 'synapse_fired',  emoji: '🎯', title: 'Synapse Sniper',     desc: 'Fired a 3D Synapse Pulse' },
  ORBITAL_ENG:     { id: 'orbital_eng',   emoji: '🌌', title: 'Orbital Engineer',   desc: 'Interacted with 3D Tech Galaxy' },
  MORSE_SENT:      { id: 'morse_sent',     emoji: '📡', title: 'Bat-Signal Sent',    desc: 'Sent a Morse code transmission' },
  ALGO_RACE:       { id: 'algo_race',      emoji: '⚡', title: 'Algorithm Racer',    desc: 'Completed an Algorithm Race' },
};

const STORAGE_KEY = 'portfolio_achievements';

export function getUnlocked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isUnlocked(achievementId) {
  return getUnlocked().includes(achievementId);
}

export function unlock(achievement) {
  const unlocked = getUnlocked();
  if (unlocked.includes(achievement.id)) return false; // already unlocked

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked, achievement.id]));

  // Dispatch global event so any component can react
  window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: achievement }));
  return true;
}
