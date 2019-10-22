const { List, Map } = require("immutable");

function invert(map) {
    return map.reduce((res, val, key) => (
        res.has(val)
            ? res.update(val, keys => keys.push(key))
            : res.set(val, List.of(key))
    ), Map())
}

function updateAll(map, keys, updater) {
    return keys.reduce((map, index) => (
        map.update(index, value => updater(value))
    ), map);
}

module.exports = { invert, updateAll };