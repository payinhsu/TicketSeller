import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { connect } from 'react-redux'
import {
  withState,
  compose,
  withHandlers,
  lifecycle,
  mapProps,
  branch,
  renderComponent,
} from 'recompose'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import Router from 'next/router'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import { CSSTransitionGroup } from 'react-transition-group'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'
import { toggleTargetTabOpenState } from '~/lib/actions'
import { Gold, LightGray, Mirage } from '../lib/helpers/commonStyle'
import moment from 'moment'
import { Loader } from '../components/Common'

const pollingIntervalInMs = 5000

const Fader = ({ children }) => (
  <CSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    {children}
  </CSSTransitionGroup>
)

export default compose(
  withState('currentTime', 'setCurrentTime', moment().clone()),
  graphql(gql`
  query GetLoginInformation{
    loginInformation {
      isLogin
    }
  }
  `, {
    name: 'loginData'
  }),
  branch(
    props => props.loginData.loading === true,
    renderComponent(() => {
      return (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      )
    })
  ),
  lifecycle({
    componentDidMount () {
      if (!this.props.loginData.loginInformation.isLogin) return Router.push('/')
      this.setPollingInterval = setInterval(() => {
        this.props.setCurrentTime(moment().clone())
      }, 1000)
    },
    componentWillUnmount () {
      window.clearInterval(this.setPollingInterval)
    }
  }),
  graphql(gql`
    query GetDepositTransitionOrdersByStatus {
      transactionOrders(transactionGateWay: "DEPOSIT", status: ["WAITING"], paymentModes: ["BANK_CARD"], page: 0, pageSize: 1) {
        totalElements
      }
    }
  `, {
    name: 'depositData',
    options: {
      pollInterval: pollingIntervalInMs,
    }
  }),
  graphql(gql`
    query GetWithdrawTotalElements {
      transactionOrders(transactionGateWay: "WITHDRAW", status: ["WAITING","WAITING_REMIT"], paymentModes: ["BANK_CARD"], page: 0, pageSize: 1) {
        totalElements
      }
    }
  `, {
    name: 'withdrawData',
    options: {
      pollInterval: pollingIntervalInMs,
    }
  }),
  mapProps(props => {
    const deposit = !props.depositData.transactionOrders || isEmpty(props.depositData.transactionOrders)
      ? 0
      : props.depositData.transactionOrders[0].totalElements
    const withdraw = !props.withdrawData.transactionOrders || isEmpty(props.withdrawData.transactionOrders)
      ? 0
      : props.withdrawData.transactionOrders[0].totalElements
    const total = '?'
    const weekDayMapping = [
      '日',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
    ]

    const time = `台北時間：`
                 + props.currentTime.format('YYYY/M/D')
                 + ` 星期${weekDayMapping[props.currentTime.weekday()]}`
                 + ` ${props.currentTime.format('HH:mm:ss')}`
    return {
      ...props,
      withdraw,
      deposit,
      total,
      time,
    }
  }),
  connect(state => ({
    tabs: state.tabs,
  }), ({ toggleTargetTabOpenState })),
  withState('isOpenDropDownMenu', 'setOpenDropDownMenu', false),
  withHandlers({
    onLogoutBtnClick: () => () => {
      localStorage.setItem('jwt', '')
      window.location = '/login'
    }
  })
)(props => {
  let { withdraw, deposit, total, time, isOpenDropDownMenu, setOpenDropDownMenu } = props
  let style = {
    fill: '#fff',
    width: '34px',
    height: '34px',
    float: 'right',
    marginRight: '20px',
    cursor: 'pointer',
  }
  let renderAvatarArea = () =>
    <AvatarArea>
      <AvatarWrapper>
        <AvatarLeft src="/static/images/id_img.png" />
        <AvatarRight>
          <AvatarGreeting>您好 尊敬的客戶</AvatarGreeting>
          <AvatarName>暱稱</AvatarName>
        </AvatarRight>
      </AvatarWrapper>
    </AvatarArea>

  let renderTabs = () =>
    <div>
      <Head>
        <style>{`
        .fade-enter {
          opacity: 0.01;
        }
        .fade-enter-active {
          opacity: 1;
          -webkit-transition: all .3s;
          -o-transition: all .3s;
          transition: all .3s;
          -webkit-transition-timing-function: ease-in-out;
        }
        .fade-leave {
          translateY(0px);
          opacity: 1;
        }
        .fade-leave-active {
          opacity: 0;
          -webkit-transition: all .3s;
          -o-transition: all .3s;
          transition: all .3s;
        }
        `}</style>
      </Head>
      {
        props.tabs.map((tab, tabIndex) => (
          <div key={`${tabIndex}_TAB`}>
            <MenuItemWrapper onClick={() => props.toggleTargetTabOpenState({ tabIndex: tab.tabIndex })}>
              <MenuItemLeft>
                <MenuItemIcon index={tabIndex} />
                <MenuItemText>{tab.displayName}</MenuItemText>
              </MenuItemLeft>
              <MenuItemArrow isOpening={tab.tabIsOpen} />
            </MenuItemWrapper>
            <MenuItemContentWrapper>
              {
                tab.tabIsOpen && tab.subTabs.map((subTab, subTabIndex) => (
                  <Link key={`${subTabIndex}_MenuItemContent_Link`} href={subTab.url} prefetch passHref>
                    <MenuItemContent>{subTab.displayName}</MenuItemContent>
                  </Link>
                ))
              }
            </MenuItemContentWrapper>
          </div>
        ))
      }
      <MenuItemMobile>
        <MenuItemWrapper onClick={props.onLogoutBtnClick}><MenuItemText>登出</MenuItemText></MenuItemWrapper>
        <MenuItemWrapper lastChild />
      </MenuItemMobile>
    </div>

  let renderMobileTabs = () => {
    if (!isOpenDropDownMenu) return null
    return (
      <DropDownMenu>
        {renderAvatarArea()}
        {renderTabs()}
      </DropDownMenu>
    )
  }

  return (
    <Container>
      <SideBar>
        {renderAvatarArea()}
        <SideBarBackground>
          {renderTabs()}
        </SideBarBackground>
      </SideBar>
      <MainContainer>
        <NavBar>
          <TimeWrapper><TimeIcon />{time}</TimeWrapper>
          <NavBarListWrapper>
            <NavBarList onClick={props.onLogoutBtnClick}>登出</NavBarList>
          </NavBarListWrapper>
        </NavBar>

        <NavBarMobileWrapper>
          <NavBarMobile>
            <MenuIconWrapper>
              {
                isOpenDropDownMenu
                  ? <ClearIcon onClick={() => setOpenDropDownMenu(!isOpenDropDownMenu)} style={style} />
                  : <MenuIcon onClick={() => setOpenDropDownMenu(!isOpenDropDownMenu)} style={style} />
              }
            </MenuIconWrapper>
          </NavBarMobile>
          <Fader>{renderMobileTabs()}</Fader>
        </NavBarMobileWrapper>

        <MainContent>
          {props.children}
        </MainContent>
      </MainContainer>
    </Container>
  )
})
const SideBarWidth = '230px'
const SideBarWidthMid = '110px'
const MainContentWidth = `calc(100% - ${SideBarWidth})`
const MainContentWidthMid = `calc(100% - ${SideBarWidthMid})`
const Container = styled.div`
width:100%;
display: flex;
height: 100vh;
`
const SideBar = styled.div`
font-size: 15px;
top: 0;
bottom: 139px;
position: fixed;
width: ${SideBarWidth};
background: #191C20;
@media(max-width: 1170px) and (min-width: 769px) {
  width: ${SideBarWidthMid};
}
@media (max-width: 768px) {
  display: none;
}
`
const AvatarArea = styled.div`
padding: 38px 0 20px 0;
background: #0e1016;
border-bottom: solid 1px #C9B482;
background: #0e1016 url(/static/images/K_logo.png) no-repeat left top;
background-size: contain;
@media(max-width: 1170px) and (min-width: 768px) {
  padding: 10px 0 20px 0;
}
`
const AvatarWrapper = styled.div`
display: flex;
justify-content: center;
@media(max-width: 1170px) and (min-width: 768px){
  flex-direction: column;
}
`
const AvatarLeft = styled.img`
box-sizing: border-box;
width: 80px;
height: 80px;
border-radius: 50%;
border: solid 3px #FFF;
@media(max-width: 1170px) and (min-width: 768px) {
  width: 66px;
  height: 66px;
  align-self: center;
  margin-bottom: 10px;
}
`
const AvatarRight = styled.div`
width: 80px;
margin-left: 10px;
align-self: center;
`
const AvatarGreeting = styled.div`
color: #aaa;
line-height: 20px;
font-size: 10px;
font-weight: 400;
`
const AvatarName = styled.div`
margin-right: 5px;
font-weight: 500;
font-size: 15px;
color: #FFF;
`
const MainContainer = styled.div`
width: 100%;
background: ${Mirage};
box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
@media (max-width: 768px) {
  position: ${props => props.isOpenDropDownMenu === true ? 'fixed' : 'relative' };
}
`
const MainContent = styled.div`
margin-left: ${SideBarWidth};
top: 53px;
width: ${MainContentWidth};
background: ${Mirage};
position: absolute;
overflow-y: auto;
@media(max-width: 1170px) and (min-width: 769px) {
  margin-left: ${SideBarWidthMid};
  width: ${MainContentWidthMid};
}  
@media(max-width: 768px) {
  margin-left: 0;
  width: 100%;
}
`
const MenuItemWrapper = styled.div`
display: flex;
justify-content: space-around;
height: 47px;
align-items: center;
-webkit-font-smoothing:antialiased;
cursor: pointer;
background: rgba(255,255,255,0);
transition: all 0.2s ease-out;
border-bottom: ${props => props.lastChild ? 0 : '1px solid rgba( 63, 69, 85, 0.6)' };
&:hover {
  background: rgba(255,255,255,0.1);
}
@media(max-width: 1170px) and (min-width: 768px) {
  flex-direction: column;
  height: 78.5px;
  justify-content: center;
}  
@media(max-width: 768px) {
  justify-content: ${props => props.flex === 'baseline' ? 'baseline' : 'space-between' };
  padding: 0 5%;    
}
`
const MenuItemLeft = styled.div`
width: 100px;
display: flex;
justify-content: space-between;
@media(max-width: 1170px) and (min-width: 768px) {
  flex-direction: column;
  text-align: center;
}
`
const MenuItemIcon = styled.div`
width: 20px;
height: 20px;
background: url(/static/images/cd-nav-icons-${props => props.index && props.index}.svg) no-repeat left top;
background-size: cover;
@media(max-width: 1170px) and (min-width: 768px) {
  align-self: center;
}
`
const MenuItemText = styled.div`
color: #C9B482;
font-weight: 500;
@media(max-width: 1170px) and (min-width: 769px) {
  font-size: 15px;
  line-height: 26px;
}
@media(max-width: 768px) {
  font-size: 17.5px;
}
`
const MenuItemArrow = styled.div`
transform: ${props => props.isOpening ? 'translateX(0) rotate(360deg)' : 'translateX(0) rotate(180deg)'};
transition: all 0.3s ease-out;
background: url(/static/images/cd-arrow.svg) no-repeat;
background-size: contain;
width: 16px;
height: 16px;

`
const SideBarBackground = styled.div`
box-shadow: inset -3px 0 3px rgba(0,0,0,.3);
background: #0e1016 url(/static/images/left_bg.png) no-repeat left bottom;
background-size: contain;
height: 100%;
overflow-y: auto;
`
const MenuItemContentWrapper = styled.div`
line-height: 17.25px;
background: rgba( 28, 31, 34, 0.8);
border-bottom: 1px solid rgba( 63, 69, 85, 0.6);
display: flex;
flex-direction: column;
align-items: center;
line-height: 2.5;
cursor: pointer;
`
const MenuItemContent = styled.a`
width: 100%;
text-align: center;
color: #aaa;
text-decoration:none;
&:hover {
  color: #C9B482;
  text-decoration: underline;
}
@media(max-width: 768px) {
  font-size: 17.5px;
  font-weight: 500;
}
`
// NavBar
const NavBar = styled.div`
margin-left: ${SideBarWidth};
z-index: 2;
position: fixed;
top: 0;
width: ${MainContentWidth};
height: 53px;
background: #323643;
box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: flex-end;
@media(max-width: 1170px) and (min-width: 769px) {
  width: ${MainContentWidthMid};
  margin-left: ${SideBarWidthMid};
}
@media (max-width: 768px) {
  display: none;
}
`
const NavBarListWrapper = styled.div`
display: flex;
`
const NavBarList = styled.div`
color: ${props => props.gold ? Gold : '#fff'}; 
display: flex;
font-size: 13px;
border-left: solid 1px ${LightGray};
padding: 0 17px;
height: 25px;
align-items: center;
font-weight: 100;
cursor: pointer;
&:hover {
  color: ${Gold};
}
`
const Badge = styled.div`
background: #FED363;
border-radius: 10px;
color: #000;
padding: 0 7px;
margin-left: 6px;
margin-right: ${props => props.marginRight ? '6px' : 0};
font-weight: 500;
`
const TimeWrapper = styled.div`
display: flex;
color: ${LightGray};
font-size: 12px;
align-items: center;
margin-right: 48px;
`
const TimeIcon = styled.div`
background: url(/static/images/cd-nav-icons-time.svg) no-repeat 0 0;
width: 27px;
height: 24px;
margin-right: 10px;
`
const NavBarMobileWrapper = styled.div`
display: none;
@media (max-width: 768px) {
  display: block;
  background: #323743 url(/static/images/K_s_logo.png) no-repeat left top;
  background-size: contain;
  z-index: 2;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  -webkit-font-smoothing: antialiased;
}
`
const NavBarMobile = styled.div`
height: 45px;
`
const DropDownMenu = styled.div`
width: 100%; 
background: #0e1016; 
position: absolute;
min-height: 100vh;
z-index: 2;
@media(max-width: 768px) {
  position: fixed;
  height: 100%;
  overflow-y: auto; 
}
`
const MenuItemMobile = styled.div`
display: none;
@media(max-width: 768px) {
  display: block;  
}  
`
const MenuIconWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
height: 45px;
`
const LoadingContainer = styled.div`
width:100vw;
height:100vh;
background:#191D28;
display:flex;
align-items:center;
justify-content:center;
`
