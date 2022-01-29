import React, {useState} from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendMessage(props) {
  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '50px',
          minHeight: '50px',
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        label={<img src="https://img.icons8.com/plumpy/24/000000/filled-sent.png"/>}
        onClick={(event) => {
          event.preventDefault();
          props.handleNovasMenssagens(props.message);
        }}
      />
    </Box>
  )
}