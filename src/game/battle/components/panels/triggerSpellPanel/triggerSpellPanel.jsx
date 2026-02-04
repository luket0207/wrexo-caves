import { useMemo, useState } from "react";

const EFFECT_DEFINITIONS = [
  { base: "ATT", label: "Attack", params: [{ key: "amount" }] },
  { base: "PAT", label: "Prep Attack", params: [{ key: "amount" }] },
  { base: "GUA", label: "Guard", params: [{ key: "amount" }] },
  {
    base: "BAL",
    label: "Buff Attack (Left)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BGL",
    label: "Buff Guard (Left)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BFL",
    label: "Buff Attack/Guard (Left)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BAR",
    label: "Buff Attack (Right)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BGR",
    label: "Buff Guard (Right)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BFR",
    label: "Buff Attack/Guard (Right)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BAG",
    label: "Buff Attack (Greater)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BGG",
    label: "Buff Guard (Greater)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BFG",
    label: "Buff Attack/Guard (Greater)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BAF",
    label: "Buff Attack (Fewer)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BGF",
    label: "Buff Guard (Fewer)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BFF",
    label: "Buff Attack/Guard (Fewer)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BAA",
    label: "Buff Attack (All Other)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BGA",
    label: "Buff Guard (All Other)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  {
    base: "BFA",
    label: "Buff Attack/Guard (All Other)",
    params: [
      { key: "buffAmount" },
      { key: "duration", token: "D" },
      { key: "targetTier", token: "T" },
      { key: "buffClass", token: "C" },
    ],
  },
  { base: "STU", label: "Stun", params: [{ key: "duration" }] },
  { base: "FRZ", label: "Freeze", params: [{ key: "duration" }] },
  {
    base: "CON",
    label: "Confuse",
    params: [
      { key: "markedSlots" },
      { key: "damageAmount", token: "D" },
    ],
  },
  { base: "HEA", label: "Heal", params: [{ key: "amount" }] },
  { base: "EMP", label: "Empower", params: [{ key: "duration" }] },
  {
    base: "CAL",
    label: "Charge Attack (Left)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CGL",
    label: "Charge Guard (Left)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CHL",
    label: "Charge Attack/Guard (Left)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CAR",
    label: "Charge Attack (Right)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CGR",
    label: "Charge Guard (Right)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CHR",
    label: "Charge Attack/Guard (Right)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CAG",
    label: "Charge Attack (Greater)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CGG",
    label: "Charge Guard (Greater)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CHG",
    label: "Charge Attack/Guard (Greater)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CAF",
    label: "Charge Attack (Fewer)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CGF",
    label: "Charge Guard (Fewer)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CHF",
    label: "Charge Attack/Guard (Fewer)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CAA",
    label: "Charge Attack (All Other)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CGA",
    label: "Charge Guard (All Other)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
  {
    base: "CHA",
    label: "Charge Attack/Guard (All Other)",
    params: [
      { key: "chargeAmount" },
      { key: "targetTier", token: "T" },
      { key: "chargeClass", token: "C" },
    ],
  },
];

const buildEffectCode = (definition, inputs, meta, includeRollAgain) => {
  const parts = [definition.base];

  definition.params.forEach((param, index) => {
    const value = inputs[param.key];
    if (index === 0) {
      parts.push(`{${value}}`);
    } else {
      parts.push(`${param.token}{${value}}`);
    }
  });

  const suffix = `-${meta.tier}${meta.level}${meta.progressionRate}`;
  const code = `${parts.join("")}${suffix}`;
  return includeRollAgain ? `RA${code}` : code;
};

export default function TriggerSpellPanel({ onTrigger, effectCode, roll }) {
  const [selectedBase, setSelectedBase] = useState(EFFECT_DEFINITIONS[0].base);
  const [includeRollAgain, setIncludeRollAgain] = useState(false);
  const [inputs, setInputs] = useState({});
  const [meta, setMeta] = useState({
    tier: "",
    level: "",
    progressionRate: "",
  });

  const selectedDefinition = useMemo(
    () => EFFECT_DEFINITIONS.find((entry) => entry.base === selectedBase),
    [selectedBase]
  );

  const allParamKeys = selectedDefinition?.params.map((param) => param.key) ?? [];
  const hasAllParams = allParamKeys.every((key) => inputs[key]?.trim());
  const hasMeta =
    meta.tier.toString().trim() &&
    meta.level.toString().trim() &&
    meta.progressionRate.toString().trim();
  const canTrigger = Boolean(hasAllParams && hasMeta && selectedDefinition);

  const assembledCode = selectedDefinition
    ? buildEffectCode(selectedDefinition, inputs, meta, includeRollAgain)
    : "";

  const handleSelectChange = (event) => {
    const nextBase = event.target.value;
    setSelectedBase(nextBase);
    setInputs({});
  };

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleMetaChange = (key, value) => {
    setMeta((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="battle-panel-content trigger-spell-panel">
      <div className="panel-title">Trigger Spell</div>
      <div className="panel-status">
        Effect: {effectCode ?? "None"} | Roll: {roll ?? "-"}
      </div>
      <label className="panel-field">
        Effect code
        <select value={selectedBase} onChange={handleSelectChange}>
          {EFFECT_DEFINITIONS.map((definition) => (
            <option key={definition.base} value={definition.base}>
              {definition.base} - {definition.label}
            </option>
          ))}
        </select>
      </label>
      <label className="panel-field">
        Tier
        <input
          type="text"
          value={meta.tier}
          onChange={(event) => handleMetaChange("tier", event.target.value)}
          placeholder="2"
        />
      </label>
      <label className="panel-field">
        Level
        <input
          type="text"
          value={meta.level}
          onChange={(event) => handleMetaChange("level", event.target.value)}
          placeholder="4"
        />
      </label>
      <label className="panel-field">
        Progression rate
        <input
          type="text"
          value={meta.progressionRate}
          onChange={(event) => handleMetaChange("progressionRate", event.target.value)}
          placeholder="1"
        />
      </label>
      {selectedDefinition?.params.map((param) => (
        <label key={param.key} className="panel-field">
          {param.key}
          <input
            type="text"
            value={inputs[param.key] ?? ""}
            onChange={(event) => handleInputChange(param.key, event.target.value)}
            placeholder="R1 / 3 / max(2)"
          />
        </label>
      ))}
      <label className="panel-field">
        Roll Again prefix (RA)
        <input
          type="checkbox"
          checked={includeRollAgain}
          onChange={(event) => setIncludeRollAgain(event.target.checked)}
        />
      </label>
      <div className="panel-status">Assembled: {assembledCode}</div>
      <button type="button" onClick={() => onTrigger(assembledCode)} disabled={!canTrigger}>
        Trigger
      </button>
    </div>
  );
}
