import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString, isNumeric } from '@/casimir-framework/all';

import ProtocolCmd from '../base/ProtocolCmd';

/**
 * Reject contract agreement command
 * @extends ProtocolCmd
 */
class RejectContractAgreementCmd extends ProtocolCmd {
  /**
   * Create command for contract agreement rejection
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.entityId
   * @param {string} cmdPayload.party
   */
  constructor(cmdPayload) {
    const {
      entityId,
      party
    } = cmdPayload;

    assert(!!entityId, "'entityId' is required");
    assert(!!party, "'party' is required");

    super(APP_CMD.REJECT_CONTRACT_AGREEMENT, cmdPayload);
  }
}

export default RejectContractAgreementCmd;
