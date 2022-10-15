import { LogLevel, SapphireClient, container } from '@sapphire/framework';
import { envParseBoolean, envParseString } from '@skyra/env-utilities';
import { Client } from 'clashofclans.js';
import { GatewayIntentBits } from 'discord-api-types/v10';

import type { ExcludeEnum } from 'discord.js';
import type { ActivityTypes } from 'discord.js/typings/enums';

export class BotClient extends SapphireClient {
	public constructor() {
		super({
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
			logger: { level: envParseBoolean('DEBUG') ? LogLevel.Debug : LogLevel.Info },
			loadDefaultErrorListeners: envParseBoolean('DEBUG'),
			presence: {
				activities: [
					{
						name: envParseString('ACTIVITY_MESSAGE', 'My Organs!'),
						type: envParseString('ACTIVITY_TYPE', 'WATCHING') as ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>
					}
				]
			}
		});

		// Inject clash client in container
		container.coc = new Client({ cache: true });
	}

	public override async login() {
		// Request and leave clans tag, just for demo purposes, feel free to join lol
		container.coc.events.addClans('#YRPJ280Y #L9VP28R0 #8U8U2V2L'.split(' '));
		container.coc.events.setClanEvent({
			name: 'memberLeave',
			filter: (oldClan, newClan) => {
				const newTags = newClan.members.map((member) => member.tag);
				if (newTags.length === 0) {
					return false;
				}

				const leftMembers = oldClan.members.filter((member) => !newTags.includes(member.tag));
				return leftMembers.length !== 0;
			}
		});
		container.coc.events.setClanEvent({
			name: 'memberJoin',
			filter: (oldClan, newClan) => {
				const oldTags = oldClan.members.map((member) => member.tag);
				if (oldTags.length === 0) {
					return false;
				}

				const newMembers = newClan.members.filter((member) => !oldTags.includes(member.tag));
				return newMembers.length !== 0;
			}
		});
		await container.coc.login({
			email: envParseString('CLASH_EMAIL'),
			password: envParseString('CLASH_PASSWORD'),
			keyName: envParseString('CLASH_KEY_NAME')
		});
		await container.coc.events.init();
		container.logInfo({ label: 'COC', message: 'SUCCESS' });

		return super.login();
	}
}
