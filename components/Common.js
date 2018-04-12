import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import { Blue400, White } from '../lib/helpers/commonStyle';

const TitleArea = props => (
  <TitleAreaWrapper>
    <TitleWrapper>
      <Title>{props.title}</Title>
      {props.children}
    </TitleWrapper>
  </TitleAreaWrapper>
);
TitleArea.propTypes = {
  title: PropTypes.string.isRequired,
};

const Title = styled.div`
padding: 0.3em 0;
font-size: 18px;
color: rgb(170, 170, 170);
font-weight: 500;
`;
const TitleAreaWrapper = styled.div`
border-bottom: solid 1px #33363E;
padding:10px 0;
margin-bottom:20px;
`;
const TitleWrapper = styled.div`
margin: 0 20px;
`;
const FullWidthCenterContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:300px;
width:100%;
`;
const CalendarIconStyle = styled.img`
width: 25px;
height: auto;
margin: 0 10px;
`;
const Loader = () => (
  <FullWidthCenterContainer>
    <CircularProgress size={100} thickness={7} color={White} />
  </FullWidthCenterContainer>
);
const CalendarIcon = () =>
  <CalendarIconStyle src='/static/images/icons-datetime.svg' />;

const ContentWrapper = styled.div`
margin: 20px;
`;
const TitleAreaButtonWrapper = styled.div`
display: flex;
align-items: center;
@media(max-width: 768px) {
  flex-direction: column;
  align-items: baseline;
}
`;
const LabelStyle = styled.div`
width: ${props => (props.width ? props.width : auto)};
color: #aaaaaa;
font-size: 13px;
font-weight: 500;
`;
const WidthControlWrapper = styled.div`
width: ${props => (props.width ? props.width : '30%')};
display: flex;
align-items: center;
margin: 2px 0;
margin-left: ${props => (props.marginLeft ? '20px' : 0)};
@media(max-width: 768px) {
  margin-left: 0;
  width: 85%;
}
`;
const TextAreaCommon = styled.textarea`
width: ${props => (props.width ? props.width : '100%')};
height: ${props => (props.width ? props.height : '236px')};
padding: 10px;
@media(max-width: 768px) {
  width: 100%;
}
`;
TextAreaCommon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
const GreenTextCommon = styled.div`
color: #00ff1e;
font-size: 13px;
font-weight: bold;
`;
const RedTextCommon = styled.div`
color: #ff0000;
font-size: 13px;
font-weight: bold;
`;
export {
  TitleArea,
  Loader,
  CalendarIcon,
  ContentWrapper,
  TitleAreaButtonWrapper,
  Title,
  LabelStyle,
  WidthControlWrapper,
  TextAreaCommon,
  GreenTextCommon,
  RedTextCommon,
};
