import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {PermissionsAndroid, Platform} from 'react-native';

export const CheckAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
};

export const onStartRecord = async () => {
  const result = await this.audioRecorderPlayer.startRecorder();
  this.audioRecorderPlayer.addRecordBackListener((e) => {
    this.setState({
      recordSecs: e.currentPosition,
      recordTime: this.audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ),
    });
    return;
  });
  console.log(result);
};

export const onStopRecord = async () => {
  const result = await this.audioRecorderPlayer.stopRecorder();
  this.audioRecorderPlayer.removeRecordBackListener();
  this.setState({
    recordSecs: 0,
  });
  console.log(result);
};

export onStartPlay = async () => {
  console.log('onStartPlay');
  const msg = await this.audioRecorderPlayer.startPlayer();
  console.log(msg);
  this.audioRecorderPlayer.addPlayBackListener((e) => {
    this.setState({
      currentPositionSec: e.currentPosition,
      currentDurationSec: e.duration,
      playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    });
    return;
  });
};

export const onPausePlay = async () => {
  await this.audioRecorderPlayer.pausePlayer();
};

export const onStopPlay = async () => {
  console.log('onStopPlay');
  this.audioRecorderPlayer.stopPlayer();
  this.audioRecorderPlayer.removePlayBackListener();
};