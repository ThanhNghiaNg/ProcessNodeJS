const path = require('path')
const p = path.join(process.mainModule.path, 'data', 'movieList.json')

const fs = require('fs')

const Movies = {
	all: function() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	},
}

module.exports = Movies