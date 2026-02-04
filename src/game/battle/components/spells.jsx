import { randomInt } from "../../../engine/utils/rng/rng";

const RANGED_TABLE = {
  1: { min: 1, max: 18 },
  2: { min: 3, max: 24 },
  3: { min: 5, max: 26 },
  4: { min: 7, max: 32 },
  5: { min: 10, max: 34 },
  6: { min: 12, max: 40 },
  7: { min: 15, max: 42 },
  8: { min: 17, max: 48 },
  9: { min: 20, max: 50 },
  10: { min: 22, max: 56 },
};

export const calculateRangedValue = (rNumber, tier, level, progressionRate) => {
  const entry = RANGED_TABLE[rNumber];
  if (!entry) {
    console.log(`Invalid ranged value R${rNumber}`);
    return null;
  }

  const min = entry.min;
  const max = entry.max;
  const pr = progressionRate ?? 1;
  const t = tier ?? 1;
  const l = level ?? 1;

  return Math.round(
    min +
      (max - min) *
        ((1 - (0.25 + (pr - 1) / 8)) * ((t - 1) / 2) +
          (0.25 + (pr - 1) / 8) * ((l - 1) / 4))
  );
};

const parseEffectCode = (effectCode) => {
  let code = effectCode;
  let tier = null;
  let level = null;
  let progressionRate = null;

  const suffixMatch = code.match(/-(\d)(\d)(\d)$/);
  if (suffixMatch) {
    tier = Number(suffixMatch[1]);
    level = Number(suffixMatch[2]);
    progressionRate = Number(suffixMatch[3]);
    code = code.slice(0, -4);
  }

  let rollAgain = false;
  if (code.startsWith("RA")) {
    rollAgain = true;
    code = code.slice(2);
  }

  const firstBraceIndex = code.indexOf("{");
  const base = firstBraceIndex === -1 ? code : code.slice(0, firstBraceIndex);
  const remainder = firstBraceIndex === -1 ? "" : code.slice(firstBraceIndex);

  let firstValue = null;
  const tokenValues = {};

  const regex = /([A-Z])?\{([^}]*)\}/g;
  let match;
  while ((match = regex.exec(remainder)) !== null) {
    const token = match[1];
    const raw = match[2];
    if (!token && firstValue === null) {
      firstValue = raw;
    } else if (token) {
      tokenValues[token] = raw;
    }
  }

  return {
    base,
    firstValue,
    tokenValues,
    tier,
    level,
    progressionRate,
    rollAgain,
  };
};

const resolveValue = (raw, meta) => {
  if (raw == null) return null;

  const rangedMatch = raw.match(/^R(\d{1,2})$/);
  if (rangedMatch) {
    return calculateRangedValue(
      Number(rangedMatch[1]),
      meta.tier,
      meta.level,
      meta.progressionRate
    );
  }

  const maxMatch = raw.match(/^max\((\d+)\)$/);
  if (maxMatch) {
    const maxValue = Number(maxMatch[1]);
    return Array.from({ length: maxValue }, (_, idx) => idx + 1);
  }

  if (/^\d+$/.test(raw)) {
    return Number(raw);
  }

  return raw;
};

