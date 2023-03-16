import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const {GITHUB_HEAD_REF} = process.env || {}

    // eslint-disable-next-line no-console
    console.log(GITHUB_HEAD_REF)

    const branch = core.getInput('branch')

    const token = core.getInput('github-token')
    const context = github.context
    const octokit = github.getOctokit(token)

    // eslint-disable-next-line no-console
    console.log(process.env)

    if (github.context.payload.pull_request?.number) {
      await octokit.rest.pulls.update({
        ...context.repo,
        pull_number: github.context.payload.pull_request.number,
        title: 'feat(prefill): prefill test',
        body: 'prefill test'
      })
    }

    const match = branch.match(
      /^(?<prefix>feature|feat|fix|bugfix|hotfix|chore|patch|release|refactor)\-(?<ticket>(xxx|test)-[0-9]*)?-?(?<title>.*)$/
    )

    if (!match?.groups) {
      // eslint-disable-next-line no-console
      console.log(
        'Invalid branch name, skipping pre-fill',
        GITHUB_HEAD_REF,
        'nothign'
      )

      return
    }

    const {prefix, ticket, title} = match.groups

    const descriptionBody = title.replace(/-/g, ' ')
    const formattedTicket = ticket ? ticket.toUpperCase() : undefined
    const pullRequestTitle = `${prefix}${
      formattedTicket ? `(${formattedTicket})` : ''
    }: ${descriptionBody}`

    core.info(`Branch name: ${branch}`)
    core.info(`Pull request title: ${pullRequestTitle}`)

    core.setOutput('title', pullRequestTitle)
    core.setOutput('description', descriptionBody)

    await github.context.payload.pulls.update({
      ...github.context.repo,
      pull_number: github.context.payload.pull_request?.number,
      title: pullRequestTitle,
      body: descriptionBody
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
