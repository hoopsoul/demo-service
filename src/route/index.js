import { add as exempt } from '../authorization/exemptions'
import * as modules from './modules'

function recursiveBind(container, route) {
  for (const name in container) {
    if (container.hasOwnProperty(name)) {
      const module = container[name]
      if (module.hasOwnProperty('bind') && typeof module.bind === 'function') {
        module.bind(route, exempt)
      }
    }
  }
}

export const bind = (route) => {
  recursiveBind(modules, route)
}
