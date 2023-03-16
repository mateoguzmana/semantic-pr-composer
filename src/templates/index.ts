import {TemplateProps, TemplateType} from './types'

import {makeBasicTemplate} from './basic'
import {makeEmojisTemplate} from './emojis'

export function makeTemplate(props: TemplateProps): string {
  switch (props.type) {
    case TemplateType.Basic:
      return makeBasicTemplate(props)
    case TemplateType.Emojis:
      return makeEmojisTemplate(props)
    default:
      return makeBasicTemplate(props)
  }
}
