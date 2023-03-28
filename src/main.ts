import * as core from '@actions/core'
import * as github from '@actions/github'
import {DEFAULTS} from './constants'
import {TemplateType} from './templates/types'
import {completions} from './utils/completion'
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
    const chatGPTToken = core.getInput('chat-gpt-token')

    const prefixesInput = core.getInput('prefixes')
    const ticketsInput = core.getInput('tickets')

    const prefixes = prefixesInput
      ? JSON.parse(prefixesInput)
      : DEFAULTS.PREFIXES
    const tickets = ticketsInput ? JSON.parse(ticketsInput) : DEFAULTS.TICKETS

    const branch = GITHUB_HEAD_REF

    const context = github.context
    const octokit = github.getOctokit(token)

    const prefixesOptions = prefixes.join('|')
    const ticketsOptions = tickets.join('|')

    const match = branch.match(
      new RegExp(
        `^(?<prefix>(${prefixesOptions}))\\/((?<ticket>(${ticketsOptions})-[0-9]*)-)?(?<title>.*)$`
      )
    )

    if (!match?.groups) {
      core.info('Invalid branch name, skipping pre-fill')

      return
    }

    const {prefix, ticket, title} = match.groups

    const description = title.replace(/-/g, ' ')
    const descriptionBody = await completions({
      apiKey: chatGPTToken,
      prompt: description,
      prefix
    })

    const formattedTicket = ticket ? ticket.toUpperCase() : undefined

    const pullRequestTitle = formatTitle({
      format: titleFormat,
      prefix,
      ticket: formattedTicket ?? '',
      description
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
