import {TemplateProps, TemplateType} from './types'

import {makeBasicTemplate} from './basic'

export function makeTemplate(props: TemplateProps): string {
  switch (props.type) {
    case TemplateType.Basic:
      return makeBasicTemplate(props)
    default:
      return makeBasicTemplate(props)
  }
}
