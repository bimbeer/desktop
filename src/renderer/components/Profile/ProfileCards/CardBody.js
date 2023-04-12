import { Box, useStyleConfig } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function CardBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardBody', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} px={rest.px}>
      {children}
    </Box>
  );
}

CardBody.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardBody.defaultProps = {
  variant: 'defaultVariant',
};
