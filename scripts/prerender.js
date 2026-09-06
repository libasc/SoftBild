import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const routes = [
  "/",
  "/Aboutus",
  "/Services",
  "/Portfolio",
  "/HireDeveloper",
  "/OnDemand-Resourse",
  "/ResourcePricing",
  "/Contact",
  "/Blog",
];

/*
|--------------------------------------------------------------------------
| Start Vite Preview
|--------------------------------------------------------------------------
|
| We start Vite directly with Node instead of:
|
| npm run preview
|
| This gives us a cleaner/stabler child process during prerendering.
|
*/

function startPreviewServer() {
  const viteBin = path.resolve(
    "node_modules",
    "vite",
    "bin",
    "vite.js"
  );

  const server = spawn(
    process.execPath,
    [
      viteBin,
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(PORT),
      "--strictPort",
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  server.stdout.on("data", (data) => {
    const text = data.toString().trim();

    if (text) {
      console.log(`[Vite] ${text}`);
    }
  });

  server.stderr.on("data", (data) => {
    const text = data.toString().trim();

    if (text) {
      console.error(`[Vite] ${text}`);
    }
  });

  server.on("exit", (code) => {
    if (code !== null && code !== 0) {
      console.error(
        `⚠️ Vite preview server exited with code ${code}`
      );
    }
  });

  return server;
}

/*
|--------------------------------------------------------------------------
| Route → HTML file
|--------------------------------------------------------------------------
*/

function routeToFile(route) {
  if (route === "/") {
    return path.resolve("dist", "index.html");
  }

  const cleanRoute = route.replace(/^\/+|\/+$/g, "");

  return path.resolve(
    "dist",
    cleanRoute,
    "index.html"
  );
}

/*
|--------------------------------------------------------------------------
| Wait for Vite
|--------------------------------------------------------------------------
*/

async function waitForServer(
  url,
  timeout = 30000
) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Vite is still starting.
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );
  }

  throw new Error(
    `Preview server did not start within ${timeout}ms`
  );
}

/*
|--------------------------------------------------------------------------
| Configure one Puppeteer page
|--------------------------------------------------------------------------
*/

