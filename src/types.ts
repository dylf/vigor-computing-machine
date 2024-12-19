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

export const classType = t.Union([
  t.Literal("barbarian"),
  t.Literal("bard"),
  t.Literal("cleric"),
  t.Literal("druid"),
  t.Literal("fighter"),
  t.Literal("monk"),
  t.Literal("paladin"),
  t.Literal("ranger"),
  t.Literal("rogue"),
  t.Literal("sorcerer"),
  t.Literal("warlock"),
  t.Literal("wizard"),
]);

export type ClassType = Static<typeof classType>;

export const stats = t.Union([
  t.Literal("strength"),
  t.Literal("dexterity"),
  t.Literal("constitution"),
  t.Literal("intelligence"),
  t.Literal("wisdom"),
  t.Literal("charisma"),
]);
export type Stats = Static<typeof stats>;

export const defenseType = t.Union([
  t.Literal("immunity"),
  t.Literal("resistance"),
  t.Literal("vulnerability"),
]);

export const characterState = t.Object({
  name: t.String(),
  level: t.Number(),
  hitPoints: t.Number(),
  tempHitPoints: t.Number(),
  maxHitPoints: t.Number(),
  classes: t.Array(
    t.Object({
      name: classType,
      hitDiceValue: t.Number(),
      classLevel: t.Number(),
    }),
  ),
  stats: t.Object({
    strength: t.Number(),
    dexterity: t.Number(),
    constitution: t.Number(),
    intelligence: t.Number(),
    wisdom: t.Number(),
    charisma: t.Number(),
  }),
  items: t.Array(
    t.Object({
      name: t.String(),
      modifier: t.Object({
        affectedObject: t.String(),
        affectedValue: t.String(),
        value: t.Number(),
      }),
    }),
  ),
  defenses: t.Array(
    t.Object({
      type: damageType,
      defense: defenseType,
    }),
  ),
});
