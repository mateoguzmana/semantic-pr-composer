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

---

## Options

| Option                                | Description                                 | Default                         |
| ------------------------------------- | ------------------------------------------- | ------------------------------- |
| `github-token`                        | The GitHub token to use for the API calls.  | `${{ secrets.GITHUB_TOKEN }}`   |
| `title-format`                        | The title format to use                     | `'prefix(ticket): description'` |
| [`template-type`](#template-type)     | The template type to use                    | `'basic'`                       |
| `project-base-url`                    | Base URL for the project/task/ticket system | `'https://example.com'`         |
| [`custom-template`](#custom-template) | If set, `template-type` is ignored          |                                 |

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

_**Note**: Currently, the custom template will only replace the values above. If you are looking for a more advanced template, please open an issue. I am still investigating how to do something smarter where you can add conditional logic to the template._

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

MIT
