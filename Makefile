run:
	deno run --allow-net --allow-env --allow-read ./mod.ts
fmt:
	deno fmt
install_deno:
	curl -fsSL https://deno.land/x/install/install.sh | sh