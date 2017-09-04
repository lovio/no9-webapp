import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CavityButton } from 'ui/button';

const Container = styled.div`padding: 0.1rem 0.2rem 0.4rem;`;

const Menu = ({ signOut }) => (
  <Container>
    <CavityButton onClick={() => signOut()}>退出登录</CavityButton>
  </Container>
);

Menu.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Menu;
