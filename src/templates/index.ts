import {TemplateProps, TemplateType} from './types'
import {makeBasicTemplate} from './basic'
import {makeConventionalTemplate} from './conventional'

const makeTemplateMap = {
  [TemplateType.Basic]: makeBasicTemplate,
  [TemplateType.Conventional]: makeConventionalTemplate
}

export function makeTemplate(props: TemplateProps): string {
  const make = makeTemplateMap[props.type as TemplateType] || makeBasicTemplate

  return make(props)
}
