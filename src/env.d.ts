/// <reference types="astro/client" />

declare global {
	namespace App {
		interface Locals {
			user?: string; // whatever you attach in middleware
		}
	}
}

export {};
