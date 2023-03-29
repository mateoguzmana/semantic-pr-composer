import * as core from '@actions/core'
import fetch, {Headers} from 'cross-fetch'

const COMPLETIONS_ENDPOINT = 'https://api.openai.com/v1/completions'

interface CompletionsParams {
  prompt: string
  apiKey?: string
  prefix?: string
  projectContext?: string
}

interface Choice {
  text: string
}

interface CompletionsResponse {
  choices: Choice[]
}

export async function completions({
  prompt,
  apiKey,
  prefix,
  projectContext
}: CompletionsParams): Promise<string> {
  if (!apiKey) return prompt

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  })

  const promptWithContext = `This pull requests aims to ${prefix} ${prompt}. ${projectContext}}`

  const body = JSON.stringify({
    prompt: promptWithContext,
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 50,
    n: 1
  })

  try {
    const response = await fetch(COMPLETIONS_ENDPOINT, {
      method: 'POST',
      headers,
      body
    })

    const data = await response.json()

    const generatedText = (data as CompletionsResponse).choices?.[0].text ?? ''

    return generatedText
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    return prompt
  }
}
