import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
	cookies.delete("sid", { path: "/" });
	return new Response("OK");
};
