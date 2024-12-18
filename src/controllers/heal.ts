import { eq } from "drizzle-orm";
import { character } from "@/schema";
import type { DbConnection } from "@/db";

export async function applyHeal(db: DbConnection, hp: number, characterId = 1) {
  const char = await db.query.character.findFirst({
    where: (character, { eq }) => eq(character.id, characterId),
  });

  if (!char) {
    return null;
  }

  const newHp = Math.min(char.maxHitPoints, char.hitPoints + hp);

  await db
    .update(character)
    .set({ hitPoints: newHp })
    .where(eq(character.id, characterId));

  return {
    hitPoints: newHp,
  };
}
