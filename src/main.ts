import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const {GITHUB_HEAD_REF} = process.env

    if (!GITHUB_HEAD_REF) {
      core.info('No branch name, skipping pre-fill')

      return
    }

    const ticketBaseUrl = core.getInput('ticket-base-url')

    // eslint-disable-next-line no-console
    console.log('ticketBaseUrl', ticketBaseUrl)

    const branch = GITHUB_HEAD_REF

    const token = core.getInput('github-token')
    const context = github.context
    const octokit = github.getOctokit(token)

    const match = branch.match(
      /^(?<prefix>feature|feat|fix|bugfix|hotfix|chore|patch|release|refactor)\/(?<ticket>(xxx|test)-[0-9]*)?-?(?<title>.*)$/
    )

    if (!match?.groups) {
      core.info('Invalid branch name, skipping pre-fill')

      return
    }

    const {prefix, ticket, title} = match.groups

    const descriptionBody = title.replace(/-/g, ' ')
    const formattedTicket = ticket ? ticket.toUpperCase() : undefined
    const pullRequestTitle = `${prefix}${
      formattedTicket ? `(${formattedTicket})` : ''
    }: ${descriptionBody}`

    // prettier-ignore
    const body = `
### Summary
      
[${formattedTicket || 'No ticket'}](${formattedTicket ? `${ticketBaseUrl}${formattedTicket}` : ''})        

- [ ] I have added unit tests
- [ ] I have tested my changes locally
- [ ] I have updated the documentation
- [ ] I have updated the changelog
    `

    if (github.context.payload.pull_request?.number) {
      await octokit.rest.pulls.update({
        ...context.repo,
        pull_number: github.context.payload.pull_request.number,
        title: pullRequestTitle,
        body
      })
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
