import { errors } from 'demo-model'

const localization = require('./locale.zh.json')

errors.localization = Object.keys(localization).reduce((previousLocalization, key) => {
  previousLocalization[key] = localization[key]
  return previousLocalization
}, errors.localization)

errors.register({
  NotAuthorize: 401,
  EventStatusShouldUpdateSeparately: 400,
  UsernameInvalid: 400,
  MobileNumberInvalid: 400,
  EmailInvalid: 400,
  FailToSendSms: 500,
  RegionNotSupported: 400,
  UnifiedOrderFailed: 400,
  NotifyFailed: 400,
  ResourceTypeNotSupported: 400,
  AvatarInvalid: 400,
  AuthTypeInvalid: 400,
  PasswordRequired: 400,
  InvalidCoordinate: 400,
  CommentRequired: 400,
  CityParamsRequired: 400,
  FeeRequestRequired: 400,
  SplitPaymentRequired: 400,
})

export default errors
