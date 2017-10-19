import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Loading from 'ui/loading';
import Empty from 'ui/empty';
import { maskName, maskPhone, dealNumber } from 'helpers/string';
import history from 'helpers/history';
import IconUsers from './users.svg';
import { ALLOWANCE } from '../../../constants/constants.json';

const Container = styled.div`
  background-color: white;
  line-height: 0.2rem;
  font-size: 0.14rem;
  margin-bottom: 0.1rem;
`;

const Title = styled.div`
  padding: 0.1rem 0;
  color: ${props => (props.red ? '#E01053' : '#57D3F2')};
  border-bottom: 1px solid #dbdcdd;

  svg {
    margin: 0 0.1rem 0 0.2rem;
    width: 0.2rem;
    height: 0.2rem;
  }
`;

const Frozen = styled.span`
  float: right;
  padding-right: 0.2rem;
  color: #e01053;
  letter-spacing: 0.02rem;
`;

const Item = styled.div`
  border-bottom: 1px solid #dbdcdd;
  margin-left: 0.2rem;
  line-height: 0.5rem;
  color: #4a4a4a;

  &:last-of-type {
    border: none;
  }
`;

const Money = styled.p`
  float: right;
  margin-right: 0.2rem;
`;

class RelationView extends Component {
  static defaultProps = {
    userId: '',
  };

  constructor(props) {
    super(props);
    this.loadRelations(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadRelations(this.props.userId);
    }
  }

  loadRelations = (userId) => {
    this.props.loadRelations(userId ? { userId } : {});
  };

  render() {
    const { relations, me } = this.props;
    if (relations.get('isLoading')) {
      return <Loading />;
    }
    const user = relations.getIn(['data', 'user']);
    const descendants = relations.getIn(['data', 'descendants']);
    if (!relations.get('data').size || !descendants.size) {
      return <Empty type="no-content" />;
    }
    const depth = user.get('level') - me.get('level');
    const isFrozen = me.get('carportsCount') === 0 && depth < me.get('grade');
    const rate = ALLOWANCE[depth];
    return (
      <div>
        <Helmet>
          <title>客户关系</title>
        </Helmet>
        <Container>
          <Title>
            <IconUsers />
            {maskName(user.get('name')) || maskPhone(user.get('phone'))}的客户（{descendants.size}人）
            {isFrozen && <Frozen>冻结中</Frozen>}
          </Title>
          {descendants.map(u => (
            <Item
              key={u.get('id')}
              onClick={() => {
                if (depth <= 3) {
                  history.push(`/mine/relations?userId=${u.get('id')}`);
                }
              }}
            >
              {maskName(u.get('name')) || maskPhone(u.get('phone'))}{' '}
              <Money>累计{dealNumber(u.get('validPaid') * rate) || 0}元</Money>
            </Item>
          ))}
        </Container>
      </div>
    );
  }
}

RelationView.propTypes = {
  loadRelations: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  userId: PropTypes.string,
  me: PropTypes.object.isRequired,
};

export default RelationView;
