import { Elysia, t } from "elysia";
import { getCharacter } from "@/controllers/character";
import { applyDamage } from "@/controllers/damage";
import { applyHeal } from "@/controllers/heal";
import { applyTempHp } from "@/controllers/temp-hp";
import { db } from "@/db";
import { damageType } from "./types";

const port = import.meta.env.PORT || 3000;
export const app = new Elysia()
  .decorate("db", db)
  .get("/", async ({ db, error }) => {
    const res = await getCharacter(db);
    if (!res) {
      return error(404, "Character not found");
    }
    return res;
  })
  .post(
    "/doDamage",
    async ({ db, error, body }) => {
      const res = await applyDamage(db, body.amount, body.type);
      if (!res) {
        return error(404, "Character not found");
      }
      return res;
    },
    {
      body: t.Object({
        amount: t.Number({
          minimum: 0,
          error() {
            return "Amount must be a positive number";
          },
        }),
        type: damageType,
      }),
    },
  )
  .post(
    "/doHeal",
    async ({ db, error, body }) => {
      const res = await applyHeal(db, body.amount);
      if (!res) {
        return error(404, "Character not found");
      }
      return res;
    },
    {
      body: t.Object({
        amount: t.Number({
          minimum: 0,
          error() {
            return "Amount must be a positive number";
          },
        }),
      }),
    },
  )
  .post(
    "/addTempHp",
    async ({ db, error, body }) => {
      const res = await applyTempHp(db, body.amount);
      if (!res) {
        return error(404, "Character not found");
      }
      return res;
    },
    {
      body: t.Object({
        amount: t.Number({
          minimum: 0,
          error() {
            return "Amount must be a positive number";
          },
        }),
      }),
    },
  )
  .listen(port);

console.log(
  `🐉 Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
