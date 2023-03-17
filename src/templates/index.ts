import {TemplateProps, TemplateType} from './types'
import {makeBasicTemplate} from './basic'
import {makeConventionalTemplate} from './conventional'
import {makeCustomTemplate} from './custom'

const makeTemplateMap = {
  [TemplateType.Basic]: makeBasicTemplate,
  [TemplateType.Conventional]: makeConventionalTemplate,
  [TemplateType.Custom]: makeCustomTemplate
}

export function makeTemplate(props: TemplateProps): string {
  const make = makeTemplateMap[props.type as TemplateType] || makeBasicTemplate

  return make(props)
}
