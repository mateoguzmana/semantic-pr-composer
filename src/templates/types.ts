export enum TemplateType {
  Basic = 'Basic',
  // @TODO: rename this to a more generic name
  Emojis = 'Emojis'
}

export interface TemplateProps {
  prefix?: string
  ticket?: string
  ticketBaseUrl?: string
  description?: string
  type?: TemplateType
}
