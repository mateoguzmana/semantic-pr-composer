import * as core from '@actions/core'
// import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const {GITHUB_HEAD_REF_SLUG_URL} = process.env || {}

    // eslint-disable-next-line no-console
    console.log(GITHUB_HEAD_REF_SLUG_URL)

    const branch = core.getInput('branch')

    const match = branch.match(
      /^(?<prefix>feature|feat|fix|bugfix|hotfix|chore|patch|release|refactor)\-(?<ticket>(xxx|test)-[0-9]*)?-?(?<title>.*)$/
    )

    if (!match?.groups) {
      // eslint-disable-next-line no-console
      console.log(
        'Invalid branch name, skipping pre-fill',
        GITHUB_HEAD_REF_SLUG_URL
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

    core.debug(new Date().toTimeString()) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    core.info(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
