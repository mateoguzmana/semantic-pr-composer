import {TemplateProps} from './types'

const getKeyValue =
  <T extends object, U extends keyof T>(key: U) =>
  (obj: T) =>
    obj[key]

export function makeCustomTemplate(options: TemplateProps): string {
  const {customTemplate, ...params} = options
  let output = customTemplate ?? ''

  for (const key in params) {
    output = output.replace(
      new RegExp(key, 'g'),
      getKeyValue(key as never)(params)
    )
  }

  return output
}
