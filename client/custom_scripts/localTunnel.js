const { resolve } = require('path')
require('dotenv').config({ path: resolve('.env') })
const localtunnel = require('localtunnel')

const p_json = require('../package.json')

const publicServer = async () => {
  const tunnel = await localtunnel({
    port: process.env.PORT || 3000,
    host: 'https://tunnel.datahub.at',
    subdomain: p_json.name
  })

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(`Your App is up at: ${tunnel.url}`)

  tunnel.on('close', () => {
    // console.log('The tunnel is now closed.')
  })
}
publicServer()
