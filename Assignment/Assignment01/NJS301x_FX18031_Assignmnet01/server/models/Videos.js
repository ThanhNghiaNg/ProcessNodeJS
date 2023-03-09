const path = require('path')
const p = path.join(process.mainModule.path, 'data', 'videoList.json')
const fs = require("fs")
const Videos = {
	all: function() {
		return JSON.parse(fs.readFileSync(p, 'utf8'));
	},
}

module.exports = Videos