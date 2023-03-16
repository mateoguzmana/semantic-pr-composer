export enum TemplateType {
  Basic = 'basic',
  // @TODO: rename this to a more generic name
  Emojis = 'emojis'
}

export interface TemplateProps {
  prefix?: string
  ticket?: string
  ticketBaseUrl?: string
  description?: string
  type?: TemplateType
}
