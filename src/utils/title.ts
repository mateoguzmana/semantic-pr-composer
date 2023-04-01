interface Options {
  format: string
  [key: string]: string
}

export function formatTitle(options: Options): string {
  const {format, ...params} = options
  let output_test = format

  for (const key in params) {
    output_test = output_test.replace(key, params[key])
  }

  return output_test
}
