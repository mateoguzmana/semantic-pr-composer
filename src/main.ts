import * as core from '@actions/core'
import * as github from '@actions/github'
import {TemplateType} from './templates/types'
import {formatTitle} from './utils/title'
import {makeTemplate} from './templates'

async function run(): Promise<void> {
  try {
    const {GITHUB_HEAD_REF} = process.env

    if (!GITHUB_HEAD_REF) {
      core.info('No branch name, skipping pre-fill')

      return
    }

    const token = core.getInput('github-token')
    const ticketBaseUrl = core.getInput('ticket-base-url')
    const templateType = core.getInput('template-type')
    const titleFormat = core.getInput('title-format')

    const branch = GITHUB_HEAD_REF

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

    const pullRequestTitle = formatTitle({
      format: titleFormat,
      prefix,
      ticket: formattedTicket ?? '',
      description: descriptionBody
    })

    const body = makeTemplate({
      prefix,
      ticket: formattedTicket,
      ticketBaseUrl,
      description: descriptionBody,
      type: templateType as TemplateType
    })

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
