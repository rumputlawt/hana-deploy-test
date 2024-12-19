import { useState } from "preact/hooks";

export function Deploy() {
	const [status, setStatus] = useState<"success" | "failed" | "null">("null");

	return (
		<div class="flex flex-col gap-2">
			<p>status: {status ?? "null"}</p>
			<div>
				<button
					class="bg-black px-3 py-1 rounded-full text-white"
					onClick={async () => {
						const result = await deploy();
						setStatus(result === 204 ? "success" : "failed");
					}}
				>
					Deploy
				</button>
			</div>
		</div>
	);
}

async function deploy() {
	const response = await fetch("/api/deploy", {
		method: "POST",
	});
	return response.status;
}