async function configurePage(page) {
  /*
  |--------------------------------------------------------------------------
  | Automatically close alert() dialogs
  |--------------------------------------------------------------------------
  |
  | Your local CAPTCHA failure currently calls alert().
  | We never want that to freeze Puppeteer.
  |
  */

  page.on("dialog", async (dialog) => {
    console.log(
      `   ⚠️ Browser dialog dismissed: ${dialog.message()}`
    );

    try {
      await dialog.dismiss();
    } catch {
      // Dialog may already have closed.
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Browser errors
  |--------------------------------------------------------------------------
  */

  page.on("pageerror", (error) => {
    console.log(
      `   ⚠️ Browser page error: ${error.message}`
    );
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();

      /*
       * Don't flood the terminal with expected CAPTCHA
       * messages during local prerender.
       */

      if (
        !text.toLowerCase().includes("captcha")
      ) {
        console.log(
          `   ⚠️ Browser console: ${text}`
        );
      }
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Request interception
  |--------------------------------------------------------------------------
  */

  await page.setRequestInterception(true);

  page.on("request", async (request) => {
    const requestUrl = request.url();

    let parsedUrl;

    try {
      parsedUrl = new URL(requestUrl);
    } catch {
      try {
        await request.continue();
      } catch {
        // Already handled.
      }

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | MOCK LOCAL CAPTCHA DURING PRERENDER ONLY
    |--------------------------------------------------------------------------
    |
    | Your production website is NOT affected by this.
    |
    | When Puppeteer requests:
    |
    | /api/captcha
    |
    | we provide a temporary valid response so HireDeveloper
    | and Contact can render normally.
    |
    */

    if (
      parsedUrl.pathname === "/api/captcha" &&
      request.method() === "GET"
    ) {
      console.log(
        "   🛡️ Using prerender CAPTCHA response"
      );

      try {
        await request.respond({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            challenge: "5 + 3 = ?",
            type: "addition",
          }),
        });
      } catch {
        // Request may already have been handled.
      }

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Block analytics/tracking only during prerender
    |--------------------------------------------------------------------------
    */

    const blockedDomains = [
      "googletagmanager.com",
      "google-analytics.com",
      "analytics.google.com",
      "connect.facebook.net",
    ];

    const shouldBlock = blockedDomains.some(
      (domain) =>
        parsedUrl.hostname.includes(domain)
    );

    if (shouldBlock) {
      try {
        await request.abort();
      } catch {
        // Already handled.
      }

      return;
    }

    /*
     * Allow everything else.
     */

    try {
      await request.continue();
    } catch {
      // Already handled.
    }
  });
}

/*
|--------------------------------------------------------------------------
| Main prerender
|--------------------------------------------------------------------------
*/

async function prerender() {
  console.log(
    "\n🚀 Starting prerender process...\n"
  );

  const server = startPreviewServer();

  const failedRoutes = [];

  try {
    await waitForServer(BASE_URL);

    console.log(
      "✅ Vite preview server is ready\n"
    );

    const isVercel = process.env.VERCEL === "1";

let browser;

if (isVercel) {
    console.log("☁️ Running prerender on Vercel");
    console.log("🧩 Using serverless Chromium");

    const executablePath = await chromium.executablePath();

    browser = await puppeteer.launch({
        executablePath,
        args: [
            ...chromium.args,
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
        headless: true,
    });
} else {
    console.log("💻 Running prerender locally");

    browser = await puppeteer.launch({
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
        headless: true,
    });
}

    try {
      /*
      |--------------------------------------------------------------------------
      | Render routes
      |--------------------------------------------------------------------------
      */

      for (const route of routes) {
        console.log(`⏳ Rendering ${route}`);

        /*
         * IMPORTANT:
         *
         * Create a fresh browser page for every route.
         *
         * This prevents CAPTCHA/dialog/API state from one
         * page affecting the next route.
         */

        const page = await browser.newPage();

        try {
          await configurePage(page);

          const url = `${BASE_URL}${route}`;

          /*
          |--------------------------------------------------------------------------
          | Load route
          |--------------------------------------------------------------------------
          */

          await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
          });

          /*
          |--------------------------------------------------------------------------
          | Wait for actual React content
          |--------------------------------------------------------------------------
          */

          await page.waitForFunction(
            () => {
              const root =
                document.querySelector("#root");

              if (!root) {
                return false;
              }

              return (
                root.children.length > 0 &&
                (
                  root.innerText?.trim().length ||
                  0
                ) > 20
              );
            },
            {
              timeout: 15000,
            }
          );

          /*
           * Allow Helmet/state updates to finish.
           */

          await new Promise((resolve) =>
            setTimeout(resolve, 1500)
          );

          /*
          |--------------------------------------------------------------------------
          | Read SEO information
          |--------------------------------------------------------------------------
          */

          const pageInfo =
            await page.evaluate(() => {
              const root =
                document.querySelector("#root");

              const canonical =
                document.querySelector(
                  'link[rel="canonical"]'
                );

              const description =
                document.querySelector(
                  'meta[name="description"]'
                );

              const h1 =
                document.querySelector("h1");

              return {
                title: document.title || "",

                canonical:
                  canonical?.getAttribute("href") ||
                  "",

                description:
                  description?.getAttribute(
                    "content"
                  ) || "",

                h1:
                  h1?.innerText?.trim() || "",

                contentLength:
                  root?.innerText?.trim()
                    .length || 0,
              };
            });

          console.log(
            `   Title: ${pageInfo.title}`
          );

          console.log(
            `   Canonical: ${pageInfo.canonical}`
          );

          console.log(
            `   H1: ${pageInfo.h1}`
          );

          console.log(
            `   Content length: ${pageInfo.contentLength}`
          );

          /*
          |--------------------------------------------------------------------------
          | Basic SEO safety checks
          |--------------------------------------------------------------------------
          */

          if (!pageInfo.title) {
            throw new Error(
              `Missing title on ${route}`
            );
          }

          if (!pageInfo.canonical) {
            console.log(
              `   ⚠️ No canonical detected on ${route}`
            );
          }

          if (
            pageInfo.contentLength < 20
          ) {
            throw new Error(
              `Insufficient rendered content on ${route}`
            );
          }

          /*
          |--------------------------------------------------------------------------
          | Capture complete HTML
          |--------------------------------------------------------------------------
          */

          const html =
            await page.evaluate(() => {
              return document.documentElement
                .outerHTML;
            });

          /*
          |--------------------------------------------------------------------------
          | Write route HTML
          |--------------------------------------------------------------------------
          */

          const outputFile =
            routeToFile(route);

          const outputDirectory =
            path.dirname(outputFile);

          fs.mkdirSync(
            outputDirectory,
            {
              recursive: true,
            }
          );

          fs.writeFileSync(
            outputFile,
            `<!doctype html>\n${html}`,
            "utf8"
          );

          console.log(
            `✅ Generated ${outputFile}\n`
          );
        } catch (error) {
          failedRoutes.push(route);

          console.error(
            `❌ Failed to prerender ${route}`
          );

          console.error(
            `   ${error.message}\n`
          );
        } finally {
          /*
           * Always close this route's page.
           */

          await page.close();
        }
      }
    } finally {
      await browser.close();
    }

    /*
    |--------------------------------------------------------------------------
    | Final result
    |--------------------------------------------------------------------------
    */

    if (failedRoutes.length > 0) {
      throw new Error(
        `Prerender failed for: ${failedRoutes.join(
          ", "
        )}`
      );
    }

    console.log(
      "🎉 Prerendering completed successfully.\n"
    );
  } finally {
    /*
     * Stop Vite preview server.
     */

    if (!server.killed) {
      server.kill("SIGTERM");
    }

    console.log(
      "🛑 Preview server stopped."
    );
  }
}

/*
|--------------------------------------------------------------------------
| Execute
|--------------------------------------------------------------------------
*/

prerender().catch((error) => {
  console.error(
    "\n❌ Prerendering failed:"
  );

  console.error(error.message);

  process.exit(1);
});