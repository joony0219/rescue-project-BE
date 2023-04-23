const pino = require('pino')
const pretty = require('pino-pretty')
const path = require('path');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul'); // 한국 시간으로 설정

const stream = pretty({
  colorize: true,
  destination: path.join(__dirname, '../../../logs/access.log')
})
const logger = pino(stream)

module.exports = logger;