/* eslint-disable no-fallthrough */

import {mergeReducers} from 'redux-utils'
import {actions} from './actions'

const initialState = {}

const reducer = {
    [actions.setConfig](state, action) {
        state.config = {...state.config, ...action.config}
    },
    [actions.countPages](state, action) {
        state.pagesCount = action.pagesCount
    },
    [actions.finishConvertion](state, action) {
        state.convertionActive = false
    },
}

const pagesMutator = {
    [actions.changePage](state, action) {
        Object.assign(state, {
            subPageUri: null,
            errorNotification: false,
            inputDocumentItem: null,
        })
    },

    ["OLD_REDUX_ACTION"](state, action) {
        Object.assign(state, {
            subPageUri: action.url,
            errorNotification: true,
            inputDocumentItem: null,
        })
    }
}
const reducer = mergeReducers(initialState, pagesMutator, reducer)

export {reducer}
