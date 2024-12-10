import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: ${props => props.theme.gradients.neon};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 11, 30, 0.8);
    z-index: 1;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 2rem;
  background: ${props => props.theme.gradients.neon};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${props => props.theme.shadows.neon};
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.primary ? 'transparent' : props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.neon};
`;

const HomePage = () => {
  return (
    <main>
      <HeroSection>
        <Content
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            MEME WARS
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Where Crypto Communities Battle with Creativity
          </Subtitle>
          <ButtonGroup>
            <Button
              primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as={Link}
              to="/battle/active"
            >
              View Battle
            </Button>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as={Link}
              to="/leaderboard"
            >
              View Leaderboard
            </Button>
          </ButtonGroup>
        </Content>
      </HeroSection>
    </main>
  );
};

export default HomePage;
