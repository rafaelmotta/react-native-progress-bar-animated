import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Animated,
  Easing,
} from 'react-native';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: props.value,
    };
    
    this.widthAnimation = new Animated.Value(0);
    this.backgroundAnimation = new Animated.Value(0);
    this.backgroundInterpolationValue = null;
  }

  componentDidMount() {
    if (this.state.progress > 0) {
      this.animateWidth();
    }
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.progress) {
      if (props.value >= 0 && props.value <= this.props.maxValue) {
        this.setState({ progress: props.value }, () => {
          if (this.state.progress === this.props.maxValue) {
            // Callback after complete the progress
            const callback = this.props.onComplete;
            if (callback) {
              setTimeout(callback, this.props.barAnimationDuration);
            }
          }
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animateWidth();

      if (this.props.backgroundColorOnComplete) {
        if (this.props.value === this.props.maxValue) {
          this.animateBackground();
        }
      }
    }
  }

  animateWidth() {
    const toValue = ((this.props.width * this.state.progress) / 100) - this.props.borderWidth * 2;

    Animated.timing(this.widthAnimation, {
      easing: Easing[this.props.barEasing],
      toValue: toValue > 0 ? toValue : 0,
      duration: this.props.barAnimationDuration,
    }).start();
  }

  animateBackground() {
    Animated.timing(this.backgroundAnimation, {
      toValue: 1,
      duration: this.props.backgroundAnimationDuration,
    }).start();
  }

  render() {
    if (this.props.backgroundColorOnComplete) {
      this.backgroundInterpolationValue = this.backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [this.props.backgroundColor, this.props.backgroundColorOnComplete],
      });
    }

    return (
      <View style={{
        width: this.props.width,
        height: this.props.height,
        borderWidth: this.props.borderWidth,
        borderColor: this.props.borderColor,
        borderRadius: this.props.borderRadius,
      }}
      >
        <Animated.View style={{
          height: this.props.height - (this.props.borderWidth * 2),
          width: this.widthAnimation,
          backgroundColor: this.backgroundInterpolationValue || this.props.backgroundColor,
          borderRadius: this.props.borderRadius,
        }}
        />
      </View>
    );
  }
}

ProgressBar.propTypes = {

  /**
   * Bar values
   */
  value: PropTypes.number,
  maxValue: PropTypes.number,

  /**
   * Animations
   */
  barEasing: PropTypes.oneOf([
    'bounce',
    'cubic',
    'ease',
    'sin',
    'linear',
    'quad',
  ]),
  barAnimationDuration: PropTypes.number,
  backgroundAnimationDuration: PropTypes.number,

  /**
   * StyleSheet props
   */
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  backgroundColorOnComplete: PropTypes.string,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,

  /**
   * Callbacks
   */
  onComplete: PropTypes.func,
};

ProgressBar.defaultProps = {
  value: 0,
  maxValue: 100,

  barEasing: 'linear',
  barAnimationDuration: 500,
  backgroundAnimationDuration: 2500,

  height: 15,

  backgroundColor: '#148cF0',
  backgroundColorOnComplete: null,

  borderWidth: 1,
  borderColor: '#C8CCCE',
  borderRadius: 6,

  onComplete: null,
};

export default ProgressBar;
