import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const BattleContainer = styled.div`
  min-height: 100vh;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

const SplitScreen = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const Side = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
  background: ${props => props.side === 'left' ? 
    'linear-gradient(135deg, #FF3366 0%, #FF336610 100%)' : 
    'linear-gradient(135deg, #00F5FF10 0%, #00F5FF 100%)'
  };

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 11, 30, 0.7);
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
`;

const TeamName = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 10px ${props => props.side === 'left' ? '#FF3366' : '#00F5FF'};
`;

const VoteMeter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: rgba(26, 27, 58, 0.9);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  min-width: 300px;
`;

const VoteBars = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
`;

const VoteBar = styled.div`
  flex: 1;
  height: 100px;
  background: #1A1B3A;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const VoteProgress = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: ${props => props.side === 'left' ? 
    'linear-gradient(180deg, #FF3366, #FF336680)' : 
    'linear-gradient(180deg, #00F5FF, #00F5FF80)'
  };
  border-radius: 10px;
`;

const VotePercentage = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.8rem;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const ProgressBar = styled.div`
  height: 40px;
  background: #1A1B3A;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  margin: 1rem 0;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #FF3366, #00F5FF);
  border-radius: 20px;
`;

const VoteCount = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const MemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const MemeCard = styled(motion.div)`
  background: rgba(26, 27, 58, 0.8);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const MemeActions = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VoteButton = styled(motion.button)`
  background: ${props => props.upvoted ? props.theme.colors.primary : 'transparent'};
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.upvoted ? 'white' : props.theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.upvoted ? 'white' : props.theme.colors.text};
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }
`;

const VoteAnimation = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
`;

const ShareButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 11, 30, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  max-width: 800px;
  width: 90%;
  position: relative;
  
  img {
    width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }
`;

const SubmitButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 51, 102, 0.3);
  z-index: 10;
