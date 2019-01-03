import { Message } from 'element-ui'

export function pop(msg) {
  Message.success({message: msg})
}

export function popWarn(msg) {
  if(typeof(msg) === 'object' && !!msg.response) {
    Message.warning({message: msg.response.body.error})
    return
  }

  Message.warning({message: msg})
}
export function popError(msg) {
  if(typeof(msg) === 'object' && !!msg.response) {
    Message.error({message: msg.response.body.error})
    return
  }

  Message.error({message: msg})
}