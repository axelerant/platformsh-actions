import * as core from '@actions/core'
import { exec } from '@actions/exec'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const action = core.getInput('action')
  if (!['deploy', 'clean'].includes(action)) {
    throw new Error('Invalid action to perform')
  }

  core.startGroup('Install Platform.sh cli')
  const cliVersion = core.getInput('cli-version')
  let cliInstallUrl =
    'curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | bash'
  if (cliVersion !== 'latest') {
    // Validate version input to prevent command injection
    if (!/^[\d.]+$/.test(cliVersion)) {
      throw new Error(
        'Invalid version format. Only numbers and dots are allowed.'
      )
    }
    cliInstallUrl = `curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | VERSION=${cliVersion} bash`
  }
  await exec(cliInstallUrl)
  core.endGroup()

  core.info('Inside custom action')
}
