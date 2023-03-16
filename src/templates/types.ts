export enum TemplateType {
  Basic = 'basic',
  Conventional = 'conventional'
}

export interface TemplateProps {
  prefix?: string
  ticket?: string
  ticketBaseUrl?: string
  description?: string
  type?: TemplateType
}
