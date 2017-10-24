import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Empty from 'ui/empty';

import AutoLoader from 'components/common/autoLoader';
import { Wrapper } from 'components/common/wrapper';

import OrderItem from './order';

const Container = styled.div`width: 100%;`;

// 不够通用
export default function OrdersView({ orders, pagination, loadMoreOrders, triggerWechatPay }) {
  if (!pagination.get('isLoading') && !orders.size) {
    return <Empty />;
  }
  return (
    <div>
      <Container>
        <AutoLoader pagination={pagination} loadMoreData={() => loadMoreOrders()}>
          <Wrapper>
            {orders.map(order => (
              <OrderItem key={order.get('id')} order={order} triggerWechatPay={triggerWechatPay} />
            ))}
          </Wrapper>
        </AutoLoader>
      </Container>
    </div>
  );
}

OrdersView.propTypes = {
  orders: PropTypes.object.isRequired,
  loadMoreOrders: PropTypes.func.isRequired,
  triggerWechatPay: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};
