import { db } from "@/db";
import * as schema from "@/schema";
import char from "./briv.json";
import type { ClassType, DamageType, DefenseType, Stats } from "@/types";

async function insertCharacter() {
  const res = await db
    .insert(schema.character)
    .values({
      name: char.name,
      level: char.level,
      hitPoints: char.hitPoints,
      maxHitPoints: char.hitPoints,
      tempHitPoints: 0,
      str: char.stats.strength,
      dex: char.stats.dexterity,
      con: char.stats.constitution,
      int: char.stats.intelligence,
      wis: char.stats.wisdom,
      cha: char.stats.charisma,
    })
    .returning({ id: schema.character.id });

  const charId = res[0].id;
  console.log("Character ID:", charId);

  for (const charClass of char.classes) {
    await db.insert(schema.characterClass).values({
      name: charClass.name as ClassType,
      hitDie: charClass.hitDiceValue,
      classLevel: charClass.classLevel,
      character: charId,
    });
  }

  for (const item of char.items) {
    await db.insert(schema.item).values({
      name: item.name,
      affectedObject: "stats" as const,
      affectedValue: item.modifier.affectedValue as Stats,
      value: item.modifier.value,
      character: charId,
    });
  }

  for (const defense of char.defenses) {
    await db.insert(schema.defense).values({
      type: defense.type as DamageType,
      defense: defense.defense as DefenseType,
      character: charId,
    });
  }
  console.log("Character inserted!");
}

async function deleteCharacter() {
  await Promise.all([
    db.delete(schema.character).run(),
    db.run("DELETE FROM SQLITE_SEQUENCE"),
  ]);
}

export async function resetDb() {
  console.log("Resetting database...");
  await deleteCharacter();
  await insertCharacter();
}

await resetDb();
