export enum TemplateType {
  Basic = 'basic',
  Conventional = 'conventional',
  Custom = 'custom'
}

export interface TemplateProps {
  prefix?: string
  ticket?: string
  projectBaseUrl?: string
  description?: string
  type?: TemplateType
  /**
   * Custom template string
   */
  customTemplate?: string
}
