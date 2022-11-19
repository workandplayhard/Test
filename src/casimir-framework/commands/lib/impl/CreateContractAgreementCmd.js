import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import ProtocolEntityCmd from '../base/ProtocolEntityCmd';

/**
 * Create contract agreement command
 * @extends ProtocolEntityCmd
 */
class CreateContractAgreementCmd extends ProtocolEntityCmd {
  /**
   * Create command for contract agreement creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.creator
   * @param {Array.<string>} cmdPayload.parties
   * @param {string} cmdPayload.hash
   * @param {number} cmdPayload.activationTime
   * @param {number} cmdPayload.expirationTime
   * @param {number} cmdPayload.type
   * @param {Object} cmdPayload.terms
   */
  constructor(cmdPayload) {
    const {
      creator,
      parties,
      hash,
      activationTime,
      expirationTime,
      type,
      terms
    } = cmdPayload;

    assert(!!creator, "'creator' is required");
    assert(!!hash, "'hash' is required");
    assert(!!type, "'type' is required");
    assert(!!terms, "'terms' is required");
    assert(!!parties && Array.isArray(parties) && parties.length > 1, "'parties' is required");

    if (expirationTime && activationTime) {
      assert(
        new Date(expirationTime) > new Date(activationTime),
        "'expirationTime' must be greater than 'activationTime'"
      );
    } else if (expirationTime) {
      assert(
        new Date(expirationTime) > new Date(),
        "'expirationTime' must be greater than current time"
      );
    } else if (activationTime) {
      assert(
        new Date(activationTime) > new Date(),
        "'activationTime' must be greater than current time"
      );
    }



    super(APP_CMD.CREATE_CONTRACT_AGREEMENT, cmdPayload);
  }
}

export default CreateContractAgreementCmd;
