import {createActions, using} from 'redux-utils'

const actions = createActions(
    {
        setConfig: using('config'),
        setLocale: using('locale'),
        setLoading: using('value'),
        initApp: using('config'),
        home: using(),
        upload: using('file')
    },
    {prefix: 'user'},
)

export {actions}
