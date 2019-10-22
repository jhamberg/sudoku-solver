const { List, Map } = require("immutable");

const invert = (map) => (
    map.reduce((res, val, key) => (
        res.has(val)
            ? res.update(val, keys => keys.push(key))
            : res.set(val, List.of(key))
    ), Map())
);

module.exports = { invert };