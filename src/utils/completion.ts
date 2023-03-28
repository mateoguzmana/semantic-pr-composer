import * as core from '@actions/core'

const COMPLETIONS_ENDPOINT = 'https://api.openai.com/v1/completions'

interface CompletionsParams {
  prompt: string
  apiKey?: string
  maxTokens?: number
  n?: number
}

export async function completions({
  prompt,
  apiKey,
  maxTokens = 50,
  n = 1
}: CompletionsParams): Promise<string> {
  if (!apiKey) return prompt

  // @TODO: fix the tsconfig to allow fetch and its types.
  // eslint-disable-next-line no-undef
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  })

  const body = JSON.stringify({prompt, max_tokens: maxTokens, n})

  try {
    // @TODO: fix the tsconfig to allow fetch and its types.
    // eslint-disable-next-line no-undef
    const response = await fetch(COMPLETIONS_ENDPOINT, {
      method: 'POST',
      headers,
      body
    })

    const data = await response.json()

    const generatedText = data.choices[0].text

    return generatedText
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    return prompt
  }
}
