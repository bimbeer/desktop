import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function TimeSinceLastMessage({ timestamp }) {
  const [timeSinceLastMessage, setTimeSinceLastMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - timestamp;
      const diffInMinutes = Math.round(diff / 1000 / 60);

      if (diffInMinutes < 60) {
        setTimeSinceLastMessage(`${diffInMinutes}m`);
      } else {
        const diffInHours = Math.round(diffInMinutes / 60);
        if (diffInHours < 24) {
          setTimeSinceLastMessage(`${diffInHours}h`);
        } else {
          const diffInDays = Math.round(diffInHours / 24);
          setTimeSinceLastMessage(`${diffInDays}d`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <Text ml={2} w="50px" fontSize="sm">
      ▪ {timeSinceLastMessage}
    </Text>
  );
}

TimeSinceLastMessage.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
};
