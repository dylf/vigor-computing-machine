import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";
import { getCharacter } from "@/controllers/character";
import { applyDamage } from "@/controllers/damage";
import { applyHeal } from "@/controllers/heal";
import { applyTempHp } from "@/controllers/temp-hp";
import { db } from "@/db";
import { characterState, damageType } from "@/types";

const port = import.meta.env.PORT || 3000;
export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Vigor Computing Machine",
          version: "0.0.1",
        },
      },
    }),
  )
  .use(
    logger({
      level: "info",
      autoLogging: true,
    }),
  )
  .decorate("db", db)
  .get(
    "/",
    async ({ db, error }) => {
      const res = await getCharacter(db);
      if (!res) {
        // @ts-expect-error defining response schema causes this to error.
        return error(404, "Character not found");
      }
      return res;
    },
    {
      detail: {
        description: "Get the current character state",
      },
      response: characterState,
    },
  )
  .post(
    "/doDamage",
    async ({ db, error, body }) => {
      const res = await applyDamage(db, body.amount, body.type);
      if (!res) {
        // @ts-expect-error defining response schema causes this to error.
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
      response: t.Object({
        hitPoints: t.Number(),
        tempHitPoints: t.Number(),
      }),
      detail: {
        description: "Apply damage to the character",
      },
    },
  )
  .post(
    "/doHeal",
    async ({ db, error, body }) => {
      const res = await applyHeal(db, body.amount);
      if (!res) {
        // @ts-expect-error defining response schema causes this to error.
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
      response: t.Object({
        hitPoints: t.Number(),
      }),
      detail: {
        description: "Apply healing to the character",
      },
    },
  )
  .post(
    "/addTempHp",
    async ({ db, error, body }) => {
      const res = await applyTempHp(db, body.amount);
      if (!res) {
        // @ts-expect-error defining response schema causes this to error.
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
      response: t.Object({
        tempHitPoints: t.Number(),
      }),
      detail: {
        description: "Add temporary hit points to the character",
      },
    },
  )
  .listen(port);

console.log(
  `🐉 Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
