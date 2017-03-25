import client from './lib/client'

global.env = {}

describe('hello', () => {
  it('world', (done) => {
    client()
      .get('/hello?hi=you')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.have.property('hello').and.equal('you')
        done()
      })
  })
})