const spellAttack = (params) => {
  console.log("spellAttack", params);
};
const spellPrepAttack = (params) => {
  console.log("spellPrepAttack", params);
};
const spellGuard = (params) => {
  console.log("spellGuard", params);
};
const spellBuffAttackLeft = (params) => {
  console.log("spellBuffAttackLeft", params);
};
const spellBuffGuardLeft = (params) => {
  console.log("spellBuffGuardLeft", params);
};
const spellBuffAndGuardLeft = (params) => {
  console.log("spellBuffAndGuardLeft", params);
};
const spellBuffAttackRight = (params) => {
  console.log("spellBuffAttackRight", params);
};
const spellBuffGuardRight = (params) => {
  console.log("spellBuffGuardRight", params);
};
const spellBuffAndGuardRight = (params) => {
  console.log("spellBuffAndGuardRight", params);
};
const spellBuffAttackGreater = (params) => {
  console.log("spellBuffAttackGreater", params);
};
const spellBuffGuardGreater = (params) => {
  console.log("spellBuffGuardGreater", params);
};
const spellBuffAndGuardGreater = (params) => {
  console.log("spellBuffAndGuardGreater", params);
};
const spellBuffAttackFewer = (params) => {
  console.log("spellBuffAttackFewer", params);
};
const spellBuffGuardFewer = (params) => {
  console.log("spellBuffGuardFewer", params);
};
const spellBuffAndGuardFewer = (params) => {
  console.log("spellBuffAndGuardFewer", params);
};
const spellBuffAttackAllOther = (params) => {
  console.log("spellBuffAttackAllOther", params);
};
const spellBuffGuardAllOther = (params) => {
  console.log("spellBuffGuardAllOther", params);
};
const spellBuffAndGuardAll = (params) => {
  console.log("spellBuffAndGuardAll", params);
};
const spellStun = (params) => {
  console.log("spellStun", params);
};
const spellFreeze = (params) => {
  console.log("spellFreeze", params);
};
const spellConfuse = (params) => {
  console.log("spellConfuse", params);
};
const spellHeal = (params) => {
  console.log("spellHeal", params);
};
const spellEmpower = (params) => {
  console.log("spellEmpower", params);
};
const spellChargeAttackLeft = (params) => {
  console.log("spellChargeAttackLeft", params);
};
const spellChargeGuardLeft = (params) => {
  console.log("spellChargeGuardLeft", params);
};
const spellChargeAttackAndGuardLeft = (params) => {
  console.log("spellChargeAttackAndGuardLeft", params);
};
const spellChargeAttackRight = (params) => {
  console.log("spellChargeAttackRight", params);
};
const spellChargeGuardRight = (params) => {
  console.log("spellChargeGuardRight", params);
};
const spellChargeAttackAndGuardRight = (params) => {
  console.log("spellChargeAttackAndGuardRight", params);
};
const spellChargeAttackGreater = (params) => {
  console.log("spellChargeAttackGreater", params);
};
const spellChargeGuardGreater = (params) => {
  console.log("spellChargeGuardGreater", params);
};
const spellChargeAttackAndGuardGreater = (params) => {
  console.log("spellChargeAttackAndGuardGreater", params);
};
const spellChargeAttackFewer = (params) => {
  console.log("spellChargeAttackFewer", params);
};
const spellChargeGuardFewer = (params) => {
  console.log("spellChargeGuardFewer", params);
};
const spellChargeAttackAndGuardFewer = (params) => {
  console.log("spellChargeAttackAndGuardFewer", params);
};
const spellChargeAttackAllOther = (params) => {
  console.log("spellChargeAttackAllOther", params);
};
const spellChargeGuardAllOther = (params) => {
  console.log("spellChargeGuardAllOther", params);
};
const spellChargeAttackAndGuardAllOther = (params) => {
  console.log("spellChargeAttackAndGuardAllOther", params);
};
const spellId1 = (params) => {
  console.log("spellId1", params);
};
const spellId2 = (params) => {
  console.log("spellId2", params);
};
const spellId3 = (params) => {
  console.log("spellId3", params);
};
const spellId4 = (params) => {
  console.log("spellId4", params);
};
const spellId5 = (params) => {
  console.log("spellId5", params);
};
const spellId6 = (params) => {
  console.log("spellId6", params);
};

