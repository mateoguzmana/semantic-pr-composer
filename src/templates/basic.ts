import type {TemplateProps} from './types'

export function makeBasicTemplate({
  ticket,
  ticketBaseUrl
}: TemplateProps): string {
  // prettier-ignore
  return `
### Summary

[${ticket || 'No ticket'}](${ticket ? `${ticketBaseUrl}${ticket}` : ''})

- [ ] I have added unit tests
- [ ] I have tested my changes locally
- [ ] I have updated the documentation
- [ ] I have updated the changelog
`
}
