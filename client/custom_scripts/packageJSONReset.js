const fs = require('fs')
const p_json = require('../package.json')

if (p_json.eslintConfig || p_json.browserslist) {
  delete p_json.eslintConfig
  delete p_json.browserslist

  fs.writeFile('package.json', JSON.stringify(p_json, undefined, 2), () => {})
}
