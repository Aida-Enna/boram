/**
 * JSS-related routines.
 * @module boram/jss
 */

import jss from "jss";
import extend from "jss-extend";
import nested from "jss-nested";
import camelCase from "jss-camel-case";
import defaultUnit from "jss-default-unit";

// Plugins used across application.
jss.use(extend(), nested(), camelCase(), defaultUnit());

/** Application components should use that reexport. */
export {jss};
export default jss;

/**
 * Similar to `useSheet` from react-jss but doesn't create wrapper
 * component and attaches styles immediately.
 * Note that API of this decorator is slightly different.
 */
export function useSheet(...opts) {
  const sheet = jss.createStyleSheet(...opts).attach();
  return function(target) {
    // Normal component.
    if (target.prototype.render) {
      target.prototype.sheet = sheet;
      return target;
    // Stateless component.
    } else {
      return function(props) {
        return target(props, sheet);
      };
    }
  };
}