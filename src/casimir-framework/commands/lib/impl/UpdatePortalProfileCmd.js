import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString, isNumeric, isBoolean } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Update portal profile command
 * @extends AppCmd
 */
class UpdatePortalProfileCmd extends AppCmd {
  /**
   * Create command for portal profile update
   * @param {Object} cmdPayload
   * @param {Object} cmdPayload.settings
   */
  constructor(cmdPayload) {
    const {
      settings
    } = cmdPayload;

    assert(!!settings, "'settings' is required");

    super(APP_CMD.UPDATE_PORTAL_PROFILE, cmdPayload);
  }
}

export default UpdatePortalProfileCmd;
