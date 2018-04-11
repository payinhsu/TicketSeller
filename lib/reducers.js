import { combineReducers } from 'redux';
import { TOGGLE_TAB_OPEN_STATE } from '~/lib/actions';

const shortid = require('shortid');

/* Tab */
const tabsRawData = [
  {
    id: shortid.generate(),
    displayName: '售票活動',
    iconName: 'ic_person_24px',
    subTabs: [
      { id: shortid.generate(), name: '優惠', url: '/activity/discount' },
      { id: shortid.generate(), name: '音樂', url: '/activity/music' },
      { id: shortid.generate(), name: '戲劇', url: '/activity/drama' },
      { id: shortid.generate(), name: '舞蹈', url: '/activity/dance' },
      { id: shortid.generate(), name: '親子', url: '/activity/child' },
      { id: shortid.generate(), name: '電影', url: '/activity/movie' },
      { id: shortid.generate(), name: '演唱會', url: '/activity/concert' },
      { id: shortid.generate(), name: '講座', url: '/activity/lecture' },
    ],
  },
  {
    id: shortid.generate(),
    displayName: '商品銷售',
    iconName: 'ic_person_24px',
    subTabs: [
      { id: shortid.generate(), name: '熱賣', url: '/goods/hot' },
    ],
  },
  // {
  //   id: shortid.generate(),
  //   displayName: '帳號管理',
  //   iconName: 'ic_person_24px',
  //   subTabs: [
  //     { id: shortid.generate(), name: '會員帳號管理', url: '/account/member' },
  //   ],
  // },
];
const tabsInitState = tabsRawData.reduce((container, tab, tabIndex) => {
  const newTab = {
    id: tab.id,
    tabIndex,
    iconName: tab.iconName,
    displayName: tab.displayName,
    tabIsOpen: false,
    subTabs: tab.subTabs.map((x) => {
      return {
        id: x.id, displayName: x.name, isActive: false, url: x.url,
      };
    }),
  };
  return [].concat(container).concat([newTab]);
}, []);

const tabs = (state = tabsInitState, action) => {
  switch (action.type) {
    case TOGGLE_TAB_OPEN_STATE:
      return state.map(tab => (tab.tabIndex === action.tabIndex
        ? Object.assign({}, tab, { tabIsOpen: !tab.tabIsOpen })
        : tab));
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tabs,
});

export default rootReducer;
