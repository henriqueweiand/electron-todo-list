import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { menubar } from 'menubar';

let win: any;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = menubar({
        index: 'http://localhost:2003/index.html',
        tooltip: 'MyApp',
        icon: path.resolve(__dirname, 'IconTemplate.png'),
        showOnAllWorkspaces: false,
        browserWindow: {
            width: 350,
            height: 460,
            fullscreenable: false,
            resizable: false,
            transparent: true,
            webPreferences: {
                backgroundThrottling: false
            },
            alwaysOnTop: true
        }
    });

    win.on('after-create-window', () => {
        win.window.webContents.openDevTools({ mode: 'undocked' });
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', (event: any) => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    app.dock.hide();
    event.preventDefault();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
