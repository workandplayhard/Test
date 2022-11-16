// eslint-disable-next-line import/no-unresolved
import Vue from 'vue';
import {
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { chunkIt } from '@array-utils/chunk-it';
import { merge, cloneDeep, sortBy } from 'lodash';
import { ViewMode } from '@/constants'
import kindOf from 'kind-of';
import objectPath from 'object-path';
import {
  VIcon,
  VBtn,
  VDataTable
} from 'vuetify/lib/components';
import { pascalCase, camelCase } from 'change-case';
import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
import crc32 from 'crc/crc32';
import { find as deepFind } from 'find-keypath';
import md5 from 'md5';
import { sha256 } from '@noble/hashes/sha256';
import { ripemd160 } from '@noble/hashes/ripemd160';
import where from 'filter-where';
import { isEqual } from 'lodash';


/**
 * @param {boolean} condition
 * @param {string} [failureMessage = Assertion failed]
 */
export const assert = (
  condition,
  failureMessage = 'Assertion failed',
) => {
  if (condition) return;
  throw new Error(failureMessage);
};


/**
 * Create a “subclass” of the base Vue constructor
 * @param {Object} options
 * @returns {Function} component constructor
 */
export function defineComponent(options) {
  if (!options.name) {
    console.warn('[defineComponent]: The component is missing an explicit name');
    return options;
  }

  return Vue.extend(options);
};


export function getBindableProps(props) {
  return Object.keys(props)
    .reduce((props, key) => ({ ...props, ...(this[key] ? { [key]: this[key] } : {}) }), {});
};


/**
 * Class for bootstrapping app with Casimir
 */
export class CreateApp {
  #registeredModules = {}

  #modulesStorage = {}

  /**
   * @param {*} vueInstance
   * @param {Object} provideOptions
   */
  constructor(vueInstance, provideOptions = {}) {
    this.Vue = vueInstance;
    this.provideOptions = provideOptions;
  }

  /**
   * Install module
   * @param {string} name
   * @return {Promise|Function}
   */
  #installModule(name) {
    if (this.#modulesStorage[name]) {
      return this.#modulesStorage[name];
    }

    const { deps = [] } = this.#registeredModules[name].module;

    if (!deps.every((dep) => this.#registeredModules[dep])) {
      const missed = deps.filter((dep) => !this.#registeredModules[dep]);
      throw Error(`[${missed.join(', ')}] deps missed for ${name}`);
    }

    const useFn = () => {
      const {
        module,
        options
      } = this.#registeredModules[name];

      const {
        injectOptions = true
      } = options;

      return (
        module.init
          ? module.init()
          : Promise.resolve()
      ).then((data) => {
        const mergedOpts = {
          ...(injectOptions ? this.provideOptions : {}),
          ...options
        };
        this.Vue.use(module, mergedOpts, data);
      });
    };

    this.#modulesStorage[name] = (
      deps.length === 0
        ? Promise.resolve()
        : Promise.all(deps.map((dep) => this.#installModule(dep)))
    )
      .then(useFn);

    return this.#modulesStorage[name];
  }

  /**
   * Add module to registred modules
   * @param {Object} module
   * @param {Object} options
   * @return {CreateApp}
   */
  addModule(module, options = {}) {
    const { name } = module;

    if (!name) {
      throw Error('Module name not provided');
    }

    this.#registeredModules[name] = {
      module,
      options
    };

    return this;
  }

  /**
   * Install registered modules
   * @return {Array.<Promise>}
   */
  async bootstrap() {
    await Promise.all(
      Object.keys(this.#registeredModules)
        .map((module) => this.#installModule(module))
    );

    const installed = Object.keys(this.#registeredModules).sort();

    this.Vue.prototype.$casimirModules = installed;

    return installed;
  }
};




/**
 * Checks if value is Array
 * @param {*} val
 * @returns {boolean}
 */
export const isArray = (val) => kindOf(val) === 'array';

/**
 * Checks if value is Object
 * @param {*} val
 * @returns {boolean}
 */
export const isObject = (val) => kindOf(val) === 'object';

/**
 * Checks if value is File
 * @param {*} val
 * @returns {boolean}
 */
export const isFile = (val) => kindOf(val) === 'file';

/**
 * Checks if value is Function
 * @param {*} val
 * @returns {boolean}
 */
export const isFunction = (val) => kindOf(val) === 'function';

/**
 * Checks if value is Boolean
 * @param {*} val
 * @returns {boolean}
 */
export const isBoolean = (val) => kindOf(val) === 'boolean';

/**
 * Checks if value is String
 * @param {*} val
 * @returns {boolean}
 */
export const isString = (val) => kindOf(val) === 'string';

/**
 * Checks if value is Number
 * @param {*} val
 * @returns {boolean}
 */
export const isNumber = (val) => kindOf(val) === 'number';

/**
 * Checks if value is null or undefined
 * @param {*} val
 * @returns {boolean}
 */
export const isNil = (val) => val === undefined || val === null;

/**
 * Checks if value is numeric string
 * @param {*} val
 * @returns {boolean}
 */
export const isNumeric = (val) => {
  if (isNumber(val)) return false;
  return !Number.isNaN(val) && !Number.isNaN(Number.parseFloat(val));
};

/**
 * Checks if value is boolean, string or number
 * @param {*} val
 * @returns {boolean}
 */
export const isSimpleVal = (val) => ['boolean', 'string', 'number'].includes(kindOf(val));

/**
 * Checks if value is JSON string
 * @param {*} str
 * @returns {boolean}
 */
export const isJsonString = (str) => {
  if (!isString(str)) {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Checks if value is not nil or empty
 * @param {*} value
 * @returns {boolean}
 */
export const hasValue = (value) => {
  if (isNil(value)) return false;

  const res = [];

  if (isBoolean(value)) {
    res.push(true);
  }

  if (isSimpleVal(value)) {
    res.push(!!value);
  }

  if (isArray(value)) {
    for (const item of value) {
      res.push(hasValue(item));
    }
  }

  if (isObject(value)) {
    if (Object.keys(value).length) {
      for (const item of Object.values(value)) {
        res.push(hasValue(item));
      }
    } else {
      res.push(false);
    }
  }

  return res.includes(true);
};

/**
 * Check if object has property
 * @param {string} prop
 * @param {Object} obj
 * @returns {boolean}
 */
export const hasOwnProperty = (prop, obj) => {
  if (kindOf(obj) !== 'object') return false;
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const languages = {
  en: enGB
};

// TODO: move to @casimir.one/platform-util composables
export const dateMixin = {
  methods: {
    /**
     * Format date
     * @param {Date} date
     * @param {string} [formatStr=PPP]
     * @returns {string} formatted date
     */
    $$formatDate(date, formatStr = 'PPP') {
      const currentLocale = this.$i18n?.locale || 'en';
      return format(date, formatStr, {
        locale: languages[currentLocale]
      });
    },

    /**
     * Format distance between dates
     * @param {Date} date
     * @param {Date} baseDate
     * @param {Object} options
     * @returns {string} formatted distance between dates
     */
    $$formatDistance(date, baseDate, options) {
      const currentLocale = this.$i18n?.locale || 'en';
      return formatDistance(date, baseDate, {
        ...options,
        locale: languages[currentLocale]
      });
    },

    /**
     * Format distance between date and now
     * @param {Date} date
     * @param {Object} options
     * @returns {string} formatted distance between date and now
     */
    $$formatDistanceToNow(date, options) {
      const currentLocale = this.$i18n?.locale || 'en';
      return formatDistanceToNow(date, {
        ...options,
        locale: languages[currentLocale]
      });
    },

    /**
     * Parse string date in ISO
     * @param {string} dateString
     * @param {boolean} [convertToUtc=true]
     * @param {Object} options
     * @param {number} [options.additionalDigits=2]
     * @returns {Date} parsed date
     */
    $$parseISO(dateString, convertToUtc = false, options = { additionalDigits: 2 }) {
      if (!dateString) {
        return parseISO(dateString, options);
      }

      return convertToUtc ? parseISO(`${dateString}Z`, options) : parseISO(dateString, options);
    },

    /**
     * Format date in ISO
     * @param {Date} date
     * @returns {string} formatted date
     */
    $$formatISO(date) {
      let dateToParse = date;
      if (isString(date)) {
        dateToParse = new Date(date);
      }

      return `${dateToParse.toISOString().split('.')[0]}`;
    }
  }
};

export const SYSTEM_ROLE = {
  ADMIN: 'admin',
  TEAM_ADMIN: 'team-admin',
  ANY: '*'
};


export const routerView = { 
  template: '<router-view />' 
};


/**
 * Convert string to unit
 * @param {string} str
 * @param {string} unit
 * @returns {string}
 */


export function convertToUnit(str, unit = 'px') {
  if (isNil(str) || str === '' || str === ' ') {
    return undefined;
  }

  if (Number.isNaN(str) || Number.isNaN(parseFloat(str)) || Number.isNaN(Number(str))) {
    return String(str);
  }

  return `${Number(str)}${unit}`;
};


export const contextMixin = {
  methods: {
    hasSlot(name) {
      return !!(this.$slots[name] || this.$scopedSlots[name]);
    }
  }
};




/**
  * @typedef {string|Object|number|Array.<number>} Color
*/

/**
  * Convert from rgb to hex
  * @param {Color} rgb
  * @returns {string}
*/
export const rgbToHex = rgb => chroma(rgb).hex();

/**
  * Set the color opacity
  * @param {Color} color
  * @param {number} alpha
  * @returns {Object} Chroma object
*/
export const setAlpha = (color, alpha = 0.5) => {
  if (!color) return false;
  return chroma(color).alpha(alpha);
};

/**
  * Checks if color relative brightness is less than 0.5
  * @param {Color} color
  * @returns {boolean}
*/
export const isDarkColor = (color = '#000') => chroma(color).luminance() < 0.5;

// GET DOMINANT

/**
  * Generate image with upload resolution from another source
  * @param {string} imageURL
  * @returns {Image}
*/
const genTempImage = imageURL => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  // const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
  // img.src = googleProxyURL + encodeURIComponent(imageURL);
  img.src = imageURL;
  return img;
};

/**
  * Get dominant color from image by url
  * @param {string} imageURL
  * @returns {Promise} Promise object represents the dominant color from an image
*/
export const getDominantColor = imageURL => {
  if (!imageURL) return false;
  const colorThief = new ColorThief();
  const image = genTempImage(imageURL);
  return new Promise((resolve, reject) => {
    try {
      image.addEventListener('load', () => {
        resolve(colorThief.getColor(image));
      });
    } catch (err) {
      reject(err);
    }
  });
};
// GENERATE PALETTE

/**
  * Generate colors gradient
  * @param {number} [colorsCount=24]
  * @param {Array.<number>} [gradientRange=[0, 24]]
  * @param {Array.<string>} [palette=['#feff9a', '#7eccbb', '#4cb1d0', '#5569ed', '#6846c0']]
  * @returns {Array.<string>}
*/
export const genColorsGradient = (colorsCount = 24, gradientRange = [0, 100], palette = ['#feff9a', '#7eccbb', '#4cb1d0', '#5569ed', '#6846c0']) => {
  const gradient = chroma.scale(palette).mode('rgb').correctLightness().colors(1000);
  const start = Math.floor(gradient.length * (gradientRange[0] / 100));
  const length = Math.floor(gradient.length * ((gradientRange[1] - gradientRange[0]) / 100));
  const resultGradient = gradient.splice(start, length);
  const chunks = chunkIt(resultGradient).count(colorsCount);
  const result = [];

  for (const c of chunks) {
    result.push(c[Math.floor(c.length / 2)]);
  }

  return result;
};

/**
  * Generate color pair
  * @param {Color} [bg=#000]
  * @param {boolean} [darkOnly=false]
  * @param {boolean} [lightOnly=false]
  * @returns {string}
*/
export const genColorPair = (bg = '#000', darkOnly = false, lightOnly = false) => {
  const luminance = chroma(bg).luminance();
  const delta = 3 - 0.1 * luminance;
  const dark = chroma(bg).darken(delta).hex();
  const light = chroma(bg).brighten(delta).hex();

  if (darkOnly) {
    return dark;
  }

  if (lightOnly) {
    return light;
  }

  return luminance > 0.5 ? dark : light;
};

/**
  * Generate color palette
  * @param {Object} options
  * @param {number} options.colorsCount
  * @param {Array.<number>} options.gradientRange
  * @param {Array.<string>} options.palette
  * @returns {Array.<Object>}
*/
export const genColorsPalette = (options = {}) => {
  const {
    colorsCount,
    gradientRange,
    palette
  } = options;
  const colors = genColorsGradient(colorsCount, gradientRange, palette);
  return colors.map(color => ({
    background: color,
    foreground: genColorPair(color),
    foregroundDark: genColorPair(color, true),
    foregroundLight: genColorPair(color, false, true)
  }));
};


/**
  * Get messages by locales
  * @param {Object} locales
  * @returns {Object}
*/
const getMessagesByLocales = locales => {
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);

    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
};

/**
  * Get locales messages
  * @param {Object} i18n VueI18n
  * @param {Object} locales
*/
export const setLocalesMessages = (i18n, locales) => {
  const messagesByLocales = getMessagesByLocales(locales);

  for (const [locale, messages] of Object.entries(messagesByLocales)) {
    const appMessages = i18n.getLocaleMessage(locale);
    i18n.setLocaleMessage(locale, merge(appMessages, messages));
  }
};

export const wrapInArray = (v) => {
  if (!v) return [];
  return isArray(v) ? v : [v];
};



/**
 * Create form mixin
 * @param {string} [prop=value]
 * @param {string} [event=input]
 * @param {Function} [defaultPropValue=() => ({})]
 * @param {Object} [lazyFormData={}]
 * @returns {Object} Vue mixin object
 */
const formFactory = (
  prop = 'value',
  event = 'input',
  defaultPropValue = () => ({}),
  lazyFormData = {}
) => ({
  name: 'FormFactory',

  model: {
    prop,
    event
  },
  props: {
    [prop]: {
      type: Object,
      default: defaultPropValue
    },

    mode: {
      type: [String, Number],
      default: ViewMode.CREATE,
      validator(value) {
        return Object.values(ViewMode).includes(value);
      }
    }
  },

  data() {
    return {
      lazyFormData: cloneDeep(lazyFormData),

      disabled: false,
      loading: false,

      oldValue: null,
      forceUpdateKey: Date.now()
    };
  },

  computed: {
    formData: {
      get() {
        return this.lazyFormData;
      },
      set(val) {
        if (isEqual(val, this.lazyFormData)) return;
        this.lazyFormData = val;
        this.$emit(event, val);
      }
    },

    untouched() {
      return this.oldValue && isEqual(this.oldValue, this.lazyFormData);
    },

    isEditMode() {
      return this.mode === ViewMode.EDIT;
    }
  },

  watch: {
    [prop]: {
      handler(val) {
        if (val && !isEqual(val, this.lazyFormData)) {
          this.lazyFormData = cloneDeep(val);
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    if (this[prop]) {
      this.setOldValue();
    }
  },

  methods: {
    setOldValue() {
      this.oldValue = cloneDeep(this[prop]);
    },

    restoreOldValue(forceUpdate = false) {
      this.lazyFormData = this.oldValue;
      if (forceUpdate) {
        // Add :key="forceUpdateKey" to the form to rerender it
        this.forceUpdateKey = Date.now();
      }
    }
  }
});

/**
 * Create form mixin with default params
 */
const formMixin = formFactory();

export { formFactory, formMixin };


/**
 * @param {Object} obj
 * @param {string[]} keys
 * @param {boolean} isExclude
 * @return {Object}
 */
export const filterObjectKeys = (obj, keys, isExclude = false) => {
  if (!keys) return obj;
  const filterKeys = Object.keys(obj).filter(key => keys.includes(key) === !isExclude);
  return filterKeys.reduce((acc, key) => ({ ...acc,
    ...{
      [key]: obj[key]
    }
  }), {});
};

export { default as RecursiveIterator } from "recursive-iterator";

/**
  * Merge collections
  * @param {Array} c1 - First collection
  * @param {Array} c2 - Second collection
  * @param {Object} opts
  * @param {string} opts.key
  * @param {boolean} opts.mergeItem
  * @returns {Array}
*/
export const collectionMerge = (c1 = [], c2 = [], opts = defaultOpts) => {
  const col1 = wrapInArray(c1);
  const col2 = wrapInArray(c2);
  const {
    key,
    mergeItem
  } = opts;
  const result = [...col1];

  for (const item of col2) {
    const idx = col1.findIndex(i => i[key] && item[key] && i[key] === item[key]);

    if (idx >= 0) {
      result[idx] = mergeItem ? merge(result[idx], item) : item;
    } else {
      result.push(item);
    }
  }

  return result;
};

/**
  * Find item in collection by query
  * @param {Array.<Object>} collection
  * @param {Object} query
  * @returns {Object}
*/
export const collectionOne = (collection, query) => collection.find(where(query));

/**
  * Get item list from collection by query
  * @param {Array.<Object>} collection
  * @param {Object} query
  * @returns {Array.<Object>}
*/
export const collectionList = (collection, query) => collection.filter(where(query));


/**
 * Factory for generating list getter
 * @param {Object} [opts={}]
 * @param {string} [options.storeKey=data]
 * @returns {Function}
 */
export const listGetterFactory = (opts = {}) => {
  const {
    storeKey = 'data'
  } = opts;

  return (state) => (query = {}) => {
    if (!state[storeKey]) {
      throw new Error(`state.${storeKey} is undefined`);
    }

    return collectionList(state[storeKey], query);
  };
};
export const listGetter = listGetterFactory();

/**
 * Factory for generating one getter
 * @param {Object} [opts={}]
 * @param {string} [options.selectorKey=_id]
 * @param {string} [options.storeKey=data]
 * @returns {Function}
 */
export const oneGetterFactory = (opts = {}) => {
  const {
    selectorKey = '_id',
    storeKey = 'data'
  } = opts;

  return (state) => (itemId, query = {}) => {
    if (!itemId) {
      throw new Error(`${selectorKey} id not specified`);
    }
    if (!state[storeKey]) {
      throw new Error(`state.${storeKey} is undefined`);
    }

    return collectionOne(state[storeKey], {
      [selectorKey]: itemId,
      ...query
    });
  };
};
export const oneGetter = oneGetterFactory();




/**
 * Factory for generating mutation for merging list of items into store
 * @param {Object} [opts={}]
 * @param {string} [options.mergeKey=_id]
 * @param {string} [options.storeKey=data]
 * @returns {Function} mutation
 */
export const setListMutationFactory = (opts = {}) => {
  const {
    mergeKey = '_id',
    storeKey = 'data'
  } = opts;

  return (state, payload) => {
    if (!payload) return;

    state[storeKey] = [...collectionMerge(
      state[storeKey],
      payload,
      { key: mergeKey }
    )];
  };
};
export const setListMutation = setListMutationFactory();

/**
 * Factory for generating mutation for merging one item into store
 * @param {Object} [opts={}]
 * @param {string} [options.mergeKey=_id]
 * @param {string} [options.storeKey=data]
 * @returns {Function} mutation
 */
export const setOneMutationFactory = (opts = {}) => {
  const {
    mergeKey = '_id',
    storeKey = 'data'
  } = opts;

  return (state, payload) => {
    if (!payload) return;

    state[storeKey] = collectionMerge(
      state[storeKey],
      payload,
      { key: mergeKey }
    );
  };
};
export const setOneMutation = setOneMutationFactory();

/**
 * Factory for generating mutation for removing item from store
 * @param {Object} [opts={}]
 * @param {string} [options.mergeKey=_id]
 * @param {string} [options.storeKey=data]
 * @returns {Function} mutation
 */
export const removeFromListMutationFactory = (opts = {}) => {
  const {
    mergeKey = '_id',
    storeKey = 'data'
  } = opts;

  return (state, id) => {
    if (!id) return;
    if (!state[storeKey]) throw new Error(`state.${storeKey} is undefined`);

    const index = state[storeKey].findIndex((item) => item[mergeKey] === id);
    if (index > -1) {
      state[storeKey].splice(index, 1);
    }
  };
};
export const removeFromListMutation = removeFromListMutationFactory();

/**
 * Factory for generating mutation for removing all items from store
 * @param {Object} [opts={}]
 * @param {string} [options.storeKey=data]
 * @param {Array} [options.emptyData=[]]
 * @returns {Function} mutation
 */
export const clearMutationFactory = (opts = {}) => {
  const {
    storeKey = 'data',
    emptyData = []
  } = opts;

  return (state) => {
    state[storeKey] = emptyData;
  };
};
export const clearMutation = clearMutationFactory();




/**
 * Generate default list item actions
 * @returns {Array} item actions
 */
const defaultAdminListItemActions = () => [
  {
    icon: 'mdi-pencil',
    clickEvent: 'click-edit'
  },
  {
    icon: 'mdi-delete',
    clickEvent: 'click-remove'
  }
];

/**
 * Generate default header action
 * @returns {Array}
 */
const defaultAdminHeaderActions = () => [
  {
    icon: 'mdi-tune-vertical',
    clickEvent: 'click-settings',
    label: 'Settings',
    props: {
      outlined: true,
      color: 'primary'
    }
  },
  {
    icon: 'mdi-plus',
    clickEvent: 'click-create',
    label: 'Create',
    props: {
      color: 'primary'
    }
  }
];

/**
 * Basic list component for admin pages
 */
export const AdminListPage = defineComponent({
  name: 'AdminListPage',

  props: {
    itemActions: {
      type: Array,
      default: () => defaultAdminListItemActions()
    },
    headerActions: {
      type: Array,
      default: () => defaultAdminHeaderActions()
    },
    pageTitle: {
      type: String,
      default: 'Admin list'
    }
  },

  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          align: 'end',
          sortable: false,
          value: 'actions'
        }
      ],
      tableProps: {
        itemsPerPage: 50,
        footerProps: {
          itemsPerPageOptions: [5, 10, 20, 50, -1]
        }
      }
    };
  },

  methods: {
    genCtrl(data) {
      const {
        icon,
        label,
        clickEvent,
        action,
        item,
        props
      } = data;

      const onClick = (e) => {
        e.stopPropagation(); // .stop didn't work

        if (action && isFunction(action)) {
          action();
        } else {
          this.$emit(clickEvent, item);
          const onMethod = `on${pascalCase(clickEvent)}`;
          if (Object.prototype.hasOwnProperty.call(this, onMethod)) {
            this[onMethod](item);
          }
        }
      };

      const btnData = {
        staticClass: 'ml-2',
        props: {
          ...(label ? { small: true } : { xSmall: true }),
          ...(icon && !label ? { icon: true } : {}),
          ...props || {}
        },
        on: {
          click: onClick
        }
      };

      return (
        <VBtn {...btnData}>
          {icon
            ? <VIcon {...{ props: { ...(label ? { left: true } : {}) } }} small>{icon}</VIcon>
            : ''}
          {label || ''}
        </VBtn>
      );
    },

    // BLOCKS GENERATORS

    onRowClick(item) {
      this.$emit('click-row', item);
    },

    genTable(items, scopedSlots) {
      const listeners = {
        on: {
          'click:row': this.onRowClick
        }
      };

      return (
        <VDataTable
          scopedSlots={scopedSlots}
          items={items}
          headers={this.headers}

          hideDefaultFooter={items.length < this.tableProps.itemsPerPage}
          footerProps={this.tableProps.footerProps}
          itemsPerPage={this.tableProps.itemsPerPage}
          { ...listeners }
        />
      );
    },

    genProvider() {
      return <div>No data provider</div>;
    },

    genWrapper() {
      return (
        <VexSection>
          <VexSectionTitle staticClass="mb-8">
            {this.pageTitle}

            <template slot="append">
              {this.headerActions.map((act) => this.genCtrl(act))}
            </template>
          </VexSectionTitle>

          {this.genProvider()}
        </VexSection>
      );
    },

    // SLOTS GENERATORS

    genTableSlots() {
      return {
        'item.actions': ({ item }) => this.itemActions.map((act) => this.genCtrl({ item, ...act }))
      };
    },

    genProviderSlots(itemsKey = 'items') {
      return {
        default: ({
          [itemsKey]: items
        }) => this.genTable(items, this.genTableSlots())
      };
    }

  },

  render() {
    return this.genWrapper();
  }
});

/**
 * @param {Object} obj
 * @param {function} comparator
 * @return {Object}
 */
export const sortObjectKeys = (obj, comparator) => {
  const clone = cloneDeep(obj);

  if (isArray(clone)) {
    return clone.map((i) => sortObjectKeys(i));
  }

  if (isObject(clone)) {
    const keys = sortBy(
      Object.keys(clone),
      (key) => (comparator ? comparator(obj[key], key) : key)
    );

    return keys.reduce((acc, key) => ({
      ...acc,
      ...{ [key]: sortObjectKeys(obj[key]) }
    }), {});
  }

  return clone;
};

/**
 * @param {Object} obj
 * @return {Object}
 */
export const deepFreeze = (obj) => {
  const propsNames = Object.getOwnPropertyNames(obj);
  propsNames.forEach((name) => {
    const prop = obj[name];

    if (isObject(prop) && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
};

/**
 * @param {Object} obj
 * @param {string[]} [exception=['_id', '__v']]
 * @return {Object}
 */
export const camelizeObjectKeys = (obj, exception = ['_id', '__v']) => {
  if (!obj) return {};
  return Object.keys(obj)
    .reduce((o, key) => ({
      ...o,
      ...{
        [exception.includes(key) ? key : camelCase(key)]: obj[key]
      }
    }), {});
};

/**
 * @param {Object} obj
 * @param {number} [turns = 3]
 * @return {string}
 */
export const genObjectId = (obj, turns = 3) => {
  const sorted = sortObjectKeys(obj);

  return new Array(turns)
    .fill(null)
    .map((x, index) => index)
    .reduce((x, index) => x + crc32(`turn-${index + 1}-${JSON.stringify(sorted)}`)
      .toString(16), '');
};


/**
 * @param {boolean} condition
 * @param {string} failureMessage
 * @return {assert}
 */
const deepFindAssert = (
  condition,
  failureMessage
) => {
  assert(
    condition,
    `[deepFindParentByValue]: ${failureMessage}`
  );
};

/**
 * Find string value in object
 * @param {Object} obj
 * @param {string} value
 * @param {boolean} returnObject
 * @return {{path: string[], data: Object} | Object}
 */
export const deepFindParentByValue = (obj, value, returnObject = false) => {
  deepFindAssert(!!obj, 'You must specify object');
  deepFindAssert(!!value, 'You must specify search value');
  deepFindAssert(isSimpleVal(value), 'Value must be a primitive');

  const path = deepFind(obj, value).slice(0, -1);

  if (!path.length) {
    return undefined;
  }

  const data = objectPath.get(obj, path);

  return returnObject ? { path, data } : data;
};


export { v4 as uuidv4 } from 'uuid';


const mainPattern = /{{\s*([\w\d.:,()'"\s]*?)\s*}}/g;
const fnSubPattern = /^\(([\w\d.,_\s'"]*)\)(::[\w\d]+)+/g;

/**
 * Check if has single match
 * @param {string} str
 * @param {Array.<Array.<string>>} matches
 * @returns {boolean}
 */
export const isSingleMatch = (str, matches) => {
  if (matches.length === 1) {
    return str.replace(matches[0][0], '').replace(/ /g, '') === '';
  }

  return false;
};

/**
 * Check for function
 * @param {string} str
 * @returns {boolean}
 */
export const isFunctionMatch = str => !![...str.matchAll(fnSubPattern)].length;
export class TemplateStringParser {
  constructor(ctx, options = {
    isTemplateShown: false
  }) {
    this.ctx = ctx;
    const {
      isTemplateShown
    } = options;
    this.isTemplateShown = isTemplateShown;
  }

  /**
  * Set context
  * @param {Object} ctx
  */
  setCtx(ctx) {
    this.ctx = ctx;
  }

  /**
  * Parse string
  * @param {*} str
  * @returns {string}
  */
  parse(str) {
    if (typeof str !== 'string') {
      throw new Error('The argument must be a string type');
    }

    const matches = [...str.matchAll(mainPattern)];

    if (matches && matches.length) {
      if (isSingleMatch(str, matches)) {
        return this.parseMatch(matches[0][1]);
      }

      return str.replace(mainPattern, (matched, match) => {
        const parsedMatch = this.parseMatch(match);
        return !isNil(parsedMatch) ? parsedMatch : '';
      });
    }

    return str;
  }

  /**
  * Get value from context
  * @param {string} prop
  * @returns {*}
  */
  getValueFromContext(prop) {
    return objectPath.get(this.ctx, prop);
  }

  /**
  * Check for property in context
  * @param {string} prop
  * @returns {boolean}
  */
  isCtxHas(prop) {
    return objectPath.has(this.ctx, prop);
  }

  /**
  * Parse chain match
  * @param {Array} chain
  * @param {string} match
  * @param {...Array.<string>} params
  * @returns {string}
  */
  parseChainMatch(chain, match, ...params) {
    if (!chain.length) {
      throw new Error('Chain not exist');
    }

    const fn = chain.pop();
    const isFnExist = this.isCtxHas(fn);
    let result;

    if (isFnExist) {
      result = this.getValueFromContext(fn)(...params);
    } else if (this.isTemplateShown) {
      result = `{{${match}}}`;
    }

    if (chain.length && isFnExist) {
      return this.parseChainMatch(chain, match, ...[result]);
    }

    return result;
  }

  /**
  * Parse match
  * @param {string} match
  * @returns {string}
  */
  parseMatch(match) {
    if (isFunctionMatch(match)) {
      const [params, ...fns] = match.split('::');
      const chain = fns.reverse();
      const chainParams = [...params.matchAll(/\(([\w\d.,_\s'"]*)\)/g)]?.[0]?.[1];
      const parsedParams = chainParams ? chainParams.split(/,\s*/).map(p => {
        const s = [...p.matchAll(/(?:['"])(.*)(?:['"])/g)]?.[0]?.[1];
        return s || this.getValueFromContext(p);
      }) : [];
      return this.parseChainMatch(chain, match, ...parsedParams);
    }

    const value = this.getValueFromContext(match);
    return !isNil(value) || !this.isTemplateShown ? value : `{{${match}}}`;
  }

}


export class Singleton {
  static instance;

  /**
   * Get the Singleton instance.
   * @param {...any} params
   * @returns {Singleton}
   */
  static getInstance(...params) {
    // eslint-disable-next-line no-return-assign
    return this.instance ? this.instance : this.instance = new this(...params);
  }

}

/**
 * @return {{load: (function(*): *), store: store}}
 */
function makeSingletonStorage() {
  const storage = {};
  return {
    load: key => storage[key],
    store: (key, value) => {
      storage[key] = value;
    }
  };
}

/**
 * @param createInstance
 * @return {function(...[*]): *}
 */
export function makeSingletonInstance(createInstance) {
  let storage;
  return (...args) => {
    if (!storage) {
      storage = makeSingletonStorage();
    }

    const key = JSON.stringify(args);
    let instance = storage.load(key);

    if (!instance) {
      instance = createInstance(...args);
      storage.store(key, instance);
    }

    return instance;
  };
}



/**
 * @param data
 * @return {string}
 */
function hexify(data) {
  let result = '';
  const view = new Uint8Array(data);

  for (let i = 0; i < view.byteLength; i++) {
    if (view[i] < 16) {
      result += '0';
    }

    result += view[i].toString(16);
  }

  return result;
}

/**
  * Generate sha256 hash
  * @param {*} val
  * @returns {string}
*/
export const genSha256Hash = val => {
  if (isNil(val)) return undefined;
  let string = val;

  if (isObject(val) || isArray(val)) {
    string = JSON.stringify(val);
  }

  return hexify(sha256(string));
};

/**
  * Generate ripemd160 hash
  * @param {*} val
  * @returns {string}
*/
export const genRipemd160Hash = val => {
  if (isNil(val)) return undefined;
  let string = val;

  if (isObject(val) || isArray(val)) {
    string = JSON.stringify(val);
  }

  return hexify(ripemd160(string));
};

/**
  * Generate md5 hash
  * @param {*} val
  * @returns {string}
*/
export const genMd5Hash = val => {
  if (isNil(val)) return undefined;
  let string = val;

  if (isObject(val) || isArray(val)) {
    string = JSON.stringify(val);
  }

  return md5(string);
};