const handlers = {
  ATT: spellAttack,
  PAT: spellPrepAttack,
  GUA: spellGuard,
  BAL: spellBuffAttackLeft,
  BGL: spellBuffGuardLeft,
  BFL: spellBuffAndGuardLeft,
  BAR: spellBuffAttackRight,
  BGR: spellBuffGuardRight,
  BFR: spellBuffAndGuardRight,
  BAG: spellBuffAttackGreater,
  BGG: spellBuffGuardGreater,
  BFG: spellBuffAndGuardGreater,
  BAF: spellBuffAttackFewer,
  BGF: spellBuffGuardFewer,
  BFF: spellBuffAndGuardFewer,
  BAA: spellBuffAttackAllOther,
  BGA: spellBuffGuardAllOther,
  BFA: spellBuffAndGuardAll,
  STU: spellStun,
  FRZ: spellFreeze,
  CON: spellConfuse,
  HEA: spellHeal,
  EMP: spellEmpower,
  CAL: spellChargeAttackLeft,
  CGL: spellChargeGuardLeft,
  CHL: spellChargeAttackAndGuardLeft,
  CAR: spellChargeAttackRight,
  CGR: spellChargeGuardRight,
  CHR: spellChargeAttackAndGuardRight,
  CAG: spellChargeAttackGreater,
  CGG: spellChargeGuardGreater,
  CHG: spellChargeAttackAndGuardGreater,
  CAF: spellChargeAttackFewer,
  CGF: spellChargeGuardFewer,
  CHF: spellChargeAttackAndGuardFewer,
  CAA: spellChargeAttackAllOther,
  CGA: spellChargeGuardAllOther,
  CHA: spellChargeAttackAndGuardAllOther,
  ID1: spellId1,
  ID2: spellId2,
  ID3: spellId3,
  ID4: spellId4,
  ID5: spellId5,
  ID6: spellId6,
};

export const effectDecoder = async (effectCode, context = {}) => {
  const parsed = parseEffectCode(effectCode);
  const meta = {
    tier: parsed.tier,
    level: parsed.level,
    progressionRate: parsed.progressionRate,
  };

  console.log("Decoding effect code", { effectCode, ...meta });

  if (parsed.rollAgain) {
    const rollAgainResult = randomInt(1, 6);
    console.log("Roll Again result", rollAgainResult);
    if (rollAgainResult % 2 === 1) {
      console.log("Roll Again failed. Spell did not trigger.");
      return { success: false, rollAgainResult };
    }
  }

  const base = parsed.base;
  const handler = handlers[base];
  if (!handler) {
    console.log(`No spell handler found for ${base}`);
    return { success: false };
  }

  const resolvedFirst = resolveValue(parsed.firstValue, meta);
  const resolvedDuration = resolveValue(parsed.tokenValues.D, meta);
  const resolvedTargetTier = resolveValue(parsed.tokenValues.T, meta);
  const resolvedMarkedSlots = resolveValue(parsed.tokenValues.M, meta);
  const resolvedDamage = resolveValue(parsed.tokenValues.D, meta);

  const resolvedParams = {
    tier: meta.tier,
    level: meta.level,
    progressionRate: meta.progressionRate,
  };

  if (["ATT", "PAT", "GUA", "HEA"].includes(base)) {
    resolvedParams.amount = resolvedFirst;
  } else if (["STU", "FRZ", "EMP"].includes(base)) {
    resolvedParams.duration = resolvedFirst;
  } else if (base === "CON") {
    resolvedParams.markedSlots = resolvedFirst ?? resolvedMarkedSlots;
    resolvedParams.damageAmount = resolvedDamage;
  } else if (base.startsWith("B")) {
    resolvedParams.buffAmount = resolvedFirst;
    resolvedParams.duration = resolvedDuration;
    resolvedParams.targetTier = resolvedTargetTier;
    resolvedParams.buffClass = parsed.tokenValues.C ?? null;
  } else if (base.startsWith("C")) {
    resolvedParams.chargeAmount = resolvedFirst;
    resolvedParams.targetTier = resolvedTargetTier;
    resolvedParams.chargeClass = parsed.tokenValues.C ?? null;
  }

  handler({ ...resolvedParams, ...context });
  return { success: true, base, params: resolvedParams };
};
