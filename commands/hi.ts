import { slashCommand } from "~/utils/command.ts";
import { replyInteraction } from "~/utils/interaction.ts";

export default slashCommand({
	data: {
		name: "hi",
		description: "Say Hi!",
	},
	execute(_interaction) {
		return replyInteraction({ content: "Hello!!" });
	},
});
