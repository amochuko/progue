import { Knex } from "knex";
import { getProductionConfig } from "../get-production-config";

describe("the production config", () => {
  it("reads the database config form the environment", () => {
    expect(
      getProductionConfig({
        JWKS_URL: "",
        DATABASE_URL: "postgresql://username:password@host:port/dname",
      })
    ).toHaveProperty("database", {
      connectionString: "postgresql://username:password@host:port/dname",
      ssl: true,
    } as Knex.PgConnectionConfig);
  });
});
