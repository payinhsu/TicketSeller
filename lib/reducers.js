import { combineReducers } from 'redux'
import { TOGGLE_TAB_OPEN_STATE } from '~/lib/actions'

/* Tab */
const tabsRawData = [
  {
    displayName: '售票活動',
    iconName: 'ic_person_24px',
    subTabs: [
      {name: '優惠', url: '/activity/discount'},
      {name: '音樂', url: '/activity/music'},
      {name: '戲劇', url: '/activity/drama'},
      {name: '舞蹈', url: '/activity/dance'},
      {name: '親子', url: '/activity/child'},
      {name: '電影', url: '/activity/movie'},
      {name: '演唱會', url: '/activity/concert'},
      {name: '講座', url: '/activity/lecture'},
    ]
  },
  {
    displayName: '商品銷售',
    iconName: 'ic_person_24px',
    subTabs: [
      {name: '熱賣', url: '/goods/hot'},
    ]
  },
  {
    displayName: '帳號管理',
    iconName: 'ic_person_24px',
    subTabs: [
      {name: '會員帳號管理', url: '/account/member'},
    ]
  }
]
const tabsInitState = tabsRawData.reduce((container, tab, tabIndex) => {
  let newTab = {
    tabIndex,
    iconName: tab.iconName,
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
