import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

export default defineConfig<EnvConfig>({
  ...baseConfig,
  testDir: path.resolve(process.cwd(), "./tests"),

  use: {
    ...baseConfig.use,
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com",
    apiURL: "https://reqres.in/api",
    dbConfig: {
      server: "",
      dbName: "",
      connectionStr: "",
    },
  },
});
