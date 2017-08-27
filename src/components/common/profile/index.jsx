import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'ui/avatar';
import { Image } from 'ui';
import imageBadgeCustomPlan from 'images/badge-custom-plan.png';
import ImageCredits from 'images/credits.png';
import { ThemeProvider } from 'styled-components';
import history from 'helpers/history';
import { showPanel } from 'helpers/meiqia';
import { log } from 'helpers/logger';

import {
  HeaderContainer,
  Name,
  Badge,
  BadgeCustomPlan,
  Analytics,
  AnalyticsItem,
} from './components';

class ProfileView extends Component {
  static defaultProps = {
    white: false,
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    // toasts: PropTypes.array,
    // children: PropTypes.element,
    // hideToastItem: PropTypes.func,
    white: PropTypes.bool,
    loggerEventDetailPrefix: PropTypes.string.isRequired,
  }

  renderTitle = () => {
    const { user, loggerEventDetailPrefix } = this.props;
    const token = user.getIn(['info', 'token']);
    return (
      <div style={{ overflow: 'auto', padding: '0 0.2rem 0.2rem' }}>
        <Avatar
          left
          src={user.getIn(['info', 'avatar'])}
          onClick={() => {
            log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_HEADIMAGE` });
            history.push('/user');
          }}
        />
        <div style={{ paddingLeft: '0.6rem' }}>
          <Name
            onClick={() => {
              log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_NAME` });
              history.push('/user');
            }}
          >{user.getIn(['info', 'nickname']) || user.getIn(['info', 'nickName']) || '未登录'}</Name>
          <div>
            {
              !!token && (
                <Badge
                  onClick={() => {
                    log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_SIGNIN` });
                    history.push('/mine/checkin');
                  }}
                >
                  <Image src={ImageCredits} alt="credits" />
                  <span>{user.get('credits')}, {user.getIn(['checkin', 'isSignIn']) ? '已' : ''}签到</span>
                </Badge>
              )
            }
            {
              !token && (
                <Badge onClick={() => history.push('/bind')}>
                  <span>去登录</span>
                </Badge>
              )
            }
            <BadgeCustomPlan
              onClick={() => {
                log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_CS` });
                showPanel();
              }}
            >
              <Image src={imageBadgeCustomPlan} alt="badge custom plan" />
            </BadgeCustomPlan>
          </div>
        </div>
      </div>
    );
  }

  renderAnalytics = () => {
    const { user, loggerEventDetailPrefix } = this.props;
    return (
      <Analytics>
        <AnalyticsItem
          title="考试倒计时(天)"
          data={user.getIn(['intention', 'countdownDays'])}
          onClick={() => {
            log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_COUNTDOWN` });
            history.push('/user/examtime');
          }}
        />
        <AnalyticsItem
          title="坚持学习(天)"
          data={user.getIn(['checkin', 'count']) || '-'}
          onClick={() => {
            log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_LEARNINGTIME` });
            history.push('/mine/checkin');
          }}
        />
        <AnalyticsItem
          title="累计做题(道)"
          data={user.get('answerCount') || '-'}
          onClick={() => {
            log({ eventDetail: `${loggerEventDetailPrefix}_HEAD_QUESTIONS` });
            history.push('/study/records');
          }}
        />
      </Analytics>
    );
  }

  render() {
    return (
      <ThemeProvider theme={{ white: this.props.white }}>
        <HeaderContainer>
          { this.renderTitle() }
          { this.renderAnalytics() }
        </HeaderContainer>
      </ThemeProvider>
    );
  }
}

export default ProfileView;
