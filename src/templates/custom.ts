import {TemplateProps} from './types'

export function makeCustomTemplate(options: TemplateProps): string {
  const {customTemplate, ...params} = options
  let output = customTemplate ?? ''

  for (const key in params) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TS doesn't like the dynamic key
    output = output.replace(key, params[key])
  }

  return output
}
