
const path = require('path');
const electron = require('electron');
const Conf = require('conf');


class LocalStore extends Conf {
	constructor(opts) {
		const defaultCwd = (electron.app || electron.remote.app).getAppPath();

		opts = Object.assign({name: 'self_config'}, opts);

		if (opts.cwd) {
			opts.cwd = path.isAbsolute(opts.cwd) ? opts.cwd : path.join(defaultCwd, opts.cwd);
		} else {
			opts.cwd = defaultCwd;
		}

		opts.configName = opts.name;
		delete opts.name;
		super(opts);
	}
}

module.exports = LocalStore;

