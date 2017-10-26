import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BasicButton } from 'ui/button';
import { Wrapper } from 'components/common/wrapper';

// import { dealNumber } from 'helpers/string';
// import find from 'lodash/find';
// import includes from 'lodash-es/includes';
// import format from 'date-fns/format';
// import Button from 'ui/button';

import imgStamp from './stamp.png';

import imgBlueCar from '../../zone/blueCar.png';

const STOCK_DESC = {
  1: '众筹',
  5: '合并持有',
  20: '不适用',
};

const Container = styled.div`
  background-color: white;
  margin-bottom: 0.1rem;
  line-height: 0.2rem;
  font-size: 0.14rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  background-image: url('${imgStamp}');
  background-position: bottom 0.8rem center;
  background-size: 1.7rem 1.75rem;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  padding: 0.1rem 0;
  color: ${props => (props.red ? '#E01053' : '#0889FF')};
  border-bottom: 1px solid #dbdcdd;

  img {
    display: inline-block;
    margin: 0.03rem 0.1rem 0.03rem 0.2rem;
    width: 0.2rem;
    height: 0.14rem;
  }
`;

const Item = styled.p`
  border-bottom: 1px solid #dbdcdd;
  margin-left: 0.25rem;
  line-height: 0.5rem;
  color: #4a4a4a;

  &:last-of-type {
    border: none;
  }
`;

const Name = styled.span`
  font-size: 0.14rem;
  color: #818b96;
`;
const Content = styled.span`
  float: right;
  margin-right: 0.2rem;
`;

const ActionArea = styled.div`
  display: flex;
  padding: 0.15rem 0;
  justify-content: space-around;
  border-top: 1px solid #dbdcdd;
`;

const CavityButton = styled(BasicButton)`
  color: #0889ff;
  background-color: white;
  font-size: 0.14rem;
`;

export default class CertItem extends Component {
  static propTypes = {
    carport: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { carport, user } = this.props;
    if (carport.get('status') === 'unpaid') {
      return null;
    }
    return (
      <Container>
        <Title>
          <img src={imgBlueCar} alt="" />
          {carport.get('status') === 'virtual'
            ? carport.getIn(['city', 'name'])
            : carport.getIn(['zone', 'name'])}
          <Content>{carport.getIn(['zone', 'isInConstruction']) ? '已建成' : '正在建设中'}</Content>
        </Title>
        <Item>
          <Name>所有权证书持证人</Name>
          <Content>
            {user.get('name')} {user.get('IDCardNo')}
          </Content>
        </Item>
        <Item>
          <Name>所有权共有权人</Name>
          <Content>{STOCK_DESC[carport.get('stock')]}</Content>
        </Item>
        <Item>
          <Name>持证人所占份额</Name>
          <Content>{carport.get('stock') * 5}%</Content>
        </Item>
        <Item>
          <Name>所有权证证号</Name>
          <Content>{carport.get('orderId')}</Content>
        </Item>
        <Item>
          <Name>区域</Name>
          <Content>{carport.getIn(['city', 'name'])}</Content>
        </Item>
        {this.state.show && (
          <Wrapper>
            <Item>
              <Name>车位坐落</Name>
              <Content>{carport.getIn(['zone', 'address'])}</Content>
            </Item>
            <Item>
              <Name>车位状况</Name>
            </Item>
            <Item>
              <Item>
                <Name>设备编号</Name>
                <Content>{carport.get('deviceId')}</Content>
              </Item>
              <Item>
                <Name>总车位数量</Name>
                <Content>
                  {carport.getIn(['zone', 'stock']) ? carport.getIn(['zone', 'stock']) / 20 : ''}
                </Content>
              </Item>
              <Item>
                <Name>所有车位编号</Name>
                <Content>{carport.get('carportId')}</Content>
              </Item>
              <Item>
                <Name>性质</Name>
                <Content>{carport.getIn(['zone', 'property'])}</Content>
              </Item>
            </Item>
            <Item>
              <Name>土地使用情况摘要</Name>
            </Item>
            <Item>
              <Item>
                <Name>占地面积（平方米）</Name>
                <Content>{carport.getIn(['zone', 'area'])}</Content>
              </Item>
              <Item>
                <Name>土地使用面积</Name>
                <Content>{carport.getIn(['zone', 'useArea'])}</Content>
              </Item>
              <Item>
                <Name>权属性质</Name>
                <Content>{carport.getIn(['zone', 'rightProperty'])}</Content>
              </Item>
              <Item>
                <Name>使用年限</Name>
                <Content>{carport.getIn(['zone', 'serviceLife'])}</Content>
              </Item>
            </Item>
            <Item>
              <Name>设定他项权利摘要</Name>
            </Item>
            <Item>
              <Item>
                <Name>权利人</Name>
                <Content>{carport.get('rightOwner')}</Content>
              </Item>
              <Item>
                <Name>权利种类</Name>
                <Content>{carport.get('rightType')}</Content>
              </Item>
              <Item>
                <Name>权利范围</Name>
                <Content>{carport.get('rightLimits')}</Content>
              </Item>
              <Item>
                <Name>权利价值（元）</Name>
                <Content>{carport.get('rightValue')}</Content>
              </Item>
              <Item>
                <Name>设定日期</Name>
                <Content>{carport.get('rightStartAt')}</Content>
              </Item>
              <Item>
                <Name>约定期限</Name>
                <Content>{carport.get('rightDeadline')}</Content>
              </Item>
              <Item>
                <Name>注销日期</Name>
                <Content>{carport.get('rightCancelAt')}</Content>
              </Item>
            </Item>
          </Wrapper>
        )}
        <ActionArea>
          <CavityButton
            width="1.25rem"
            height="0.4rem"
            onClick={() => this.setState(prevState => ({ show: !prevState.show }))}
          >
            查看{this.state.show ? '简要' : '全部'}信息
          </CavityButton>
          {/* <CavityButton width="1.25rem" height="0.4rem">
            发送电子版邮件
          </CavityButton> */}
        </ActionArea>
      </Container>
    );
  }
}
