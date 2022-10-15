import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener } from '@sapphire/framework';

import type { Clan } from 'clashofclans.js';

@ApplyOptions<Listener.Options>({
	name: 'MemberJoin',
	event: 'memberJoin',
	emitter: container.coc
})
export class BotListener extends Listener {
	public async run(oldClan: Clan, newClan: Clan) {
		for (const member of newClan.members) {
			if (!oldClan.members.some((oldMember) => oldMember.tag === member.tag)) {
				console.log(`${member.name} joined ${newClan.name}`);
			}
		}
	}
}
