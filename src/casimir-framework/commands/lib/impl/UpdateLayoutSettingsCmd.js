import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString, isNumeric, isBoolean } from '@/casimir-framework/all';

import AppCmd from '../base/AppCmd';

/**
 * Update layout settings command
 * @extends AppCmd
 */
class UpdateLayoutSettingsCmd extends AppCmd {
  /**
   * Create command for layout settings update
   * @param {Object} cmdPayload
   */
  constructor(cmdPayload) {
    const layoutSettings = cmdPayload;

    assert(!!layoutSettings, "'layoutSettings' is required");

    super(APP_CMD.UPDATE_LAYOUT_SETTINGS, cmdPayload);
  }
}

export default UpdateLayoutSettingsCmd;
