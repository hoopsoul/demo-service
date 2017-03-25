import errors from '../errors'

export default (region, number) => {
  if (!number) throw new errors.MobileNumberInvalidError()
  switch (region) {
    case '+86':
      if (!/^\d{11}$/.test(number)) throw new errors.MobileNumberInvalidError()
      break
    default:
      throw new errors.RegionNotSupportedError()
  }
}
