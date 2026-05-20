'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massive = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const filteredState = {};

      for (const key in newState) {
        if (!action.keysToRemove.includes(key)) {
          filteredState[key] = newState[key];
        }
      }
      newState = filteredState;
    }
    massive.push(newState);
  }

  return massive;
}

module.exports = transformStateWithClones;
