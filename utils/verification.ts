import {
	APIChatInputApplicationCommandGuildInteraction,
	APIGuildMember,
	ButtonStyle,
	ComponentType,
} from "@discordjs/core";
import { bot } from "~/utils/core.ts";
import { createWelcomeImage } from "~/utils/welcome.ts";
import {
	bold,
	channelMention,
	formatEmoji,
	roleMention,
	userMention,
} from "@discordjs/formatters";
import { avatar } from "~/utils/avatar.ts";

export async function createVerificationMessage(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	await bot.channels.createMessage(interaction.channel.id, {
		content: "Have you read the rules?",
		components: [{
			type: ComponentType.ActionRow,
			components: [{
				type: ComponentType.Button,
				label: "Got it.",
				style: ButtonStyle.Primary,
				custom_id: "verification",
			}],
		}],
	});
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{ content: "Done!" },
	);
}

export async function verifyMember(member: APIGuildMember) {
	const guildId = Deno.env.get("GUILD_ID");
	const memberRole = Deno.env.get("MEMBER_ROLE_ID");
	const welcomeChannelId = Deno.env.get("WELCOME_CHANNEL_ID");

	if (!guildId || !memberRole || !welcomeChannelId) {
		throw new Error(
			'Missing "GUILD_ID" or "MEMBER_ROLE_ID" or "WELCOME_CHANNEL_ID" environment variable.',
		);
	} else {
		if (!member.roles.includes(memberRole)) {
			await bot.guilds.addRoleToMember(
				guildId,
				member.user.id,
				memberRole,
			);

			const avatarUrl = avatar(member.user);

			const welcomeImage = await createWelcomeImage(
				member.user.username,
				avatarUrl,
			);
			await bot.channels.createMessage(welcomeChannelId, {
				content: userMention(member.user.id),
				embeds: [{
					color: 0xfdf3ff,
					author: { name: member.user.username, icon_url: avatarUrl },
					description: `## Konnichiwaaaa ${
						userMention(member.user.id)
					}~! \n\n### Welcome to the community—${
						formatEmoji("1338171993161334888")
					}\n\n${
						bold(
							`${
								formatEmoji("1338180220376846337")
							} Don't forget to read da ${
								channelMention("1320856012902629490")
							}\n${
								formatEmoji("1338172092084129833")
							} If there's anything needed, mention ${
								roleMention("1320856011975823466")
							} ASAP.`,
						)
					}\n### Happy Chatting~! ${
						formatEmoji("1338172623300857917")
					}`,
					image: { url: "attachment://welcome.png" },
				}],
				files: [{
					name: "welcome.png",
					data: welcomeImage,
				}],
			});
		}
	}
}
