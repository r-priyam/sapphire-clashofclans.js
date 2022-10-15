import '#lib/setup';
import { exit } from 'node:process';

import { container } from '@sapphire/framework';

import { BotClient } from '#lib/extensions/BotClient';

const client = new BotClient();

try {
	await client.login();
	container.logSuccess({ label: 'WS', message: 'Successfully logged in.' });
} catch (error) {
	container.logger.error(error);
	client.destroy();
	exit(1);
}
