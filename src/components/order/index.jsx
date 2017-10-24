import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from 'ui/loading';
import Empty from 'ui/empty';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import { dealNumber } from 'helpers/string';
import { ORDER_DONE, ORDER_INIT, PRODUCT_NAME } from 'constants/constants.json';

const OrderContainer = styled.div`
  background-color: white;
  padding: 0.2rem 0 0.1rem 0.2rem;
`;

const SuccessTip = styled.p`
  text-align: center;
  font-size: 0.18rem;
  color: #e01053;
  letter-spacing: 1.5px;
  line-height: 0.25rem;
  padding-bottom: 0.1rem;
`;

const StartTime = styled.p`
  text-align: center;
  font-size: 0.14rem;
  color: #4a4a4a;
  line-height: 0.2rem;
  padding-bottom: 0.4rem;
  padding-right: 0.2rem;
`;

const Block = styled.div`
  padding: 0.05rem 0;
  border-bottom: 1px solid #dbdcdd;

  &:last-of-type {
    border: none;
  }
`;

const Intro = styled.p`
  padding-left: 0.05rem;
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: ${props => (props.isBold ? '#4a4a4a' : '#9b9b9b')};
  margin-bottom: 0.05rem;

  span {
    float: right;
    margin-right: 0.2rem;
    color: #9b9b9b;
  }
`;

class OrderSuccessView extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    loadOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    orderId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cityId: 1,
    };
    props.loadOrder({ id: props.orderId });
    props.getUserInfo();
  }

  render() {
    const { user, product, order, isLoading } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    if (!order.has('id')) {
      return <Empty />;
    }
    return (
      <div>
        <OrderContainer>
          <SuccessTip>
            {order.get('status') === ORDER_INIT && '已支付'}
            {order.get('status') !== ORDER_INIT && '支付成功'}
          </SuccessTip>
          <StartTime>
            {order.get('status') === ORDER_INIT
              ? '最终支付结果可能会有一些延迟，请耐心等待'
              : order.get('status') === ORDER_DONE
                ? `恭喜您，${format(addDays(new Date(order.get('doneAt')), 7), 'YYYY年MM月DD')}开始获得收益。`
                : '订单全部支付完成时开始获得收益。'}
          </StartTime>
          <Block>
            <Intro isBold>
              {PRODUCT_NAME}
              <span>{product.get('right')}</span>
            </Intro>
            <Intro isBold>{order.getIn(['city', 'name'])}</Intro>
          </Block>
          <Block>
            <Intro>
              姓名
              <span>{user.get('name')}</span>
            </Intro>
            <Intro>
              身份证号码
              <span>{user.get('IDCardNo')}</span>
            </Intro>
            <Intro>
              联系电话
              <span>{user.get('phone')}</span>
            </Intro>
          </Block>
          <Block>
            <Intro>
              订单号
              <span>{order.get('id')}</span>
            </Intro>
            <Intro>
              商品总价
              <span>￥{dealNumber(product.get('cents'))}</span>
            </Intro>
            <Intro>
              本次支付
              <span>￥{dealNumber(order.get('paid'))}</span>
            </Intro>
          </Block>
        </OrderContainer>
      </div>
    );
  }
}

export default OrderSuccessView;
