import * as core from '@actions/core'
import { exec } from '@actions/exec'

export async function deploy(): Promise<void> {
  core.startGroup('Deploy to Platform.sh')
  const env = {
    ...process.env,
    SSH_PRIVATE_KEY: core.getInput('ssh-private-key'),
    PLATFORM_PROJECT_ID: core.getInput('project-id'),
    PLATFORMSH_CLI_TOKEN: core.getInput('cli-token'),
    FORCE_PUSH: core.getInput('force-push'),
    ENVIRONMENT_NAME: core.getInput('environment-name'),
    KNOWN_HOSTS_PATH: `${__dirname}/../known_hosts`
  }
  await exec(`${__dirname}/../scripts/deploy.sh`, [], { env })
  core.endGroup()
}
