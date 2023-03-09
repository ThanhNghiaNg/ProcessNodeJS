const path = require('path')
const p = path.join(process.mainModule.path, 'data', 'genreList.json')
const fs = require('fs')
const Genres = {
	all: function() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	},
}

module.exports = Genres