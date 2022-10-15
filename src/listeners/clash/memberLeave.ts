import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener } from '@sapphire/framework';

import type { Clan } from 'clashofclans.js';

@ApplyOptions<Listener.Options>({
	name: 'MemberLeave',
	event: 'memberLeave',
	emitter: container.coc
})
export class BotListener extends Listener {
	public async run(oldClan: Clan, newClan: Clan) {
		for (const member of oldClan.members) {
			if (!newClan.members.some((newMember) => newMember.tag === member.tag)) {
				console.log(`${member.name} left ${newClan.name}`);
			}
		}
	}
}
