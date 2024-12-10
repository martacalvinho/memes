import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(26, 27, 58, 0.95);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  text-shadow: ${props => props.theme.shadows.neon};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  transition: ${props => props.theme.animations.transition};

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-shadow: ${props => props.theme.shadows.neon};
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">MEME WARS</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
