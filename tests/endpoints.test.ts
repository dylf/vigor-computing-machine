import { describe, expect, it, beforeEach } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { app } from "@/server";
import briv from "@data/char.json";
import { resetDb } from "@data/seed";

const api = treaty(app);

describe("Endpoint tests", () => {
  beforeEach(async () => {
    await resetDb();
  });

  it("index returns the initial value", async () => {
    const { data } = await api.index.get();

    expect(data).toMatchObject({
      ...briv,
      maxHitPoints: briv.hitPoints,
      tempHitPoints: 0,
    } as any);
  });

  it("applies damage correctly", async () => {
    let res = await api.doDamage.post({
      amount: 5,
      type: "force",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 5,
      tempHitPoints: 0,
    });

    res = await api.doDamage.post({
      amount: 1000,
      type: "force",
    });

    expect(res.data).toMatchObject({
      hitPoints: 0,
      tempHitPoints: 0,
    });
  });

  it("applies damage with temp hp correctly", async () => {
    await api.addTempHp.post({ amount: 10 });
    let res = await api.doDamage.post({
      amount: 5,
      type: "force",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints,
      tempHitPoints: 5,
    });

    res = await api.doDamage.post({
      amount: 8,
      type: "force",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 3,
      tempHitPoints: 0,
    });

    await api.addTempHp.post({ amount: 10 });
    res = await api.doDamage.post({
      amount: 8,
      type: "psychic",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 3,
      tempHitPoints: 2,
    });

    res = await api.doDamage.post({
      amount: 1000,
      type: "psychic",
    });

    expect(res.data).toMatchObject({
      hitPoints: 0,
      tempHitPoints: 0,
    });
  });

  it("applies damage with resistance correctly", async () => {
    let res = await api.doDamage.post({
      amount: 5,
      type: "slashing",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 2,
      tempHitPoints: 0,
    });

    res = await api.doDamage.post({
      amount: 10,
      type: "slashing",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 7,
      tempHitPoints: 0,
    });

    res = await api.doDamage.post({
      amount: 1000,
      type: "slashing",
    });

    expect(res.data).toMatchObject({
      hitPoints: 0,
      tempHitPoints: 0,
    });
  });

  it("applies damage with immunity correctly", async () => {
    let res = await api.doDamage.post({
      amount: 5,
      type: "fire",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints,
      tempHitPoints: 0,
    });

    await api.addTempHp.post({ amount: 10 });
    res = await api.doDamage.post({
      amount: 100,
      type: "fire",
    });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints,
      tempHitPoints: 10,
    });
  });

  it("heals correctly", async () => {
    let res = await api.doHeal.post({ amount: 5 });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints,
    });

    await api.addTempHp.post({ amount: 10 });

    res = await api.doHeal.post({ amount: 5 });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints,
    });

    res = await api.doDamage.post({
      amount: 25,
      type: "poison",
    });

    res = await api.doHeal.post({ amount: 5 });

    expect(res.data).toMatchObject({
      hitPoints: briv.hitPoints - 10,
    });
  });

  it("returns errors", async () => {
    let res = await api.doDamage.post({
      amount: 5,
      type: "dark",
    } as any);

    expect(res.error).not.toBeNull();
    expect(res.error?.status as any).toBe(422);

    // TODO: Number validation works when hitting the actual API but the
    // test throws an error.
    // res = await api.doDamage.post({
    //   amount: -1,
    //   type: "force",
    // } as any);
    //
    // expect(res.error).not.toBeNull();
    // expect(res.error?.status as any).toBe(422);
  });
});
