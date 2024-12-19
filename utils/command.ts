import {
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIMessageApplicationCommandInteraction,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from "@discordjs/core";

export function slashCommand(command: Omit<SlashCommand, "type">) {
	return {
		data: { ...command.data, type: ApplicationCommandType.ChatInput },
		execute: command.execute,
	} satisfies SlashCommand;
}
export function messageContextMenuCommand(
	command: Omit<MessageContextMenuCommand, "type">,
) {
	return {
		data: { ...command.data, type: ApplicationCommandType.Message },
		execute: command.execute,
	} satisfies MessageContextMenuCommand;
}
export function userContextMenuCommand(
	command: Omit<UserContextMenuCommand, "type">,
) {
	return {
		data: { ...command.data, type: ApplicationCommandType.User },
		execute: command.execute,
	} satisfies UserContextMenuCommand;
}

interface BaseCommand<
	Data extends RESTPostAPIApplicationCommandsJSONBody,
	Interaction extends APIApplicationCommandInteraction,
> {
	data: Data;
	execute: (interaction: Interaction) => void;
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
