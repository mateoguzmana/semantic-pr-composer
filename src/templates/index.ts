import {TemplateProps, TemplateType} from './types'

import {makeBasicTemplate} from './basic'
import {makeConventionalTemplate} from './conventional'

export function makeTemplate(props: TemplateProps): string {
  switch (props.type) {
    case TemplateType.Basic:
      return makeBasicTemplate(props)
    case TemplateType.Conventional:
      return makeConventionalTemplate(props)
    default:
      return makeBasicTemplate(props)
  }
}
