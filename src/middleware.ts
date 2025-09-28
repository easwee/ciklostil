import type { MiddlewareHandler } from "astro";

const COOKIE = "admin";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
	const { pathname } = new URL(ctx.request.url);
	const isLogin = pathname === "/api/login" || pathname === "/admin";
	const cookie = ctx.cookies.get(COOKIE)?.value;

	if (
		!isLogin &&
		(pathname.startsWith("/admin") || pathname.startsWith("/api/"))
	) {
		if (cookie !== process.env.ADMIN_PASSWORD) {
			return new Response("Unauthorized", { status: 401 });
		}
	}
	return next();
};
