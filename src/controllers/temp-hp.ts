import { eq } from "drizzle-orm";
import { character } from "@/schema";
import type { DbConnection } from "@/db";

export async function applyTempHp(
  db: DbConnection,
  hp: number,
  characterId = 1,
) {
  const char = await db.query.character.findFirst({
    where: (character, { eq }) => eq(character.id, characterId),
  });

  if (!char) {
    return null;
  }

  const newTempHp = char.tempHitPoints + hp;

  await db
    .update(character)
    .set({ tempHitPoints: newTempHp })
    .where(eq(character.id, characterId));

  return {
    tempHitPoints: newTempHp,
  };
}
