import { serve } from "bun";
import index from "./src/index.html";

const server = serve({
  routes: {
    "/manifest.json": new Response(Bun.file("./public/manifest.json")),
    "/favicon.ico": new Response(Bun.file("./public/favicon.ico")),
    "/logo192.png": new Response(Bun.file("./public/logo192.png")),
    "/logo512.png": new Response(Bun.file("./public/logo512.png")),
    "/service-worker.ts": async (req) => {
      const build = await Bun.build({
        entrypoints: ["./public/service-worker.ts"],
        target: "browser",
        minify: true,
      });
      const file = build.outputs[0];
      return new Response(file, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    },
    "/logo.svg": new Response(Bun.file("./src/logo.svg")),
    "/index.css": new Response(Bun.file("./src/index.css")),
    "/out/index.js": new Response(Bun.file("./out/index.js")),

    "/fileProcessor.worker.ts": async (req) => {
      const build = await Bun.build({
        entrypoints: ["./public/fileProcessor.worker.ts"],
        target: "browser",
        minify: true,
      });
      const file = build.outputs[0];
      return new Response(file, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
