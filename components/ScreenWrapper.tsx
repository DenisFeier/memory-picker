import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type ScreenWrapperProps = {
  children: React.ReactNode;
};

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="grad"
            cx="100%"
            cy="0%"
            r="100%"
            fx="100%"
            fy="0%"
          >
            <Stop offset="0%" stopColor="#FCB601" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="1"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grad)"
        />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#932D0D20',
  },
});
