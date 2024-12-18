import { t } from "elysia";
import type { Static } from "elysia";

export const damageType = t.Union([
  t.Literal("bludgeoning"),
  t.Literal("piercing"),
  t.Literal("slashing"),
  t.Literal("fire"),
  t.Literal("cold"),
  t.Literal("acid"),
  t.Literal("thunder"),
  t.Literal("lightning"),
  t.Literal("poison"),
  t.Literal("radiant"),
  t.Literal("necrotic"),
  t.Literal("psychic"),
  t.Literal("force"),
]);

export type DamageType = Static<typeof damageType>;

// export type DamageType =
//   | "bludgeoning"
//   | "piercing"
//   | "slashing"
//   | "fire"
//   | "cold"
//   | "acid"
//   | "thunder"
//   | "lightning"
//   | "poison"
//   | "radiant"
//   | "necrotic"
//   | "psychic"
//   | "force";

// Could support more but just adding basic classes for the purpose
// of this.
export type ClassType =
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard";

export type Stats =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type DefenseType = "immunity" | "resistance" | "vulnerability";
