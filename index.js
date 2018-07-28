const colors = require('kleur');
const cClear = require('console-clear');
const format = require('webpack-format-messages');

const log = str => console.log(str);
const clear = _ => (cClear(),true);

class WebpackMessages {
	constructor(opts) {
		opts = opts || {};
		this.name = opts.name;
		this.onDone = opts.onComplete;
		this.logger = opts.logger || log;
	}

	printError(str, arr) {
		arr && (str += '\n\n' + arr.join(''));
		clear() && this.logger(str);
	}

	apply(compiler) {
		const name = this.name ? ` ${colors.cyan(this.name)} bundle` : '';
		const onStart = _ => this.logger(`Building${name}...`);

		compiler.hooks.compilation.tap('webpack-messages', onStart);
		compiler.hooks.invalid.tap('webpack-messages', _ => clear() && onStart());

		compiler.hooks.done.tap('webpack-messages', stats => {
			const messages = format(stats);

			if (messages.errors.length) {
				return this.printError( colors.red(`Failed to compile${name}!`), messages.errors );
			}

			if (messages.warnings.length) {
				return this.printError( colors.yellow(`Compiled${name} with warnings.`), messages.warnings );
			}

			if (this.onDone !== undefined) {
				this.onDone(name, stats);
			} else {
				const sec = (stats.endTime - stats.startTime) / 1e3;
				this.logger( colors.green(`Completed${name} in ${sec}s!`) );
			}
		});
	}
}

module.exports = WebpackMessages;
