interface Options {
  format: string
  [key: string]: string
}

export function formatTitle(options: Options): string {
  const {format, ...params} = options
  let output = format

  for (const key in params) {
    output = output.replace(key, params[key])
  }

  return output
}
