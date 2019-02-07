import { remote } from 'electron';

const sendTo = (screenKey, args) => {
    let screen = remote.getGlobal(screenKey);
    if (screen) {
      console.log(`Message to: ${screenKey}`);
      screen.webContents.send ('message', { data: args });
    }
}

export default sendTo;