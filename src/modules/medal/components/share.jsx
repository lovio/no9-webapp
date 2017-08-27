import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Image } from 'ui';

import Loading from 'ui/loading';

import ListView from './list';
import DetailView from './detail';
import AdView from './ad';

export const Container = styled.div`
  margin: 0.45rem 0.15rem 0 0.15rem;
  padding: 0.01rem 0 0.35rem 0;
  background-color: #FFF;
  border-radius: 0.03rem;
`;

export const UserInfo = styled.div`
  text-align: center;

  img {
    display: block;
    width: 0.64rem;
    height: 0.64rem;
    margin: 0 auto;
    margin-top: -0.35rem;
    border-radius: 0.64rem;
    box-shadow: 0 0.01rem 0.04rem #8F9DA5;
    border: 6px solid #fff;
  }
`;

export const Text = styled.div`
  font-size: 0.12rem;

  &:nth-child(2) {
    margin-top: 0.1rem;
  }
`;

const getMedal = (medals, medalId) => {
  if (medalId) {
    /* eslint-disable */
    const finishedMedals = medals.toJSON().finished;
    for (let i = 0; i < finishedMedals.length; i++) {
      const medal = finishedMedals[i];
      if (parseInt(medal.medal, 10) === parseInt(medalId, 10)) {
        return medal;
      }
    }
    /* eslint-disable */
  }

  return {};
}

export default class Modal extends Component {
  static propTypes = {
    medals: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    medalId: PropTypes.string.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.medals.status !== 'SUCCESS' || this.props.user.status !== 'SUCCESS') {
      return <Loading />;
    }

    const medals = this.props.medals.data;
    const user = this.props.user.data;
    const medalId = this.props.medalId;
    const medal = getMedal(medals, medalId);

    return (
      <div style={{ minHeight: '100%', backgroundColor: '#F7F8FA', paddingTop: '0.01rem' }}>
        <Helmet>
          <title>我的成就</title>
        </Helmet>

        <Container>
          <UserInfo>
            <Image src={user.get('avatar')} />
            <Text>您的好友{user.get('nickname')}</Text>
            <Text>邀请你加入智课斩托福</Text>
          </UserInfo>

          <div style={{ marginTop: '0.2rem' }}>
            {
              medalId ? (
                <DetailView medal={medal} />
              ) : (
                <ListView
                  type="achieved"
                  medals={medals.get('finished')}
                  showMedal={() => {}}
                />
              )
            }
          </div>
        </Container>

        <AdView isApp={this.props.isApp} medalId={medalId} userId={user.get('id')} />
      </div>
    );
  }
}
