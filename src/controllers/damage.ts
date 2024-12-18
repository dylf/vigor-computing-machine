import { eq } from "drizzle-orm";
import { character } from "@/schema";
import type { DbConnection } from "@/db";
import type { DamageType } from "@/types";

export async function applyDamage(
  db: DbConnection,
  damage: number,
  damageType: DamageType,
  characterId = 1,
) {
  const char = await db.query.character.findFirst({
    where: (character, { eq }) => eq(character.id, characterId),
    with: {
      defenses: true,
    },
  });

  if (!char) {
    return null;
  }

  // Check defenses
  const defense = char.defenses.find((d) => d.type === damageType);
  if (defense) {
    switch (defense.defense) {
      case "resistance":
        damage = Math.floor(damage / 2);
        break;
      case "immunity":
        damage = 0;
        break;
    }
  }

  const newTempHp = Math.max(0, char.tempHitPoints - damage);
  const remainingDamage = Math.abs(Math.min(0, char.tempHitPoints - damage));
  const newHp = Math.max(0, char.hitPoints - remainingDamage);

  await db
    .update(character)
    .set({ hitPoints: newHp, tempHitPoints: newTempHp })
    .where(eq(character.id, characterId));

  return {
    hitPoints: newHp,
    tempHitPoints: newTempHp,
  };
}
