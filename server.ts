import { serve } from "bun";
import index from "./src/index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

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
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
