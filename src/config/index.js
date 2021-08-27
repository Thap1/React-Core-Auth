import { BUILD_VARIANTS } from "../constans";

const _loadEnvConfig = (env) => {
  switch (env) {
    case BUILD_VARIANTS.SIT:
      return require(`./sit/environment`);
    case BUILD_VARIANTS.UAT:
      return require(`./uat/environment`);
    case BUILD_VARIANTS.DEV:
      return require(`./dev/environment`);
    case BUILD_VARIANTS.MOCK:
      return require(`./mock/environment`);
    default:
      return require(`./production/environment`);
  }
};
export default class BuildConfig {
  _buildConfig = null;

  static init({ env }) {
    if (!env) {
      throw new Error("Envionment tyoe can not be blank / null");
    }
    this._buildConfig = _loadEnvConfig(env);
  }
  static get DEBUG() {
    return this._buildConfig?.ENV !== BUILD_VARIANTS.PRO;
  }
  static get ENV() {
    return this._buildConfig?.HOST;
  }
  static get BASE_URL() {
    console.log("Test");
    return this._buildConfig?.ENV || _loadEnvConfig(BUILD_VARIANTS.DEV).HOST;
  }
  static get IS_MOCK() {
    return this._buildConfig?.ENV === "MOCK";
  }
}