`;

const CommentsSection = styled.div`
  background: rgba(26, 27, 58, 0.8);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  background: rgba(26, 27, 58, 0.9);
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 10px;
  color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 80px;
  font-family: ${props => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Comment = styled.div`
  background: rgba(26, 27, 58, 0.6);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;

  .author {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .timestamp {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-left: 1rem;
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: rgba(26, 27, 58, 0.4);
  margin-top: 2rem;
  border-radius: 15px;
`;

const CommentColumn = styled.div`
  flex: 1;
  
  h3 {
    color: ${props => props.side === 'left' ? '#FF3366' : '#00F5FF'};
    margin-bottom: 1rem;
    text-shadow: 0 0 10px ${props => props.side === 'left' ? '#FF336640' : '#00F5FF40'};
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SubmitCommentButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.body};
  align-self: flex-end;
`;

const SubmitMemeModal = styled(Modal)`
  background: rgba(10, 11, 30, 0.98);
`;

const FileUpload = styled.div`
  border: 2px dashed ${props => props.theme.colors.primary}40;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  input {
    display: none;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 1rem 0;
  border-radius: 10px;
`;

const BattlePage = () => {
  const [votes, setVotes] = useState({ left: 420, right: 369 });
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comment, setComment] = useState('');
  const [voteAnimations, setVoteAnimations] = useState([]);
  const [upvotedMemes, setUpvotedMemes] = useState(new Set());
  const fileInputRef = useRef(null);
  
  const totalVotes = votes.left + votes.right;
  const leftPercentage = (votes.left / totalVotes) * 100;
  const rightPercentage = (votes.right / totalVotes) * 100;

  const mockMemes = [
    { 
      id: 1, 
      image: 'https://picsum.photos/400/400', 
      upvotes: 42, 
      side: 'left',
      comments: [
        { author: 'PepeKing', text: 'This is the way! 🐸', timestamp: '2m ago', side: 'left' },
        { author: 'MemeQueen', text: 'Absolutely legendary!', timestamp: '5m ago', side: 'left' },
        { author: 'DogeWarrior', text: 'Nice try but DOGE is better!', timestamp: '1m ago', side: 'right' }
      ]
    },
    { id: 2, image: 'https://picsum.photos/401/400', upvotes: 38, side: 'left', comments: [] },
    { id: 3, image: 'https://picsum.photos/400/401', upvotes: 35, side: 'right', comments: [] },
    { id: 4, image: 'https://picsum.photos/401/401', upvotes: 31, side: 'right', comments: [] }
  ];

  const handleVote = (meme, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Add vote animation
    const animationId = Date.now();
    setVoteAnimations(prev => [...prev, { id: animationId, x, y }]);

    // Remove animation after it completes
    setTimeout(() => {
      setVoteAnimations(prev => prev.filter(anim => anim.id !== animationId));
    }, 1000);

    // Update votes
    setUpvotedMemes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(meme.id)) {
        newSet.delete(meme.id);
        setVotes(prev => ({
          ...prev,
          [meme.side]: prev[meme.side] - 1
        }));
      } else {
        newSet.add(meme.id);
        setVotes(prev => ({
          ...prev,
          [meme.side]: prev[meme.side] + 1
        }));
      }
      return newSet;
    });
  };

  const handleCommentSubmit = (e, side) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      author: side === 'left' ? 'PepeArmy_User' : 'DogeSquad_User',
      text: comment,
      timestamp: 'just now',
      side
    };

    // Add comment to the selected meme
    const updatedMemes = mockMemes.map(meme => {
      if (meme.id === selectedMeme.id) {
        return {
          ...meme,
          comments: [...meme.comments, newComment]
        };
      }
      return meme;
    });

    // Update the selected meme with the new comment
    setSelectedMeme({
      ...selectedMeme,
      comments: [...selectedMeme.comments, newComment]
    });

    setComment('');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmitMeme = () => {
    setShowSubmitModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <BattleContainer>
      <SplitScreen>
        <Side
          side="left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Content>
            <TeamName side="left">PEPE ARMY</TeamName>
            <MemeGrid>
              {mockMemes
                .filter(meme => meme.side === 'left')
                .map(meme => (
                  <MemeCard
                    key={meme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMeme(meme)}
                  >
                    <img src={meme.image} alt="Meme" />
                    <MemeActions>
                      <VoteButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        upvoted={upvotedMemes.has(meme.id)}
                        onClick={(e) => handleVote(meme, e)}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                        {meme.upvotes}
                      </VoteButton>
                      <ShareButton>🔗</ShareButton>
                    </MemeActions>
                  </MemeCard>
                ))}
            </MemeGrid>
          </Content>
        </Side>

        <VoteMeter>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>BATTLE PROGRESS</h3>
          <VoteBars>
            <VoteBar>
              <VoteProgress
                side="left"
                initial={{ height: 0 }}
                animate={{ height: `${leftPercentage}%` }}
                transition={{ duration: 1 }}
              />
              <VotePercentage>{Math.round(leftPercentage)}%</VotePercentage>
            </VoteBar>
            <VoteBar>
              <VoteProgress
                side="right"
                initial={{ height: 0 }}
                animate={{ height: `${rightPercentage}%` }}
                transition={{ duration: 1 }}
              />
              <VotePercentage>{Math.round(rightPercentage)}%</VotePercentage>
            </VoteBar>
          </VoteBars>
          <VoteCount>
            <span>{votes.left} votes</span>
            <span>{votes.right} votes</span>
          </VoteCount>
        </VoteMeter>

        <Side
          side="right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Content>
            <TeamName side="right">DOGE SQUAD</TeamName>
            <MemeGrid>
              {mockMemes
                .filter(meme => meme.side === 'right')
                .map(meme => (
                  <MemeCard
                    key={meme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMeme(meme)}
                  >
                    <img src={meme.image} alt="Meme" />
                    <MemeActions>
                      <VoteButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        upvoted={upvotedMemes.has(meme.id)}
                        onClick={(e) => handleVote(meme, e)}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                        {meme.upvotes}
                      </VoteButton>
                      <ShareButton>🔗</ShareButton>
                    </MemeActions>
                  </MemeCard>
                ))}
            </MemeGrid>
          </Content>
        </Side>
      </SplitScreen>

      {voteAnimations.map(anim => (
        <VoteAnimation
          key={anim.id}
          initial={{ scale: 1, x: anim.x, y: anim.y, opacity: 1 }}
          animate={{
            scale: 0,
            y: anim.y - 100,
            opacity: 0
          }}
          transition={{ duration: 1 }}
        >
          ⬆️
        </VoteAnimation>
      ))}

      <SubmitButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSubmitModal(true)}
      >
        SUBMIT MEME
      </SubmitButton>

      <AnimatePresence>
        {selectedMeme && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMeme(null)}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedMeme.image} alt="Meme" />
              <MemeActions>
                <VoteButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  upvoted={upvotedMemes.has(selectedMeme.id)}
                  onClick={(e) => handleVote(selectedMeme, e)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                  {selectedMeme.upvotes}
                </VoteButton>
                <ShareButton>🔗</ShareButton>
              </MemeActions>
              
              <CommentsContainer>
                <CommentColumn side="left">
                  <h3>PEPE ARMY</h3>
                  <CommentForm onSubmit={(e) => handleCommentSubmit(e, 'left')}>
                    <CommentInput
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment..."
                    />
                    <SubmitCommentButton
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post Comment
                    </SubmitCommentButton>
                  </CommentForm>
                  {selectedMeme.comments
                    .filter(comment => comment.side === 'left')
                    .map((comment, index) => (
                      <Comment key={index}>
                        <span className="author">{comment.author}</span>
                        <span className="timestamp">{comment.timestamp}</span>
                        <p>{comment.text}</p>
                      </Comment>
                    ))}
                </CommentColumn>

                <CommentColumn side="right">
                  <h3>DOGE SQUAD</h3>
                  <CommentForm onSubmit={(e) => handleCommentSubmit(e, 'right')}>
                    <CommentInput
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment..."
                    />
                    <SubmitCommentButton
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post Comment
                    </SubmitCommentButton>
                  </CommentForm>
                  {selectedMeme.comments
                    .filter(comment => comment.side === 'right')
                    .map((comment, index) => (
                      <Comment key={index}>
                        <span className="author">{comment.author}</span>
                        <span className="timestamp">{comment.timestamp}</span>
                        <p>{comment.text}</p>
                      </Comment>
                    ))}
                </CommentColumn>
              </CommentsContainer>
            </ModalContent>
          </Modal>
        )}

        {showSubmitModal && (
          <SubmitMemeModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSubmitModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: '1rem' }}>Submit Your Meme</h2>
              <FileUpload onClick={() => fileInputRef.current?.click()}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                />
                {previewUrl ? (
                  <PreviewImage src={previewUrl} alt="Preview" />
                ) : (
                  <p>Click or drag to upload your meme</p>
                )}
              </FileUpload>
              <VoteButton
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitMeme}
                disabled={!selectedFile}
              >
                Submit
              </VoteButton>
            </ModalContent>
          </SubmitMemeModal>
        )}
      </AnimatePresence>
    </BattleContainer>
  );
};

export default BattlePage;
