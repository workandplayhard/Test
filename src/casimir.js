// eslint-disable-next-line import/no-unresolved
import Vue from 'vue';
import {
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO
} from 'date-fns';
import { enGB } from 'date-fns/locale';



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



const isString = (val) => { return typeof val === 'string'; };

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