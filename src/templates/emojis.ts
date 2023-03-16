import type {TemplateProps} from './types'

export function makeEmojiTemplate({
  prefix,
  ticket,
  ticketBaseUrl,
  description
}: TemplateProps): string {
  // prettier-ignore
  return `
### Related issue

[${ticket || 'No ticket'}](${ticket ? `${ticketBaseUrl}${ticket}` : ''})

### Types of changes

${prefix === 'build' ? '- [x] :hammer: Build system changes' : ''}
${prefix === 'chore' ? '- [x] :building_construction: Chore changes' : ''}
${prefix === 'ci' ? '- [x] :construction_worker: CI changes' : ''}
${prefix === 'docs' ? '- [x] :memo: Documentation changes' : ''}
${prefix === 'feat' ? '- [x] :sparkles: New feature' : ''}
${prefix === 'fix' ? '- [x] :bug: Bug fix' : ''}
${prefix === 'perf' ? '- [x] :zap: Performance improvements' : ''}
${prefix === 'refactor' ? '- [x] :recycle: Code refactor' : ''}
${prefix === 'revert' ? '- [x] :rewind: Revert changes' : ''}
${prefix === 'style' ? '- [x] :art: Code style changes' : ''}
${prefix === 'test' ? '- [x] :white_check_mark: Tests' : ''}

### Summary

${description}
`
}
