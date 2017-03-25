import nodemailer from 'nodemailer'
import log4js from 'log4js'

const log = log4js.getLogger()

let transporter = null

export default (to, subject, html) => {
  const { config } = global
  if (transporter === null) {
    transporter = nodemailer.createTransport(config.thirdParty.smtp.connectionString)
  }
  transporter.sendMail({
    from: config.thirdParty.smtp.from,
    to,
    subject,
    html,
  }, (error, info) => {
    const message = `Send mail to ${to}`
    if (error) {
      log.error(message)
      log.error(error)
    } else {
      log.info(message)
      log.info(info)
    }
  })
}
