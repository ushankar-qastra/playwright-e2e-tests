import { type FullConfig } from "@playwright/test";
import { exec } from "node:child_process";

export default async function globalTeardown(config: FullConfig) {
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    //Genarate allure reports
    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error("ERROR:Starting Allure server:", error.message);
      }
    });
  }
}
