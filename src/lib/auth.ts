import crypto from "node:crypto";

const b64u = {
	enc: (b: Buffer | string) =>
		Buffer.from(b)
			.toString("base64")
			.replace(/=+/g, "")
			.replace(/\+/g, "-")
			.replace(/\//g, "_"),
	dec: (s: string) =>
		Buffer.from(
			s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4),
			"base64",
		),
};

const SECRET = import.meta.env.SESSION_SECRET || "";
const MAX_AGE = Number(import.meta.env.SESSION_MAX_AGE || 86400); // 1 day

export function timingSafeEqual(a: string, b: string) {
	const aa = Buffer.from(a);
	const bb = Buffer.from(b);

	if (aa.length !== bb.length) {
		return false;
	}

	return crypto.timingSafeEqual(aa, bb);
}

export function createSession(username: string) {
	const now = Math.floor(Date.now() / 1000);
	const payload = { sub: username, iat: now, exp: now + MAX_AGE };
	const body = b64u.enc(JSON.stringify(payload));
	const sig = b64u.enc(
		crypto.createHmac("sha256", SECRET).update(body).digest(),
	);

	return `${body}.${sig}`;
}

export function verifySession(token?: string) {
	if (!token) {
		return null;
	}

	const [body, sig] = token.split(".");

	if (!body || !sig) {
		return null;
	}

	const expected = b64u.enc(
		crypto.createHmac("sha256", SECRET).update(body).digest(),
	);

	if (!timingSafeEqual(sig, expected)) {
		return null;
	}

	const payload = JSON.parse(b64u.dec(body).toString());
	if (payload.exp < Math.floor(Date.now() / 1000)) {
		return null;
	}

	return payload as { sub: string; iat: number; exp: number };
}

export function checkCredentials(username: string, password: string) {
	const U = import.meta.env.ADMIN_USERNAME || "";
	const P = import.meta.env.ADMIN_PASSWORD || "";
	console.log(
		import.meta.env,
		U,
		P,
		">>>",
		timingSafeEqual(username, U),
		timingSafeEqual(password, P),
	);
	return timingSafeEqual(username, U) && timingSafeEqual(password, P);
}
