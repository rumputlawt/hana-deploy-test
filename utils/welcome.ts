import { createCanvas, loadImage } from "@gfx/canvas-wasm";

export async function createWelcomeImage(username: string, avatarUrl: string) {
	const canvas = createCanvas(1024, 500);
	const context = canvas.getContext("2d");

	const assetsPath = "./assets/welcomer";
	const background = await loadImage(`${assetsPath}/background.png`);
	const font = await Deno.readFile(`${assetsPath}/Kitto.otf`);

	canvas.loadFont(font, { family: "Kitto" });
	context.drawImage(background, 0, 0);

	context.font = "80px Kitto";
	context.fillStyle = "white";
	context.fillText(`@${username}`, 70, 275);

	context.beginPath();
	context.arc(816.5, 250, 135, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

	const avatarImage = await loadImage(avatarUrl);
	context.drawImage(avatarImage, 679, 112.5, 275, 275);

	const data = await canvas.toBuffer();
	return data;
}
