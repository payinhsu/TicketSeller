export const TOGGLE_TAB_OPEN_STATE = 'toggle_tab_open_state'

export const toggleTargetTabOpenState = ({tabIndex}) => ({
  type: TOGGLE_TAB_OPEN_STATE,
  tabIndex,
})