import React from 'react'

import { View, Animated, Easing } from 'react-native'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: props.value
    }

    this.widthAnimation = new Animated.Value(0)
    this.backgroundAnimation = new Animated.Value(0)
    this.backgroundInterpolationValue = null
  }

  componentDidMount() {
    if (this.state.progress > 0) {
      this.animateWidth()
    }
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.progress) {
      if (props.value >= 0 && props.value <= this.props.maxValue) {
        this.setState({ progress: props.value }, () => {
          if (this.state.progress === this.props.maxValue) {
            // Callback after complete the progress
            const callback = this.props.onComplete
            if (callback) {
              setTimeout(callback, this.props.barAnimationDuration)
            }
          }
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animateWidth()

      if (this.props.progressBackgroundColorOnComplete) {
        if (this.props.value === this.props.maxValue) {
          this.animateBackground()
        }
      }
    }
  }

  animateWidth() {
    const toValue = Math.max(
      0,
      Math.min(100, (this.state.progress / this.props.maxValue) * 100)
    )

    Animated.timing(this.widthAnimation, {
      easing: Easing[this.props.barEasing],
      toValue: toValue,
      duration: this.props.barAnimationDuration
    }).start()
  }

  animateBackground() {
    Animated.timing(this.backgroundAnimation, {
      toValue: 1,
      duration: this.props.backgroundAnimationDuration
    }).start()
  }

  render() {
    if (this.props.progressBackgroundColorOnComplete) {
      this.backgroundInterpolationValue = this.backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
          this.props.progressBackgroundColor,
          this.props.progressBackgroundColorOnComplete
        ]
      })
    }

    return (
      <View
        style={{
          width: this.props.width || '100%',
          height: this.props.height,
          borderWidth: this.props.borderWidth,
          borderColor: this.props.borderColor,
          borderRadius: this.props.borderRadius,
          backgroundColor: this.props.backgroundColor
        }}
      >
        <Animated.View
          style={{
            height: this.props.height - this.props.borderWidth * 2,
            width: this.widthAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            }),
            backgroundColor:
              this.backgroundInterpolationValue ||
              this.props.progressBackgroundColor,
            borderRadius: this.props.borderRadius
          }}
        />
      </View>
    )
  }
}

ProgressBar.defaultProps = {
  value: 0,
  maxValue: 100,

  barEasing: 'linear',
  barAnimationDuration: 500,
  backgroundAnimationDuration: 2500,

  height: 15,

  backgroundColor: 'transparent',
  progressBackgroundColor: '#148cF0',
  progressBackgroundColorOnComplete: null,

  borderWidth: 1,
  borderColor: '#C8CCCE',
  borderRadius: 6,

  onComplete: null
}

export default ProgressBar
