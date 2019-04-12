import { Message } from 'element-ui'
import {getDefaultLang} from 'utils/string'
import ZH from 'components/lang/zh'
import EN from 'components/lang/en'
import FR from 'components/lang/fr'

export function pop(msg) {
  Message.success({message: msg})
}

export function popWarn(msg) {
  const lang = getDefaultLang()
  // if(typeof(msg) === 'object' && !!msg.response) {
  //   Message.warning({message: msg.response.body.error})
  //   return
  // }
  switch (lang) {
    case 'fr':
      Message.warning({message: FR.errorMsg[msg]})
      break
    case 'en':
      Message.warning({message: EN.errorMsg[msg]})
      break
    default:
      Message.warning({message: ZH.errorMsg[msg]})
      break
  }
  // Message.warning({message: ZH.errorMsg.cluster[msg]})
}
