import type { APIRoute } from "astro";
import { checkCredentials, createSession } from "@/lib/auth";

const COOKIE = "sid";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const data = await request.formData();
	const u = String(data.get("username") || "");
	const p = String(data.get("password") || "");

	if (!checkCredentials(u, p)) {
		return redirect("/admin?e=1");
	}

	const token = createSession(u);

	cookies.set(COOKIE, token, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: true, // set true behind HTTPS
		maxAge: Number(process.env.SESSION_MAX_AGE || 86400),
	});

	return redirect("/"); // or to /admin/editor if you have one
};
