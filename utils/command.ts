import {
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteraction,
	APIInteractionResponseChannelMessageWithSource,
	APIInteractionResponseDeferredChannelMessageWithSource,
	type APIMessageApplicationCommandInteraction,
	APIModalInteractionResponse,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from "@discordjs/core";

export function slashCommand(
	command: Omit<SlashCommand, "type">,
): SlashCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.ChatInput },
		execute: command.execute,
	};
}
export function messageContextMenuCommand(
	command: Omit<MessageContextMenuCommand, "type">,
): MessageContextMenuCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.Message },
		execute: command.execute,
	};
}
export function userContextMenuCommand(
	command: Omit<UserContextMenuCommand, "type">,
): UserContextMenuCommand {
	return {
		data: { ...command.data, type: ApplicationCommandType.User },
		execute: command.execute,
	};
}

type CommandResponse =
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
