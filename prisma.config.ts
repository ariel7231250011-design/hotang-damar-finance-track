import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // per dok resmi Prisma 7: singular `datasource` juga valid
    url: env("DATABASE_URL"),
  },
});
