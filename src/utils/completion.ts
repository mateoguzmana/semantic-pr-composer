import * as core from '@actions/core'
import fetch, {Headers} from 'cross-fetch'

const COMPLETIONS_ENDPOINT = 'https://api.openai.com/v1/completions'

interface CompletionsParams {
  prompt: string
  apiKey?: string
}

interface Choice {
  text: string
}

interface CompletionsResponse {
  choices: Choice[]
}

export async function completions({
  prompt,
  apiKey
}: CompletionsParams): Promise<string> {
  if (!apiKey) return prompt

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  })

  const body = JSON.stringify({
    prompt: `Pull request purpose: ${prompt}`,
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 5,
    n: 5
  })

  try {
    const response = await fetch(COMPLETIONS_ENDPOINT, {
      method: 'POST',
      headers,
      body
    })

    const data = await response.json()

    // eslint-disable-next-line no-console
    console.log({data: data.choices, prompt})

    const generatedText = (data as CompletionsResponse).choices?.[0].text ?? ''

    return generatedText
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    return prompt
  }
}
