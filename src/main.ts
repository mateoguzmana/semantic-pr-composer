import * as core from '@actions/core'
import * as github from '@actions/github'
import {DEFAULTS} from './constants'
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
    const projectBaseUrl = core.getInput('project-base-url')
    const templateType = core.getInput('template-type')
    const titleFormat = core.getInput('title-format') ?? DEFAULTS.TITLE_FORMAT
    const customTemplate = core.getInput('custom-template')
    const prefixes = JSON.parse(core.getInput('prefixes')) ?? DEFAULTS.PREFIXES
    const tickets = JSON.parse(core.getInput('tickets')) ?? DEFAULTS.TICKETS

    const branch = GITHUB_HEAD_REF

    const context = github.context
    const octokit = github.getOctokit(token)

    const prefixesOptions = prefixes.join('|')
    const ticketsOptions = tickets.join('|')

    // eslint-disable-next-line no-console
    console.log({prefixesOptions, ticketsOptions})

    const match = branch.match(
      new RegExp(
        `^(?<prefix>(${prefixesOptions}))\\/((?<ticket>(${ticketsOptions})-[0-9]*)-)?(?<title>.*)$`
      )
    )

    // eslint-disable-next-line no-console
    console.log({match})

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
      projectBaseUrl,
      description: descriptionBody,
      type: customTemplate
        ? TemplateType.Custom
        : (templateType as TemplateType),
      customTemplate
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
