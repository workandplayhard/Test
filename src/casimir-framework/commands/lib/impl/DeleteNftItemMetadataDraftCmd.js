import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Delete nft item metadata draft command
 * @extends AppCmd
 */
class DeleteNftItemMetadataDraftCmd extends AppCmd {
  /**
   * Create command for nft item metadata draft delition
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   */
  constructor(cmdPayload) {
    const {
      _id
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.DELETE_NFT_ITEM_METADATA_DRAFT, cmdPayload);
  }
}

export default DeleteNftItemMetadataDraftCmd;
