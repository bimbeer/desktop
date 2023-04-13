import { Box, useStyleConfig } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function CardHeader(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardHeader', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} p={rest.p} mb={rest.mb}>
      {children}
    </Box>
  );
}

CardHeader.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardHeader.defaultProps = {
  variant: 'defaultVariant',
};
