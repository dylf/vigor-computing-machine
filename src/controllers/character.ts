import type { DbConnection } from "@/db";

export async function getCharacter(db: DbConnection, characterId = 1) {
  const char = await db.query.character.findFirst({
    where: (character, { eq }) => eq(character.id, characterId),
    with: {
      classes: true,
      items: true,
      defenses: true,
    },
  });

  if (!char) {
    return null;
  }

  return {
    name: char.name,
    level: char.level,
    hitPoints: char.hitPoints,
    tempHitPoints: char.tempHitPoints,
    maxHitPoints: char.maxHitPoints,
    classes: char.classes.map((c) => ({
      name: c.name,
      hitDiceValue: c.hitDie,
      classLevel: c.classLevel,
    })),
    stats: {
      strength: char.str,
      dexterity: char.dex,
      constitution: char.con,
      intelligence: char.int,
      wisdom: char.wis,
      charisma: char.cha,
    },
    items: char.items.map((i) => ({
      name: i.name,
      modifier: {
        affectedObject: i.affectedObject,
        affectedValue: i.affectedValue,
        value: i.value,
      },
    })),
    defenses: char.defenses.map(({ type, defense }) => ({
      type,
      defense,
    })),
  };
}
