import { type FullConfig } from "@playwright/test";
import path = require("node:path");
import fs = require("fs");

export default async function globalSetup(config: FullConfig) {
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    //Delete allure reports
    const resultDir = path.resolve(process.cwd(), "allure-results");

    if (fs.existsSync(resultDir)) {
      fs.rmSync(resultDir, { recursive: true, force: true });
    }
  }

  process.env.LoginCookies = undefined;
}
