import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { Box, Checkbox, checkboxClasses, Container, Sheet } from '@mui/joy';

export default function RadioPositionEnd () {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Container>

        <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
          <List
            sx={{
              minWidth: 240,
              '--List-gap': '0.5rem',
              '--ListItem-paddingY': '1rem',
              '--ListItem-radius': '8px',
              '--ListItemDecorator-size': '32px',
            }}
          >
            {['Individual', 'Team', 'Enterprise'].map((item, index) => (
              <ListItem
                variant="outlined"
                key={item}
                sx={{ boxShadow: '', bgcolor: 'background.body' }}
              >
                <ListItemDecorator>
                  {['A', 'B', 'C'][index]}
                </ListItemDecorator>
                <Radio
                  overlay
                  value={item}
                  label={item}
                  sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: (theme) => ({
                        ...(checked && {
                          inset: -1,
                          border: '2px solid',
                          borderColor: theme.vars.palette.primary[500],
                        }),
                      }),
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </RadioGroup>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 300,
            '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
          }}
        >
          <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
            <Checkbox
              label="My parent receives focus"
              overlay
              // Force the outline to appear in the demo. Usually, you don't need this in your project.
              slotProps={{
                // action: { className: checkboxClasses.focusVisible }
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
          <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
            <Checkbox
              label="My parent receives focus"
              overlay
              // Force the outline to appear in the demo. Usually, you don't need this in your project.
              slotProps={{
                // action: { className: checkboxClasses.focusVisible }
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
          <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
            <Checkbox
              label="My parent receives focus"
              overlay
              // Force the outline to appear in the demo. Usually, you don't need this in your project.
              slotProps={{
                // action: { className: checkboxClasses.focusVisible }
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
          <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
            <Checkbox
              label="My parent receives focus"
              overlay
              // Force the outline to appear in the demo. Usually, you don't need this in your project.
              slotProps={{
                // action: { className: checkboxClasses.focusVisible }
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        </Box>
        </Container>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}
