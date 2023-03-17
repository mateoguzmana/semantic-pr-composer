import {TemplateProps} from './types'

export function makeCustomTemplate(props: TemplateProps): string {
  const {customTemplate, prefix, ticket, ticketBaseUrl, description} = props

  const keysToReplace = [prefix, ticket, ticketBaseUrl, description]

  let output = customTemplate ?? ''

  for (const key of keysToReplace) {
    output = output.replace(key ?? '', '')
  }

  return output
}
