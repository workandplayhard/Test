import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString, isNumeric, isBoolean } from '@/casimir-framework/all';

import AppCmd from '../base/AppCmd';

/**
 * Update nft collection metadata command
 */
class UpdateNftCollectionMetadataCmd extends AppCmd {
  /**
   * Create command for project update
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {string} cmdPayload.issuer
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      // onchain
      _id,

      // offchain
      // eslint-disable-next-line no-unused-vars
      attributes
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.UPDATE_NFT_COLLECTION_METADATA, cmdPayload);
  }
}

export default UpdateNftCollectionMetadataCmd;
