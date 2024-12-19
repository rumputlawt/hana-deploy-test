import {
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIMessageApplicationCommandInteraction,
	type APIModalInteractionResponse,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from "@discordjs/core";
import { type Mode } from "fresh";
import { type Manifest } from "~/utils/core.ts";

export async function loadCommands(mode: Mode) {
	const { default: { commands } }: Manifest = await import(
		`~/${mode === "production" ? "bot.gen.ts" : "dev.gen.ts"}`
	);
	return commands;
}

export function slashCommand(
	command: Omit<SlashCommand, "data"> & {
		data: Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, "type">;
	},
): SlashCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.ChatInput },
		execute: command.execute,
	};
}
export function messageContextMenuCommand(
	command: Omit<MessageContextMenuCommand, "data"> & {
		data: Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, "type">;
	},
): MessageContextMenuCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.Message },
		execute: command.execute,
	};
}
export function userContextMenuCommand(
	command: Omit<UserContextMenuCommand, "data"> & {
		data: Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, "type">;
	},
): UserContextMenuCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.User },
		execute: command.execute,
	};
}

export function isSlashCommand(command: Command): command is SlashCommand {
	return command.data.type === ApplicationCommandType.ChatInput;
}
export function isMessageContextMenuCommand(
	command: Command,
): command is MessageContextMenuCommand {
	return command.data.type === ApplicationCommandType.Message;
}
export function isUserContextMenuCommand(
	command: Command,
): command is UserContextMenuCommand {
	return command.data.type === ApplicationCommandType.User;
}

export type CommandResponse =
	| APIInteractionResponseChannelMessageWithSource
	| APIInteractionResponseDeferredChannelMessageWithSource
	| APIModalInteractionResponse;

interface BaseCommand<
	Data extends RESTPostAPIApplicationCommandsJSONBody,
	Interaction extends APIApplicationCommandInteraction,
> {
	data: Data;
	execute: (interaction: Interaction) => CommandResponse;
}

export type SlashCommand = BaseCommand<
	& RESTPostAPIChatInputApplicationCommandsJSONBody
	& Required<Pick<RESTPostAPIChatInputApplicationCommandsJSONBody, "type">>,
	APIChatInputApplicationCommandInteraction
>;
export type MessageContextMenuCommand = BaseCommand<
	Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, "type"> & {
		type: ApplicationCommandType.Message;
	},
	APIMessageApplicationCommandInteraction
>;
export type UserContextMenuCommand = BaseCommand<
	Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, "type"> & {
		type: ApplicationCommandType.User;
	},
	APIUserApplicationCommandInteraction
>;

export type Command =
	| SlashCommand
	| MessageContextMenuCommand
	| UserContextMenuCommand;
