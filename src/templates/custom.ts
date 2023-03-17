import {TemplateProps} from './types'

export function makeCustomTemplate(props: TemplateProps): string {
  const {customTemplate, ...params} = props

  const keysToReplace = [
    params.prefix,
    params.ticket,
    params.ticketBaseUrl,
    params.description
  ]

  let output = customTemplate ?? ''

  for (const key of keysToReplace) {
    output = output.replace(key ?? '', '')
  }

  return output
}
