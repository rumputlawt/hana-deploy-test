import {
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	InteractionResponseType,
} from "@discordjs/core";

export function replyInteraction(
	data: APIInteractionResponseCallbackData,
): APIInteractionResponseChannelMessageWithSource {
	return { type: InteractionResponseType.ChannelMessageWithSource, data };
}
