import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Delete layout command
 * @extends AppCmd
 */
class DeleteLayoutCmd extends AppCmd {
  /**
   * Create command for layout deletion
   * @param {Object} cmdPayload
   * @param {Object} cmdPayload.layoutId
   */
  constructor(cmdPayload) {
    const {
      layoutId
    } = cmdPayload;

    assert(!!layoutId, "'layoutId' is required");

    super(APP_CMD.DELETE_LAYOUT, cmdPayload);
  }
}

export default DeleteLayoutCmd;
