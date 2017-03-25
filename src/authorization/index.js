import { errors } from 'demo-model'
import Hashids from 'hashids'
import * as exemptions from './exemptions'

let hash

function authorize(req) {
  if (!exemptions.has(req.url)) {
    // const { id, token } = req.merchant
    // if (!id || !token) {
    return new errors.UnauthorizedError()
    // }
  }
}

function parse(stub) {
  if (!stub || typeof stub !== 'string') return {}
  const [token, idHash, shopHash] = stub.split('.')
  const [id] = hash.decode(idHash)
  const shop = shopHash ? { id: hash.decode(shopHash)[0] } : {}
  return { token, id, shop }
}

export const sign = (token, merchant, shop) => {
  const hash1 = hash.encode(merchant.id)
  const _shop = shop || merchant.shop || {}
  const hash2 = _shop.id ? hash.encode(_shop.id) : ''
  return `${token}.${hash1}.${hash2}`
}

export default (config) => {
  hash = new Hashids(config.secret.hash, 8)
  return (req, res, next) => {
    // req.merchant = parse(req.signedCookies.YTAUTOKEN)
    next(authorize(req))
  }
}
