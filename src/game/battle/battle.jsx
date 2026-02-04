import { useEffect, useState } from "react";

import { randomInt } from "../../engine/utils/rng/rng";
import {
  checkEndTurnEffects,
  checkRollEffects,
  checkStartBattleEffects,
  checkStartTurnEffects,
  deathCheck,
} from "./components/battleEngine";
import { effectDecoder } from "./components/spells";
import StartTurnPanel from "./components/panels/startTurnPanel/startTurnPanel";
import TriggerSpellPanel from "./components/panels/triggerSpellPanel/triggerSpellPanel";
import EndTurnPanel from "./components/panels/endTurnPanel/endTurnPanel";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getNextTurnOwner = (turnOwner) =>
  turnOwner === "player" ? "enemy" : "player";

export default function Battle({ player = null, enemies = null, biome = "none" }) {
  const [phase, setPhase] = useState("startTurn");
  const [turnOwner, setTurnOwner] = useState("player");
  const [roll, setRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [effectCode, setEffectCode] = useState(null);
  const [animatingEffectCode, setAnimatingEffectCode] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    checkStartBattleEffects({ player, enemies, biome });
    startTurn("player");
  }, []);

  const startTurn = async (owner) => {
    setTurnOwner(owner);
    setPhase("startTurn");
    setRoll(null);
    setEffectCode(null);
    setIsRolling(false);
    setAnimatingEffectCode(null);

    checkStartTurnEffects({ turnOwner: owner });

    if (owner === "enemy") {
      await startDiceRoll(owner);
    }
  };

  const startDiceRoll = async (owner) => {
    setIsRolling(true);
    setRoll(null);
    await delay(1000);

    const result = randomInt(1, 6);
    setRoll(result);
    setIsRolling(false);

    checkRollEffects({ turnOwner: owner, roll: result });

    const nextEffectCode = `ID${result}`;
    setEffectCode(nextEffectCode);
    setPhase("triggerSpell");

    if (owner === "enemy") {
      await delay(300);
      await calculateSpellEffects(nextEffectCode, result, owner);
    }
  };

  const calculateSpellEffects = async (nextEffectCode, result, owner) => {
    console.log("Calculating spell effects", {
      effectCode: nextEffectCode,
      roll: result,
      turnOwner: owner,
    });

    await effectDecoder(nextEffectCode, { roll: result, turnOwner: owner });

    console.log("Animating spell effect", { effectCode: nextEffectCode });
    setAnimatingEffectCode(nextEffectCode);
    setPhase("animating");
    await delay(2000);

    const diedFromSpell = deathCheck();
    if (diedFromSpell) {
      return;
    }

    checkEndTurnEffects({ turnOwner: owner });

    const diedFromEndEffects = deathCheck();
    if (diedFromEndEffects) {
      return;
    }

    setPhase("endTurn");
  };

  const handleEndTurnConfirm = () => {
    const nextOwner = getNextTurnOwner(turnOwner);
    startTurn(nextOwner);
  };

  const nextTurnLabel =
    getNextTurnOwner(turnOwner) === "player" ? "Players Turn" : "Enemies Turn";

  return (
    <div className={`battle battle-biome-${biome}`}>
      <div className="battle-panel">
        {phase === "animating" && (
          <div className="battle-animating">
            animating {animatingEffectCode ?? effectCode}
          </div>
        )}
        {phase === "startTurn" && turnOwner === "player" && (
          <StartTurnPanel onRoll={() => startDiceRoll(turnOwner)} isRolling={isRolling} roll={roll} />
        )}
        {phase === "startTurn" && turnOwner === "enemy" && (
          <div className="battle-panel-content start-turn-panel">
            <div className="panel-title">Enemies Turn</div>
            <div className="panel-status">Rolling...</div>
          </div>
        )}
        {phase === "triggerSpell" && (
          <TriggerSpellPanel
            onTrigger={(code) => {
              setEffectCode(code);
              calculateSpellEffects(code, roll, turnOwner);
            }}
            effectCode={effectCode}
            roll={roll}
          />
        )}
        {phase === "endTurn" && (
          <EndTurnPanel nextTurnLabel={nextTurnLabel} onConfirm={handleEndTurnConfirm} />
        )}
      </div>
    </div>
  );
}
