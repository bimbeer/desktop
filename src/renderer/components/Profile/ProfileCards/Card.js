import { Box, useStyleConfig } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  return (
    <Box
      __css={styles}
      p={rest.p}
      bg={rest.bg}
      rounded={rest.rounded}
      my={rest.my}
    >
      {children}
    </Box>
  );
}

Card.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  variant: 'defaultVariant',
};
