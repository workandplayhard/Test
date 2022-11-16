export const NftItemMetadataDraftStatus = {
    IN_PROGRESS: 1,
    PROPOSED: 2,
    REJECTED: 3,
    APPROVED: 4,

    '1': 'IN_PROGRESS',
    '2': 'PROPOSED',
    '3': 'REJECTED',
    '4': 'APPROVED',
}


export const SYSTEM_ROLE = {
  ADMIN: 'admin',
  TEAM_ADMIN: 'team-admin',
  ANY: '*'
};


export const ViewMode = {
  CREATE: 1,
  EDIT: 2,
  READ: 3,

  '1': 'CREATE',
  '2': 'EDIT',
  '3': 'READ'
};


export const AttributeScope = {
  NFT_COLLECTION: 'nftCollection',
  NFT_ITEM: 'nftItem',
  USER: 'user',
  TEAM: 'team',
  nftCollection: 'NFT_COLLECTION',
  nftItem: 'NFT_ITEM',
  user: 'USER',
  team: 'TEAM'
}


export const RENDERER_SCHEMA_BLOCK_KEYS = [
  'id',
  'uid',
  'is',

  'data',
  'children',
  'proxyProps',
  'model',
  'text'
];

export const RENDERER_BLOCK_KEYS = [
  'id',
  'is',

  'name',
  'scope',
  'layoutType',

  'data',
  'children',
  'model',

  'disabledProps',
  'excludeProps',
  'proxyProps',
  'propsValues',

  'blockType',
  'dataType',
  'icon'
];

export const APP_BAR_HEIGHT = 56;


/**
  * Add value to enum
  * @param {Object} enumObj
  * @param {string} key
  * @param {string|number} value
*/
export function addValueToEnum(enumObj, key, value) {
  if (typeof value === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    value = Math.max.apply(null, [...Object.values(enumObj).map(it => +it).filter(it => !Number.isNaN(it)), -1]) + 1;
  }

  if (Number.isNaN(value)) {
    // eslint-disable-next-line no-param-reassign
    enumObj[key] = value;
  } else {
    // eslint-disable-next-line no-param-reassign
    enumObj[enumObj[key] = value] = key;
  }
}

/**
  * Create enum object from items
  * @param {Array|Object} items
  * @returns {Object}
*/
export function createEnum(items) {
  const enumObj = {};

  const isString = (val) => { typeof val === 'string' };

  if (Array.isArray(items)) {
    items.forEach(it => isString(it) ? addValueToEnum(enumObj, it) : addValueToEnum(enumObj, it.key, it.value));
  }

  if (typeof items === 'object') {
    Object.keys(items).forEach(it => isString(it) && addValueToEnum(enumObj, it, items[it]));
  }

  const keys = () => Object.keys(enumObj).reduce((res, key) => [...res, ...(!isNumeric(key) ? [key] : [])], []);

  const values = () => Object.keys(enumObj).reduce((res, key) => [...res, ...(isNumeric(key) ? [parseInt(key)] : [])], []);

  return { ...enumObj,
    ...{
      keys,
      values
    }
  };
}

/**
  * Map list from enum
  * @param {Object} enumObj
  * @param {Array} data
  * @returns {Array.<Object>}
*/
export const mapListFromEnum = (enumObj, data) => enumObj.values().map(value => ({
  value: parseInt(value),
  text: data[value]
}));


export const APP_CMD = createEnum({
  CREATE_DAO: 1,
  UPDATE_DAO: 2,
  CREATE_NFT_COLLECTION_METADATA: 3,
  UPDATE_NFT_COLLECTION_METADATA: 4,
  DELETE_NFT_COLLECTION_METADATA: 5,
  ADD_DAO_MEMBER: 6,
  CREATE_PROPOSAL: 7,
  ACCEPT_PROPOSAL: 8,
  DECLINE_PROPOSAL: 9,
  CREATE_ATTRIBUTE: 10,
  UPDATE_ATTRIBUTE: 11,
  DELETE_ATTRIBUTE: 12,
  REMOVE_DAO_MEMBER: 13,
  CREATE_INVESTMENT_OPPORTUNITY: 14,
  INVEST: 15,
  TRANSFER_FT: 16,
  TRANSFER_NFT: 17,
  CREATE_DOCUMENT_TEMPLATE: 18,
  UPDATE_DOCUMENT_TEMPLATE: 19,
  DELETE_DOCUMENT_TEMPLATE: 20,
  CREATE_FT: 21,
  CREATE_NFT_COLLECTION: 22,
  ISSUE_FT: 23,
  CREATE_NFT_ITEM: 24,
  CREATE_NFT_ITEM_METADATA_DRAFT: 25,
  UPDATE_NFT_ITEM_METADATA_DRAFT: 26,
  DELETE_NFT_ITEM_METADATA_DRAFT: 27,
  CREATE_NFT_ITEM_METADATA: 28,
  CREATE_CONTRACT_AGREEMENT: 36,
  ACCEPT_CONTRACT_AGREEMENT: 37,
  REJECT_CONTRACT_AGREEMENT: 38,
  UPDATE_PORTAL_PROFILE: 39,
  UPDATE_PORTAL_SETTINGS: 40,
  CREATE_LAYOUT: 41,
  UPDATE_LAYOUT: 42,
  DELETE_LAYOUT: 43,
  UPDATE_LAYOUT_SETTINGS: 44,
  UPDATE_ATTRIBUTE_SETTINGS: 45,
  UPDATE_NETWORK_SETTINGS: 46,
  DELETE_USER_PROFILE: 47,
  ALTER_DAO_AUTHORITY: 48,
  CREATE_PORTAL: 52,
  UPDATE_NFT_ITEM_METADATA_DRAFT_STATUS: 53,
  UPDATE_NFT_ITEM_METADATA_DRAFT_MODERATION_MSG: 54,
  SEND_REGISTRATION_CODE_BY_EMAIL: 55,
  IMPORT_DAO: 56
});

export const APP_PROPOSAL = createEnum({
  PROJECT_FUNDRASE_PROPOSAL: 4,
  TEAM_UPDATE_PROPOSAL: 5,
  ADD_DAO_MEMBER_PROPOSAL: 6,
  REMOVE_DAO_MEMBER_PROPOSAL: 7,
  FT_TRANSFER_PROPOSAL: 8,
  NFT_TRANSFER_PROPOSAL: 9,
  EXPRESS_LICENSE_PROPOSAL: 10,
  TOKENS_SWAP_PROPOSAL: 11,
  INVESTMENT_OPPORTUNITY_PROPOSAL: 13,
  CONTRACT_AGREEMENT_PROPOSAL: 14,
  NFT_LAZY_SELL_PROPOSAL: 15,
  NFT_LAZY_BUY_PROPOSAL: 16
});

