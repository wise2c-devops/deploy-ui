import { Message } from 'element-ui'

export function pop(msg) {
  Message.success({message: msg})
}

export function popWarn(msg) {
  Message.warning({message: msg})
}
