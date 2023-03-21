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

- `{{prefix}}` - The prefix of the branch name
- `{{ticket}}` - The ticket number of the branch name
- `{{projectBaseUrl}}` - The project base URL
- `{{description}}` - The description of the branch name

_**Note**: Currently, the custom template will only replace the values above. If you are looking for a more advanced template, please open an issue. I am still investigating how to do something smarter where you can add conditional logic to the template._

---

## Action Development

## Code in Main

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
