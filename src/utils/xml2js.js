import xml2js from 'xml2js'

const parseString = xml =>
  new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })

const toXml = params =>
  new xml2js.Builder().buildObject(params)

export default { parseString, toXml }
