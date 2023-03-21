<p align="center">
  <a href="https://github.com/mateoguzmana/semantic-pull-request-prefill/actions"><img alt="semantic-pull-request-prefill status" src="https://github.com/mateoguzmana/semantic-pull-request-prefill/workflows/build-test/badge.svg"></a>
</p>

# Semantic Pull Request Prefill

This action will prefill the pull request title and body based on the branch name, which follows a semantic convention.

## Usage

```yaml
name: Semantic Pull Request Prefill
on:
  pull_request:
    types: [opened, edited, reopened, synchronize]
jobs:
  prefill:
    runs-on: ubuntu-latest
    steps:
      - uses: mateoguzmana/semantic-pull-request-prefill@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          title-format: 'prefix(ticket): description'
          template-type: 'conventional'
          project-base-url: 'https://<yourprojectdomain>/issues'
```

You can see a [demo pull request](https://github.com/mateoguzmana/semantic-pull-request-prefill/pull/42), and its result below:

![image](https://user-images.githubusercontent.com/20783123/226745402-14f12b89-14a6-4aab-879b-d1739a99365c.png)


---

## Options

| Option                                  | Description                                 | Default                         |
| --------------------------------------- | ------------------------------------------- | ------------------------------- |
| `github-token`                          | The GitHub token to use for the API calls.  | `${{ secrets.GITHUB_TOKEN }}`   |
| [`title-format`](#title-format)         | The title format to use                     | `'prefix(ticket): description'` |
| [`project-base-url`](#project-base-url) | Base URL for the project/task/ticket system | `'https://example.com'`         |
| [`template-type`](#template-type)       | The template type to use                    | `'basic'`                       |
| [`custom-template`](#custom-template)   | If set, `template-type` is ignored          |                                 |
| [`prefixes`](#prefixes)                 | The prefixes to use                         | [Default prefixes](#prefixes)   |
| [`tickets`](#tickets)                   | The tickets to use                          | [Default tickets](#tickets)     |

### Title Format

The title format is used to determine how to format the pull request title.

The title format is a string that can contain the following placeholders:

- `prefix` - The prefix of the branch name
- `ticket` - The ticket number of the branch name
- `description` - The description of the branch name

Example:

```yaml
- uses: mateoguzmana/semantic-pull-request-prefill@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    title-format: 'prefix(ticket): description'
```

The default title format is based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). If you are using a different convention, you can pass your own title format.

### Project Base URL

The project base URL is used to determine the base URL for the project/task/ticket system.

Example:

```yaml
- uses: mateoguzmana/semantic-pull-request-prefill@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    project-base-url: 'https://<yourprojectdomain>/issues'
```

### Template Type

The template type is used to determine which template to use for the pull request title and body.

Choose one of the following template types:

- `basic`
- `conventional`
- `custom` (see [Custom Template](#custom-template))

### Custom Template

Custom templates can be used to customize the pull request title and body.

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

The prefixes are used to determine which prefix to use for the pull request title and body.

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
- uses: mateoguzmana/semantic-pull-request-prefill@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    prefixes: |
      ["feat", "fix", "chore", "docs", "refactor", "test", "style", "ci", "perf", "build"]
```

### Tickets

The tickets are used to determine which ticket to use for the pull request title and body.

The tickets are an array of strings. Default tickets are:

- `test`

You can pass them as an array of strings:

```yaml
- uses: mateoguzmana/semantic-pull-request-prefill@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    tickets: |
      ["test", "test2"]
```

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

MIT
