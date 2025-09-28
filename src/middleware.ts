import type { MiddlewareHandler } from "astro";
import { verifySession } from "@/lib/auth";

const COOKIE = "sid";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
	const url = new URL(ctx.request.url);
	const { pathname } = url;

	const isApi = pathname.startsWith("/api/");
	const isApiLogin = pathname === "/api/login";
	const isAdminSub = pathname.startsWith("/admin/");

	const needsAuth = (isApi && !isApiLogin) || isAdminSub;

	if (!needsAuth) {
		return next();
	}

	const token = ctx.cookies.get(COOKIE)?.value;
	const session = verifySession(token);

	// handle valid session
	if (session) {
		ctx.locals.user = session.sub;
		return next();
	}

	// handle unauthenticated api requests
	if (isApi) {
		return new Response("Unauthorized", { status: 401 });
	}

	// handle unauthenticated admin subpage requests
	return ctx.redirect("/admin");
};
