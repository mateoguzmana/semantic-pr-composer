import * as core from '@actions/core'
import * as github from '@actions/github'
// import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const {GITHUB_HEAD_REF_SLUG_URL} = process.env || {}

    // eslint-disable-next-line no-console
    console.log(GITHUB_HEAD_REF_SLUG_URL)

    // eslint-disable-next-line no-console
    console.log('testing')

    const branch = core.getInput('branch')

    const context = github.context

    const token = core.getInput('github-token')
    const octokit = github.getOctokit(token)

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
        GITHUB_HEAD_REF_SLUG_URL,
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
