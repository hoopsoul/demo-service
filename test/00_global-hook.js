import nock from 'nock'
import chai from 'chai'
import charAsPromised from 'chai-as-promised'
import getServer from './lib/getServer'

chai.use(charAsPromised)

before(async function test() {
  this.timeout(15000)
  global.should = chai.should()
  global.server = await getServer()
})

after((done) => {
  nock.cleanAll()
  done()
})
