const path = require('path')
const p = path.join(process.mainModule.path, 'data', 'userTOken.json')
const fs = require('fs')

const UserTokens = {
	all: function() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	},
}

module.exports = UserTokens