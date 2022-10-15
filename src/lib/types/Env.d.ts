import type { ArrayString, BooleanString } from '@skyra/env-utilities';

declare module '@skyra/env-utilities' {
	interface Env {
		ACTIVITY_MESSAGE: string;
		ACTIVITY_TYPE: string;

		CLASH_EMAIL: string;

		CLASH_KEY_NAME: string;
		CLASH_PASSWORD: string;
		DEBUG: BooleanString;
		DISCORD_TOKEN: string;

		NODE_ENV: 'development' | 'production' | 'test';
		OWNERS: ArrayString;
	}
}
