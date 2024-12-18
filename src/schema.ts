import * as t from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import type { ClassType, DamageType, DefenseType, Stats } from "@/types";

export const character = t.sqliteTable("character", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text("name").notNull(),
  level: t.int().notNull(),
  hitPoints: t.int("hit_points").notNull(),
  maxHitPoints: t.int("max_hit_points").notNull(),
  tempHitPoints: t.int("temp_hit_points").notNull().default(0),
  str: t.int().notNull(),
  dex: t.int().notNull(),
  con: t.int().notNull(),
  int: t.int().notNull(),
  wis: t.int().notNull(),
  cha: t.int().notNull(),
});

export const characterRelations = relations(character, ({ many }) => ({
  defenses: many(defense),
  items: many(item),
  classes: many(characterClass),
}));

export const characterClass = t.sqliteTable("class", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().$type<ClassType>().notNull(),
  hitDie: t.int("hit_die").notNull(),
  classLevel: t.int("class_level").notNull(),
  character: t
    .int()
    .references(() => character.id, { onDelete: "cascade" })
    .notNull(),
});

export const characterClassRelations = relations(characterClass, ({ one }) => ({
  character: one(character, {
    fields: [characterClass.character],
    references: [character.id],
  }),
}));

export const item = t.sqliteTable("item", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  // This prototype only supports items that affect stats.
  affectedObject: t.text("affected_object").$type<"stats">().notNull(),
  affectedValue: t.text("affected_value").$type<Stats>().notNull(),
  value: t.int().notNull(),
  character: t
    .int()
    .references(() => character.id, { onDelete: "cascade" })
    .notNull(),
});

export const itemRelations = relations(item, ({ one }) => ({
  character: one(character, {
    fields: [item.character],
    references: [character.id],
  }),
}));

export const defense = t.sqliteTable("defense", {
  id: t.int().primaryKey({ autoIncrement: true }),
  type: t.text().$type<DamageType>().notNull(),
  defense: t.text().$type<DefenseType>().notNull(),
  character: t
    .int()
    .references(() => character.id, { onDelete: "cascade" })
    .notNull(),
});

export const defenseRelations = relations(defense, ({ one }) => ({
  character: one(character, {
    fields: [defense.character],
    references: [character.id],
  }),
}));
