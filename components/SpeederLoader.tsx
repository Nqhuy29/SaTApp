import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';

export default function SpeederLoader({ visible }: { visible: boolean }) {
  const spokeRot = useSharedValue(0);
  const hamsterTrans = useSharedValue(0);
  const headRot = useSharedValue(0);
  const earRot = useSharedValue(0);
  const eyeScale = useSharedValue(1);
  const bodyRot = useSharedValue(0);
  const frLimb = useSharedValue(50);
  const flLimb = useSharedValue(-30);
  const brLimb = useSharedValue(-60);
  const blLimb = useSharedValue(20);
  const tailRot = useSharedValue(30);

  useEffect(() => {
    if (!visible) {
      cancelAnimation(spokeRot);
      cancelAnimation(hamsterTrans);
      cancelAnimation(headRot);
      cancelAnimation(earRot);
      cancelAnimation(eyeScale);
      cancelAnimation(bodyRot);
      cancelAnimation(frLimb);
      cancelAnimation(flLimb);
      cancelAnimation(brLimb);
      cancelAnimation(blLimb);
      cancelAnimation(tailRot);
      return;
    }

    spokeRot.value = 0;
    spokeRot.value = withRepeat(
      withTiming(-360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );

    hamsterTrans.value = 0;
    hamsterTrans.value = withRepeat(
      withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    headRot.value = 0;
    headRot.value = withRepeat(
      withTiming(8, { duration: 125, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    earRot.value = 0;
    earRot.value = withRepeat(
      withTiming(12, { duration: 125, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    bodyRot.value = 0;
    bodyRot.value = withRepeat(
      withTiming(-2, { duration: 125, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    frLimb.value = 50;
    frLimb.value = withRepeat(
      withTiming(-30, { duration: 125, easing: Easing.linear }),
      -1,
      true
    );

    flLimb.value = -30;
    flLimb.value = withRepeat(
      withTiming(50, { duration: 125, easing: Easing.linear }),
      -1,
      true
    );

    brLimb.value = -60;
    brLimb.value = withRepeat(
      withTiming(20, { duration: 125, easing: Easing.linear }),
      -1,
      true
    );

    blLimb.value = 20;
    blLimb.value = withRepeat(
      withTiming(-60, { duration: 125, easing: Easing.linear }),
      -1,
      true
    );

    tailRot.value = 30;
    tailRot.value = withRepeat(
      withTiming(10, { duration: 125, easing: Easing.linear }),
      -1,
      true
    );

    eyeScale.value = 1;
    eyeScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear }),
        withTiming(1, { duration: 50, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, [visible]);

  const spokeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spokeRot.value}deg` }],
  }));

  const hamsterStyle = useAnimatedStyle(() => {
    const rot = 4 - hamsterTrans.value * 4;
    return {
      transform: [
        { rotate: `${rot}deg` },
        { translateX: -11.2 },
        { translateY: 25.9 },
      ],
    };
  });

  const headStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${headRot.value}deg` }],
  }));

  const earStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${earRot.value}deg` }],
  }));

  const eyeStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: eyeScale.value }],
  }));

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bodyRot.value}deg` }],
  }));

  const frLimbStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${frLimb.value}deg` }],
  }));

  const flLimbStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${flLimb.value}deg` }],
  }));

  const brLimbStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${brLimb.value}deg` }],
  }));

  const blLimbStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${blLimb.value}deg` }],
  }));

  const tailStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tailRot.value}deg` }],
  }));

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* 1. Hamster (Bottom Layer) */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 98,
              height: 52.5,
              left: 35,
              top: 84,
              transformOrigin: '50% 0%',
            },
            hamsterStyle,
          ]}
        >
          {/* Body */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 63,
                height: 42,
                left: 28,
                top: 3.5,
                transformOrigin: '17% 50%',
              },
              bodyStyle,
            ]}
          >
            {/* Tail */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 14,
                  height: 7,
                  right: -7,
                  top: 21,
                  transformOrigin: '3.5px 3.5px',
                  zIndex: -1,
                },
                tailStyle,
              ]}
            >
              <Svg width="14" height="7">
                <Defs>
                  <LinearGradient id="tailGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="30%" stopColor="hsl(0,90%,75%)" />
                    <Stop offset="30%" stopColor="hsl(0,90%,85%)" />
                  </LinearGradient>
                </Defs>
                <Rect width="14" height="7" rx="3.5" fill="url(#tailGrad)" />
              </Svg>
            </Animated.View>

            {/* BR Limb */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 21,
                  height: 35,
                  left: 39.2,
                  top: 14,
                  transformOrigin: '50% 30%',
                  zIndex: -1,
                },
                brLimbStyle,
              ]}
            >
              <Svg width="21" height="35">
                <Defs>
                  <LinearGradient id="brLimbGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="90%" stopColor="hsl(30,90%,80%)" />
                    <Stop offset="90%" stopColor="hsl(0,90%,75%)" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M 0 10.5 A 10.5 10.5 0 0 1 21 10.5 L 21 10.5 L 14.7 31.5 L 14.7 35 L 6.3 35 L 8.4 31.5 Z"
                  fill="url(#brLimbGrad)"
                />
              </Svg>
            </Animated.View>

            {/* FR Limb */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 14,
                  height: 21,
                  left: 7,
                  top: 28,
                  transformOrigin: '50% 0%',
                  zIndex: -1,
                },
                frLimbStyle,
              ]}
            >
              <Svg width="14" height="21">
                <Defs>
                  <LinearGradient id="frLimbGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="80%" stopColor="hsl(30,90%,80%)" />
                    <Stop offset="80%" stopColor="hsl(0,90%,75%)" />
                  </LinearGradient>
                </Defs>
                <Polygon
                  points="0,0 14,0 9.8,16.8 8.4,21 0,21 5.6,16.8"
                  fill="url(#frLimbGrad)"
                />
              </Svg>
            </Animated.View>

            {/* Body Shape */}
            <Svg width="63" height="42" style={{ position: 'absolute' }}>
              <Defs>
                <LinearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="hsl(30,90%,55%)" />
                  <Stop offset="20%" stopColor="hsl(30,90%,90%)" />
                  <Stop offset="80%" stopColor="hsl(30,90%,90%)" />
                  <Stop offset="100%" stopColor="hsl(30,90%,80%)" />
                </LinearGradient>
              </Defs>
              <Rect width="63" height="42" rx="21" fill="url(#bodyGrad)" />
            </Svg>

            {/* BL Limb */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 21,
                  height: 35,
                  left: 39.2,
                  top: 14,
                  transformOrigin: '50% 30%',
                  zIndex: 2,
                },
                blLimbStyle,
              ]}
            >
              <Svg width="21" height="35">
                <Defs>
                  <LinearGradient id="blLimbGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="90%" stopColor="hsl(30,90%,90%)" />
                    <Stop offset="90%" stopColor="hsl(0,90%,85%)" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M 0 10.5 A 10.5 10.5 0 0 1 21 10.5 L 21 10.5 L 14.7 31.5 L 14.7 35 L 6.3 35 L 8.4 31.5 Z"
                  fill="url(#blLimbGrad)"
                />
              </Svg>
            </Animated.View>

            {/* FL Limb */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 14,
                  height: 21,
                  left: 7,
                  top: 28,
                  transformOrigin: '50% 0%',
                  zIndex: 2,
                },
                flLimbStyle,
              ]}
            >
              <Svg width="14" height="21">
                <Defs>
                  <LinearGradient id="flLimbGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="80%" stopColor="hsl(30,90%,90%)" />
                    <Stop offset="80%" stopColor="hsl(0,90%,85%)" />
                  </LinearGradient>
                </Defs>
                <Polygon
                  points="0,0 14,0 9.8,16.8 8.4,21 0,21 5.6,16.8"
                  fill="url(#flLimbGrad)"
                />
              </Svg>
            </Animated.View>

            {/* Head */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 38.5,
                  height: 35,
                  left: -28,
                  top: 0,
                  transformOrigin: '100% 50%',
                  zIndex: 3,
                },
                headStyle,
              ]}
            >
              {/* Ear */}
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    width: 10.5,
                    height: 10.5,
                    right: -3.5,
                    top: -3.5,
                    transformOrigin: '50% 75%',
                  },
                  earStyle,
                ]}
              >
                <Svg width="10.5" height="10.5">
                  <Circle cx="5.25" cy="5.25" r="5.25" fill="hsl(0,90%,85%)" />
                  <Path
                    d="M 5.25 0 A 5.25 5.25 0 0 0 0 5.25 A 5.25 5.25 0 0 0 5.25 10.5 Z"
                    fill="hsl(30,90%,55%)"
                  />
                </Svg>
              </Animated.View>

              {/* Head SVG */}
              <Svg width="38.5" height="35" style={{ position: 'absolute' }}>
                <Defs>
                  <LinearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="hsl(30,90%,55%)" />
                    <Stop offset="60%" stopColor="hsl(30,90%,55%)" />
                    <Stop offset="80%" stopColor="hsl(30,90%,90%)" />
                    <Stop offset="100%" stopColor="hsl(30,90%,80%)" />
                  </LinearGradient>
                </Defs>
                <Rect width="38.5" height="35" rx="17.5" fill="url(#headGrad)" />
              </Svg>

              {/* Eye */}
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    width: 7,
                    height: 7,
                    left: 17.5,
                    top: 5.25,
                  },
                  eyeStyle,
                ]}
              >
                <Svg width="7" height="7">
                  <Circle cx="3.5" cy="3.5" r="3.5" fill="#000" />
                </Svg>
              </Animated.View>

              {/* Nose */}
              <View
                style={{
                  position: 'absolute',
                  width: 2.8,
                  height: 3.5,
                  left: 0,
                  top: 10.5,
                }}
              >
                <Svg width="2.8" height="3.5">
                  <Ellipse cx="1.4" cy="1.75" rx="1.4" ry="1.75" fill="hsl(0,90%,75%)" />
                </Svg>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* 2. Wheel Rim (Middle Layer) */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="168" height="168">
            <Circle
              cx="84"
              cy="84"
              r="80"
              stroke="hsl(0,0%,60%)"
              strokeWidth="8"
              fill="none"
            />
          </Svg>
        </View>

        {/* 3. Spokes (Top Layer) */}
        <Animated.View
          style={[StyleSheet.absoluteFill, spokeStyle]}
          pointerEvents="none"
        >
          <Svg width="168" height="168">
            <Line
              x1="84"
              y1="4"
              x2="84"
              y2="164"
              stroke="hsl(0,0%,65%)"
              strokeWidth="4"
            />
            <Line
              x1="4"
              y1="84"
              x2="164"
              y2="84"
              stroke="hsl(0,0%,65%)"
              strokeWidth="4"
            />
            <Circle cx="84" cy="84" r="8" fill="hsl(0,0%,60%)" />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    width: 168,
    height: 168,
    position: 'relative',
  },
});
