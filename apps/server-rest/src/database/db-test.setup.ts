import fs from "fs/promises";
import os from "os";
import path from "path";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import Constant from "../constant";

function spawnDatabase(): Promise<StartedTestContainer> {
  return new GenericContainer("postgres:14")
    .withEnv("POSTGRES_USER", "postgres")
    .withEnv("POSTGRES_DB", "postgres")
    .withEnv("POSTGRES_PASSWORD", "secret")
    .withExposedPorts(5432)
    .withTmpFs({ "/temp_pgdata": "rw,noexec,nosuid,size=65536k" })
    .start();
}

async function shareDatabaseConfig(ctn: StartedTestContainer) {
  const varDir = path.join(os.tmpdir(), Constant.OsTempTestDir);

  await fs.mkdir(varDir, { recursive: true });
  await fs.writeFile(
    path.join(varDir, "databasePort"),
    ctn.getMappedPort(5432).toString()
  );
}

function shareContainerForTeardown(ctn: StartedTestContainer) {
  (globalThis as any).__DATABASE_CONTAINER__ = ctn;
}

async function setupDatabase(): Promise<void> {
  const ctn = await spawnDatabase();
  await shareDatabaseConfig(ctn);
  shareContainerForTeardown(ctn);
}

module.exports = setupDatabase;
