import Configuration, { ContextConfiguration } from '../internal/context/Context'

export { ContextConfiguration } from '../internal/context/Context'

/**
 * Does set the global context based on the passed configuration
 *
 * @param {ConfigurationObject} config
 *
 * @returns {void}
 */
export function init(config: ContextConfiguration): void {
  Configuration.set(config)
}
