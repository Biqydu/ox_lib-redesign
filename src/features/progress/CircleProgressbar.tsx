import React from 'react';
import { createStyles, keyframes, RingProgress, Stack, Text, useMantineTheme } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { CircleProgressbarProps } from '../../typings';

// 33.5 is the r of the circle
const progressCircle = keyframes({
  '0%': { strokeDasharray: `0, ${33.5 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${33.5 * 2 * Math.PI}, 0` },
});

const useStyles = createStyles((theme, params: { position: 'bottom' | 'middle'; duration: number }) => ({
  container: {
    width: '100%',
    height: params.position === 'bottom' ? '100%' : '20%',
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    '> svg > circle:nth-child(1)': {
      stroke: '#232324 ',
      strokeLinecap: 'round',
      filter: 'drop-shadow(1px 1px 2.5px #292524d9)',
    },
    '> svg > circle:nth-child(2)': {
      transition: 'none',
      animation: `${progressCircle} linear forwards`,
      animationDuration: `${params.duration}ms`,
      strokeLinecap: 'round',
      filter: 'drop-shadow(1px 1px 2.5px #292524d9)',
    },
  },
  value: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontWeight: 600,
    fontSize: 16,
    textShadow: theme.shadows.sm,
    color: theme.colors.gray[1],
    filter: 'drop-shadow(0px 0px 4px #FFF)',
    height: 45,
    width: 45,
    backgroundColor: '#232324',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  label: {
    textAlign: 'center',
    fontFamily: 'roboto',
    fontWeight: 900,
    textShadow: theme.shadows.sm,
    color: theme.colors.gray[1],
    height: 20,
    filter: 'drop-shadow(0px 0px 8px #FFF)',
  },
  wrapper: {
    marginTop: params.position === 'bottom' ? 25 : undefined,
  },
}));

const CircleProgressbar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [progressDuration, setProgressDuration] = React.useState(0);
  const [position, setPosition] = React.useState<'middle' | 'bottom'>('middle');
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = React.useState('');
  const theme = useMantineTheme();
  const { classes } = useStyles({ position, duration: progressDuration });

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<CircleProgressbarProps>('circleProgress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setProgressDuration(data.duration);
    setPosition(data.position || 'middle');
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue;
      });
    }, onePercent);
  });

  return (
    <Stack spacing={0} className={classes.container}>
      <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
        <Stack spacing={0} align="center" className={classes.wrapper}>
          <div className={classes.progressWrapper}>
            <RingProgress
              size={90}
              thickness={7.5}
              sections={[{ value: 0, color: theme.primaryColor }]}
              onAnimationEnd={() => setVisible(false)}
              className={classes.progress}
            />
            <div className={classes.value}>{value}%</div>
          </div>
          {label && <Text className={classes.label}>{label}</Text>}
        </Stack>
      </ScaleFade>
    </Stack>
  );
};

export default CircleProgressbar;
