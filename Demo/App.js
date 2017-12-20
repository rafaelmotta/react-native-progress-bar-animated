import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Text,
} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default class App extends React.Component {

  state = {
    progress: 0,
  }

  increase = () => {
    const progress = this.state.progress + 10;
    this.setState({ progress });
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 30;

    return (
      <View style={styles.container}>
        <ProgressBarAnimated
          width={barWidth}
          value={this.state.progress}
          backgroundColorOnComplete="#6CC644"
          onComplete={() => {
            Alert.alert('Yeah', 'Event on complete fired')
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Button
              title="Increase 10%"
              onPress={this.increase}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 35,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
});