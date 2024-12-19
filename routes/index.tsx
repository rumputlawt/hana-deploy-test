import { define } from "~/utils/core.ts";
import { Deploy } from "~/islands/deploy.tsx";

export default define.page((_ctx) => {
	return (
		<div class="flex h-dvh p-2">
			<Deploy />
		</div>
	);
});
