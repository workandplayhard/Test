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



export const isString = (val) => { return typeof val === 'string'; };
export const isArray = (val) => { return Array.isArray(val); };

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

export const isNil = (val) => val === undefined || val === null;

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

