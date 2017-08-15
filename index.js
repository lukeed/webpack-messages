const chalk = require('chalk');
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
		const name = this.name ? ` ${chalk.cyan(this.name)} bundle` : '';
		const onStart = _ => this.logger(`Building${name}...`);

		compiler.plugin('compile', onStart);
		compiler.plugin('invalid', _ => clear() && onStart());

		compiler.plugin('done', stats => {
			const messages = format(stats);

			if (messages.errors.length) {
				return this.printError( chalk.red(`Failed to compile${name}!`), messages.errors );
			}

			if (messages.warnings.length) {
				return this.printError( chalk.yellow(`Compiled${name} with warnings.`), messages.warnings );
			}

			if (this.onDone !== undefined) {
				this.onDone(name, stats);
			} else {
				const sec = (stats.endTime - stats.startTime) / 1e3;
				this.logger( chalk.green(`Completed${name} in ${sec}s!`) );
			}
		});
	}
}

module.exports = WebpackMessages;
