import styled from 'styled-components';
import { motion } from 'framer-motion';

const Heart = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: -1;
  background-color: #ff69b4;
  clip-path: polygon(
    50% 0%, 
    61% 12%, 
    78% 12%, 
    88% 22%, 
    88% 39%, 
    79% 50%, 
    50% 85%, 
    21% 50%, 
    12% 39%, 
    12% 22%, 
    22% 12%, 
    39% 12%
  );
`;

export default Heart;
