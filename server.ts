Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;

    if (filePath === "/") {
      filePath = "/src/index.html";
    } else if (filePath.startsWith("/src")) {
        // no change
    } else {
        filePath = "/src" + filePath
    }


    const file = Bun.file(import.meta.dir + filePath);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});

console.log("Server running at http://localhost:3000");
