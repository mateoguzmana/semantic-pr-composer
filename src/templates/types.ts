export enum TemplateType {
  Basic = 'basic',
  Emojis = 'emojis'
}

export interface TemplateProps {
  prefix?: string
  ticket?: string
  ticketBaseUrl?: string
  description?: string
  type?: TemplateType
}
