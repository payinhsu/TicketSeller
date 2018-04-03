import { combineReducers } from 'redux'
import { TOGGLE_TAB_OPEN_STATE } from '~/lib/actions'

/* Tab */
const tabsRawData = [
  {
    displayName: '售票管理',
    subTabs: [
      {name: '公告管理', url: '/game/announcement'},
      {name: '訂單管理', url: '/game/bettinginvoice'},
    ]
  },
  {
    displayName: '金流管理',
    subTabs: [
      {name: '存提報表', url: '/money/financialreport'},
    ]
  },
  {
    displayName: '帳號管理',
    subTabs: [
      {name: '會員帳號管理', url: '/account/member'},
    ]
  }
]
const tabsInitState = tabsRawData.reduce((container, tab, tabIndex) => {
  let newTab = {
    tabIndex,
    displayName: tab.displayName,
    tabIsOpen: false,
    subTabs: tab.subTabs.map(x => ({displayName: x.name, isActive: false, url: x.url}))
  }
  return [].concat(container).concat([newTab])
}, [])

const tabs = (state = tabsInitState, action) => {
  switch (action.type) {
    case TOGGLE_TAB_OPEN_STATE:
      return state.map(tab => tab.tabIndex === action.tabIndex
        ? Object.assign({}, tab, {tabIsOpen: !tab.tabIsOpen})
        : tab
      )
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tabs
})

export default rootReducer
