import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Delete attribute command
 * @extends AppCmd
 */
class DeleteAttributeCmd extends AppCmd {
  /**
   * Create command for attribute deletion
   * @param {Object} cmdPayload
   * @param {Object} cmdPayload.attributeId
   */
  constructor(cmdPayload) {
    const {
      attributeId
    } = cmdPayload;

    assert(!!attributeId, "'attributeId' is required");

    super(APP_CMD.DELETE_ATTRIBUTE, cmdPayload);
  }
}

export default DeleteAttributeCmd;
