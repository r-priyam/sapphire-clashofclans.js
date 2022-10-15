import 'reflect-metadata';
import '@sapphire/plugin-logger/register';

import process from 'node:process';
import { URL } from 'node:url';
import { inspect } from 'node:util';

import { ApplicationCommandRegistries, container, Piece, RegisterBehavior } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';
import { createColors } from 'colorette';

import type { Client } from 'clashofclans.js';

import { srcFolder } from '#utils/constants';
import { info, success, warning } from '#utils/logger';

process.env.NODE_ENV ??= 'development';

setup(new URL('.env', srcFolder));
inspect.defaultOptions.depth = 1;
createColors({ useColor: true });
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

container.logInfo = info;
container.logSuccess = success;
container.logWarning = warning;

Object.defineProperties(Piece.prototype, {
	logInfo: { get: () => info },
	logSuccess: { get: () => success },
	logWarning: { get: () => warning }
});

declare module '@sapphire/pieces' {
	interface Container {
		coc: Client;
		logInfo: typeof info;
		logSuccess: typeof success;
		logWarning: typeof warning;
	}

	interface Piece {
		logInfo: typeof info;
		logSuccess: typeof success;
		logWarning: typeof warning;
	}
}
