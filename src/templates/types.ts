export enum TemplateType {
  Basic = 'basic'
}

export interface TemplateProps {
  ticket?: string
  ticketBaseUrl?: string
  type?: TemplateType
}
