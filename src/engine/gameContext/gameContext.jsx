import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

/*
Usage:

import { GameProvider, useGame } from "@/engine/game/gameContext";

Read / write anywhere:
const { gameState, increaseHealth } = useGame();
*/

const GameContext = createContext(null);

const DEFAULT_GAME_STATE = Object.freeze({
  player: {
    health: 25,
    money: 0,
    items: [],
    passive: null,
    level: 1,
    cavernSeed: "12-LP-T,null,null,BT,S,null",
    events: [],
    spells: {
      slot1: {
        leftEffectCode: "ATT{R4}",
        rightEffectCode: "RAATT{R6}",
        progressionRate: 3,
        tier: 1,
        level: 1,
        upgradePoints: 0,
        power: "Striking",
        class: null,
      },
      slot2: {
        leftEffectCode: "GUA{R3}",
        rightEffectCode: "RAGUA{R4}",
        progressionRate: 2,
        tier: 1,
        level: 3,
        upgradePoints: 0,
        power: "Protective",
        class: "Water",
      },
      slot3: {
        leftEffectCode: "ATT{R4}",
        rightEffectCode: "RAATT{R6}",
        progressionRate: 5,
        tier: 1,
        level: 5,
        upgradePoints: 0,
        power: "Striking",
        class: "Fire",
      },
      slot4: {
        leftEffectCode: "GUA{R3}",
        rightEffectCode: "RAGUA{R4}",
        progressionRate: 2,
        tier: 3,
        level: 3,
        upgradePoints: 0,
        power: "Protective",
        class: "Water",
      },
      slot5: {
        leftEffectCode: "ATT{R4}",
        rightEffectCode: "RAATT{R6}",
        progressionRate: 4,
        tier: 2,
        level: 2,
        upgradePoints: 0,
        power: "Striking",
        class: "Fire",
      },
      slot6: {
        leftEffectCode: "GUA{R3}",
        rightEffectCode: "RAGUA{R4}",
        progressionRate: 3,
        tier: 2,
        level: 3,
        upgradePoints: 0,
        power: "Protective",
        class: "Water",
      },
    },
  },
});

const setByPath = (obj, path, value) => {
  const keys = path.split(".");
  const next = { ...obj };

  let cursor = next;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      cursor[key] = value;
    } else {
      const current = cursor[key];
      cursor[key] = typeof current === "object" && current !== null ? { ...current } : {};
      cursor = cursor[key];
    }
  }

  return next;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);

  // "POST" a single value by path, eg: setGameValue("player.health", 80)
  const setGameValue = useCallback((path, value) => {
    setGameState((prev) => setByPath(prev, path, value));
  }, []);

  const loadGameState = useCallback((nextState) => {
    if (nextState == null || typeof nextState !== "object") {
      throw new Error("loadGameState: nextState must be an object");
    }
    setGameState(nextState);
  }, []);

  const increaseHealth = useCallback((amount) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, health: prev.player.health + amount },
    }));
  }, []);

  const decreaseHealth = useCallback((amount) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, health: prev.player.health - amount },
    }));
  }, []);

  const increaseMoney = useCallback((amount) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, money: prev.player.money + amount },
    }));
  }, []);

  const decreaseMoney = useCallback((amount) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, money: prev.player.money - amount },
    }));
  }, []);

  const setPassive = useCallback((value) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, passive: value },
    }));
  }, []);

  const increasePlayerLevel = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, level: prev.player.level + 1 },
    }));
  }, []);

  const setCavernSeed = useCallback((value) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, cavernSeed: value },
    }));
  }, []);

  const addEvent = useCallback((eventId, duration = null) => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        events: [...prev.player.events, { id: eventId, duration }],
      },
    }));
  }, []);

  const removeEvent = useCallback((eventId) => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        events: prev.player.events.filter((event) => event.id !== eventId),
      },
    }));
  }, []);

  const updateSpell = useCallback((slot, newSpell) => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        spells: {
          ...prev.player.spells,
          [slot]: newSpell,
        },
      },
    }));
  }, []);

  const value = useMemo(
    () => ({
      gameState,
      setGameState,
      setGameValue,
      loadGameState,
      increaseHealth,
      decreaseHealth,
      increaseMoney,
      decreaseMoney,
      setPassive,
      increasePlayerLevel,
      setCavernSeed,
      addEvent,
      removeEvent,
      updateSpell,
    }),
    [
      gameState,
      setGameValue,
      loadGameState,
      increaseHealth,
      decreaseHealth,
      increaseMoney,
      decreaseMoney,
      setPassive,
      increasePlayerLevel,
      setCavernSeed,
      addEvent,
      removeEvent,
      updateSpell,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
};
