import * as SQLite from "expo-sqlite";
import { DB_NAME, TABLE_TRACK, TABLE_USER } from "./types";

export const createDbDriver = () => {
  const db = SQLite.openDatabaseSync(DB_NAME);
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ${TABLE_USER} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, surname TEXT NOT NULL)`);
};

export const createDbTrack = () => {
  const db = SQLite.openDatabaseSync(DB_NAME);
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ${TABLE_TRACK} (id INTEGER PRIMARY KEY NOT NULL, track TEXT NOT NULL, trailer TEXT NOT NULL)`);
};

export const addUser = async (name: string, surname: string) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const result = await db.runAsync(
    `INSERT INTO ${TABLE_USER} (name, surname) VALUES (?, ?)`,
    name,
    surname
  );

  console.log(result);
  return result;
};

export const addTrack = async (track: string, trailer: string) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);

  const result = await db.runAsync(
    `INSERT INTO ${TABLE_TRACK} (track, trailer) VALUES (?, ?)`,
    track,
    trailer
  );

  console.log(result);
  return result;
};
// `getFirstAsync()` is useful when you want to get a single row from the database.
// const firstRow = await db.getFirstAsync("SELECT * FROM test");
// console.log(firstRow.id, firstRow.value, firstRow.intValue);

// `getAllAsync()` is useful when you want to get all results as an array of objects.
