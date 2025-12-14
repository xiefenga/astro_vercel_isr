// src/pages/api/invalidate.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ url, request }) => {
  // Note: you should put this endpoint behind auth or other similar protection
  const body = await request.json();
  // we get the route we want to invalidate from the request body
  const route = body.route ?? "/";

  // we send head request to the route we want to invalidate
  const res = await fetch(`https://${url.host}${route}`, {
    method: "HEAD",
    headers: {
      // we add the bypass token we provided the Vercel adapter
      // Note: do NOT hard code the bypass token
      "x-prerender-revalidate": "1234567890123456789012345678901234567890",
    },
  });

  // checking the response header to make sure the route was revalidated
  const wasInvalidated = res.headers.get("X-Vercel-Cache") === "REVALIDATED";

  return new Response(JSON.stringify({ wasInvalidated }));
};
