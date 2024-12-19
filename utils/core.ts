import { createDefine } from "fresh";
import { type Command } from "~/utils/command.ts";
import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();

export const bot = new API(new REST().setToken(Deno.env.get("BOT_TOKEN")!));

export interface Manifest {
	default: {
		commands: Command[];
	};
}
