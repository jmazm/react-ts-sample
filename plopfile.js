const fs = require('fs');
const path = require('path');

const getDir = (dir) => {
	const data = fs.readdirSync(dir);
	console.error('dir', data);
	return data;
}

const pagesTpl = [
	'templates/pages/index.hbs',
	'templates/pages/styles.hbs'
]

const modulesTpl = [
	'templates/modules/index.hbs',
	'templates/modules/configureStore.hbs',
	'templates/modules/reducers.hbs',
	'templates/modules/store.hbs'
]



module.exports = function (plop) {
	plop.setGenerator('modules', {
		description: 'modules logic',
		prompts: [{
			type: 'input',
			name: 'module',
			message: 'create a new module',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'module name is required';
			}
		}],
		actions: [
			{
				type: 'addMany',
				base: 'templates/pages',
				destination: 'src/modules/{{module}}/pages',
				templateFiles: 'templates/pages/**',
				transform: (content, data) => {
					return content.replace(/{cName}/, `${data.module}`)
				}
			},
			{
				type: 'addMany',
				base: 'templates/modules',
				destination: 'src/modules/{{module}}',
				templateFiles: 'templates/modules/**',
			}
		]
	});

	plop.setGenerator('pages', {
		description: 'pages logic',
		prompts: [{
			type: 'list',
			name: 'module',
			message: 'choose a module',
			choices: () => {
				return getDir(path.resolve(process.cwd(), 'src/modules'))
			}
		}, {
			type: 'input',
			name: 'page',
			message: 'create a new page',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'page name is required';
			}
		}],
		actions: [
			{
				type: 'addMany',
				base: 'templates/pages',
				destination: 'src/modules/{{module}}/pages/{{page}}',
				templateFiles: 'templates/pages/**',
				transform: (content, data) => {
					return content.replace(/{cName}/, `${data.module}-${data.page}`)
				}
			},
		]
	});
}