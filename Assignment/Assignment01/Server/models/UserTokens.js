const path = require('path')
const p = path.join(process.mainModule.path, 'data', 'genreList.json')

const UserTokens = {
	all: function() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	},
}