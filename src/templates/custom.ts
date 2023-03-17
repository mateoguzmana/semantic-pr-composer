import {TemplateProps} from './types'

export function makeCustomTemplate(props: TemplateProps): string {
  const {customTemplate, prefix, ticket, ticketBaseUrl, description} = props

  const keysToReplace = [prefix, ticket, ticketBaseUrl, description]

  let output = customTemplate ?? ''

  for (const key of keysToReplace) {
    if (!key) return ''

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TS doesn't know that key is a string
    output = output.replace(key, keysToReplace[key])
  }

  return output
}
