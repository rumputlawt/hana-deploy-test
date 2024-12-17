import tweetnacl from "tweetnacl";
import { decodeHex } from "@std/encoding/hex";
import { STATUS_CODE } from "@std/http/status";
import {
	type APIInteraction,
	InteractionResponseType,
	InteractionType,
} from "@discordjs/core";
import { define } from "~/utils/core.ts";
import { HttpError } from "fresh";

export const handler = define.handlers({
	async POST(ctx) {
		const timestamp = ctx.req.headers.get("x-signature-timestamp");
		const signature = ctx.req.headers.get("x-signature-ed25519");
		const publicKey = Deno.env.get("BOT_PUBLIC_KEY");

		if (!timestamp || !signature || !publicKey) {
			throw new HttpError(
				STATUS_CODE.Unauthorized,
				"Missing timestamp, signature or public key.",
			);
		} else {
			const body = await ctx.req.text();

			const valid = tweetnacl.sign.detached.verify(
				new TextEncoder().encode(timestamp + body),
				decodeHex(signature),
				decodeHex(publicKey),
			);

			if (!valid) {
				throw new HttpError(
					STATUS_CODE.Unauthorized,
					"Invalid signature.",
				);
			} else {
				const interaction: APIInteraction = JSON.parse(body);

				switch (interaction.type) {
					case InteractionType.Ping: {
						return Response.json({
							type: InteractionResponseType.Pong,
						});
					}
					default: {
						return new Response(null, {
							status: STATUS_CODE.NotImplemented,
						});
					}
				}
			}
		}
	},
});
