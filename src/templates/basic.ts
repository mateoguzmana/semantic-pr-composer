import type {TemplateProps} from './types'
import {capitalizeFirstLetter} from '../utils/strings'

export function makeBasicTemplate({
  prefix,
  ticket,
  ticketBaseUrl,
  description
}: TemplateProps): string {
  // prettier-ignore
  return `
### Related Issue

${ticket ? `[${ticket}](${ticketBaseUrl}${ticket})` : 'No related issue'}

### Change Type

${prefix ? `- [x] ${capitalizeFirstLetter(prefix)}` : '- [ ] Change type not specified'}

### Description

${description ? capitalizeFirstLetter(description) : 'No description provided.'}

### Checklist

- [ ] New features are documented
- [ ] Bug fixes include a test case to prevent regression
- [ ] Changes have been reviewed by at least one other team member or maintainer
`
}
