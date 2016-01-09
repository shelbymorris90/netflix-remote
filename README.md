# Netflix Remote
Control Netflix Remotely.

The solution requires a Chrome extension and an application that needs to run on the same network as the Netflix instance which you would like to remotely control.

The Chrome extension is automatically enabled when users navigate to the Netflix website.

The application is simply a background process which enables a web-based interface from which the remote control functionality is accessed.
 

### Basic Installation (at the time of this writing, assumes Node.js is installed)
- Download the repo
- Open Google Chrome
  - Go to `chrome://extensions`
  - Enable `Developer Mode` (top right corner)
  - Click `Load unpacked extension`
  - Navigate to and select the `netflix-remote/chrome-extension` directory
  - Make sure the extension is enabled
- In a command prompt/terminal, navigate to the `netflix-remote/app` directory
- Type `npm install` to download the dependencies
- Navigate to the `public` directory in the command prompt/terminal window and type `bower install`
- Now navigate back to the `netflix-remote/app` directory and type `electron .`

### Basic Usage (at the time of this writing)
- Open a web-browser and go to `http://localhost:4545` and you will see the basic remote interface
- The interface is accessible to devices on the same network, but you will need the internal network IP for the machine hosting the app
- When you've acquired the IP you can use it as such, in any web browser, `http://IP_ADDRESS_HERE:4545`


## TO DO
- [ ] Automatically continue playing when prompted by Netflix
- [ ] Fully functional 'seek' bar
- [ ] Browse / Select content via Remote
- [ ] Now Playing Thumbnail (in addition to the text which is currently in place)
- [ ] Package App into exectuable for Linux/OS X/Windows (via Electron)
