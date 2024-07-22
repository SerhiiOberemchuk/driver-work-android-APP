export const DB_NAME = "databaseDriver";
export const TABLE_USER = "driver";
export const TABLE_TRACK = "track";

export interface Driver {
  name: string;
  surname: string;
}
export interface Track {
  track: string;
  trailer: string;
}
