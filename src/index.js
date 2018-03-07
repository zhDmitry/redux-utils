import produce from 'immer'

function getType(actionName, prefix) {
    const actionTypePath = [actionName]

    if (prefix) {
        actionTypePath.unshift(prefix)
    }
    const type = actionTypePath.join('/')

    return type
}

const using = (propName = 'payload', payloadReducer = s => s) => (
    actionName,
    prefix,
) => {
    const type = getType(actionName, prefix)

    return args => ({type, [propName]: payloadReducer(args)})
}

const createActions = (actions, {prefix}) => {
    return Object.keys(actions).reduce((acc, actionName) => {
        const fn = actions[actionName]
        const actionCreator = fn(actionName, prefix)
        const type = getType(actionName, prefix)

        actionCreator.toString = function() {
            return type
        }
        acc[actionName] = actionCreator
        return acc
    }, {})
}

function mergeReducers(initialState, ...reducers) {
    if (typeof initialState === 'function') {
        reducers.push(initialState)
        initialState = {}
    }
    const rootReducer = reducers.reduce((acc, el) => {
        return {...acc, ...el}
    }, {})

    return produce((state = initialState, action) => {
        const reducer = rootReducer[action.type]

        if (reducer) {
            const newState = reducer(state, action)

            return newState ? newState : state
        } else {
            return state
        }
    })
}

export {createActions, using, getType, mergeReducers}
