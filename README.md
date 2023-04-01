<p align="center">
  <a href="https://github.com/mateoguzmana/semantic-pr-composer/actions"><img alt="semantic-pr-composer status" src="https://github.com/mateoguzmana/semantic-pr-composer/workflows/build-test/badge.svg"></a>
</p>

# Semantic Pull Request Composer

This action automatically composes the pull request title and body based on the branch name, which follows a semantic convention. Optional AI autocompletion using ChatGPT is also available.

## Inspiration

Development teams often use a convention to name their branches. For example, they might use a prefix to indicate the type of change, and a ticket number to indicate the ticket that the change is related to.

For example, a branch name might look like this:

```
feat/TEAM-1234-add-new-feature
```

This action automatically composes the pull request title and body based on the branch name, which follows a semantic convention.

## Features

- Automatically compose the pull request title and body based on the branch name
- Optional AI autocompletion using ChatGPT
- Supports custom prefixes and tickets
- Supports custom project base URL
- Supports custom templates (partially done, more improvements for advanced templates coming soon)

## Usage

```yaml
name: Semantic Pull Request Composer
on:
  pull_request:
    types: [opened, edited, reopened, synchronize]
jobs:
  pr-compose:
    runs-on: ubuntu-latest
    steps:
      - uses: mateoguzmana/semantic-pr-composer@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          title-format: 'prefix(ticket): description'
          template-type: 'conventional'
          project-base-url: 'https://<yourprojectdomain>/issues'
```

You can see a [demo pull request](https://github.com/mateoguzmana/semantic-pr-composer/pull/51), and its result below:

<img width="874" alt="image" src="https://user-images.githubusercontent.com/20783123/228375459-9d31620d-76ee-42ac-9dfd-d509eb800f5e.png">

---

## Options

| Option                                  | Description                                     | Default                         |
| --------------------------------------- | ----------------------------------------------- | ------------------------------- |
| `github-token`                          | GitHub token to use for the API calls.          | `${{ secrets.GITHUB_TOKEN }}`   |
| [`title-format`](#title-format)         | The title format to use                         | `'prefix(ticket): description'` |
| [`project-base-url`](#project-base-url) | Base URL for the project/task/ticket system     | `'https://example.com'`         |
| [`template-type`](#template-type)       | The template type to use                        | `'basic'`                       |
| [`custom-template`](#custom-template)   | If set, `template-type` is ignored              |                                 |
| [`prefixes`](#prefixes)                 | The prefixes to use                             | [Default prefixes](#prefixes)   |
| [`tickets`](#tickets)                   | The tickets to use                              | [Default tickets](#tickets)     |
| [`chat-gpt-token`](#chatgpt-token)      | See [ChatGPT Token](#chatgpt-token)             |                                 |
| `project-context`                       | Project context. Used for the AI autocompletion |                                 |

### Title Format

Used to determine how to format the pull request title.

The title format is a string that can contain the following placeholders:

- `prefix` - The prefix of the branch name
- `ticket` - The ticket number of the branch name
- `description` - The description of the branch name

Example:

```yaml
- uses: mateoguzmana/semantic-pr-composer@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    title-format: 'prefix(ticket): description'
```

The default title format is based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). If you are using a different convention, you can pass your own title format.

### Project Base URL

Used to determine the base URL for the project/task/ticket system.

Example:

```yaml
- uses: mateoguzmana/semantic-pr-composer@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    project-base-url: 'https://<yourprojectdomain>/issues'
```

### Template Type

Used to determine which template to use for the pull request title and body.

Choose one of the following template types:

- `basic`
- `conventional`
- `custom` (see [Custom Template](#custom-template))

### Custom Template

Can be used to customize the pull request title and body.

The template is a string that can contain the following placeholders:

- `prefix` - The prefix of the branch name
- `ticket` - The ticket number of the branch name
- `projectBaseUrl` - The project base URL
- `description` - The description of the branch name

Example:

```
### My custom title

[ticket](projectBaseUrl/ticket)

### Amazing changes - custom format

prefix

### Description

> description

### Checklist

- [ ] I have added/updated unit tests

- [ ] I have added/updated documentation

- [ ] I have updated the [CHANGELOG.md](./CHANGELOG.md) file
```

_**Note**: Currently, the custom template will only replace the values above. If you are looking for a more advanced template, please open an issue. I am still investigating how to do something smarter where you can add conditional logic to the template._

### Prefixes

Used to determine which prefix to use for the pull request title and body.

The prefixes are an array of strings. Default prefixes are:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `chore`
- `revert`
- `build`
- `ci`

**Note**: The default prefixes are based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). If you are using a different convention, you can pass your own prefixes.

You can pass them as an array of strings:

```yaml
- uses: mateoguzmana/semantic-pr-composer@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    prefixes: |
      ["feat", "fix", "chore", "docs", "refactor", "test", "style", "ci", "perf", "build"]
```

### Tickets

Used to determine which ticket to use for the pull request title and body.

The tickets are an array of strings. Default tickets are:

- `test`

You can pass them as an array of strings:

```yaml
- uses: mateoguzmana/semantic-pr-composer@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    tickets: |
      ["test", "test2"]
```

### ChatGPT Token

ChatGPT token. If set, the action will try to generate a pull request description using ChatGPT.

**Note**: This is experimental.

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

MIT
