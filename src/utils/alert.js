import { Message } from 'element-ui'
import { getDefaultLang } from 'utils/string'
import ZH from 'src/lang/zh'
import EN from 'src/lang/en'
import FR from 'src/lang/fr'

export function pop(msg) {
  Message.success({ message: msg })
}

export function popWarn(msg, showMsg) {
  if (showMsg) return Message.warning({ message: msg })
  if (typeof (msg) === 'object' && !!msg.response) {
    return Message.warning({ message: msg.response.body.error })
  }
  const lang = getDefaultLang()
  switch (lang) {
    case 'fr':
      Message.warning({ message: FR.errorMsg[msg] })
      break
    case 'en':
      Message.warning({ message: EN.errorMsg[msg] })
      break
    default:
      Message.warning({ message: ZH.errorMsg[msg] })
      break
  }
  // Message.warning({message: ZH.errorMsg.cluster[msg]})
}
