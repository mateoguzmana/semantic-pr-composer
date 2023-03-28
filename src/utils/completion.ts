export async function generateText(
  prompt: string,
  apiKey: string,
  maxTokens = 50,
  n = 1
): Promise<string> {
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
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers,
      body
    })

    const data = await response.json()

    const generatedText = data.choices[0].text

    return generatedText
  } catch (error) {
    throw new Error('Failed to generate text.')
  }
}
