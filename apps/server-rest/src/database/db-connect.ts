import { Knex } from "knex";
import { config } from "../configuration";

import pg from "pg";

pg.types.setTypeParser(1082, (date: string) => date);

export const db = require("knex")({
  client: "pg",
  connection: config.database,
}) as Knex;
