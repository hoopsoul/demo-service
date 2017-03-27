import { errors } from 'demo-model'
import * as exemptions from './exemptions'

function authorize(req) {
  if (!exemptions.has(req.url)) {
    return new errors.UnauthorizedError()
  }
}

export default (config) => {
  return (req, res, next) => {
    next(authorize(req))
  }
}
