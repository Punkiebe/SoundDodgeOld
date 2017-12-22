# Sound Dodge

A game designed by Nevies Entertainment

This game supports the following platforms :

* Web Browsers
* iOS
* Android

## Development

Ensure you have NodeJS installed.

1. Clone this repo:

    ```bash
    git clone https://github.com/Punkiebe/SoundDodge.git
    ```

2. Install dependencies:

    Navigate to the cloned repo’s directory.

    ```bash
    npm install
    ``` 

3. Run the webpack code compiler and watcher:

    Run:

    ```bash
    npm run dev
    ```

    This will run webpack which minimizes and compile the **development** bundle into `www`.

4. Run Cordova commands.

    In a new terminal window, run the following

    ```bash
    # If the platform has not been added, add the browser platform.
    cordova platform add browser # peer dependency errors here can be ignored

    # After the platform is added, you can use live-reload
    # To test browser development locally
    cordova run browser -- --live-reload
    ```


## Build for deployment:

Run:

```bash
npm run deploy
```

This will uglify and minimize the compiled **production** bundle into `www`.

Afterwards, you can use Cordova to build and run the browser and native ios/android applications.

```bash
cordova run android
# Run application on Android/Emulator
cordova run browser
# Same as development browser run command, without live reload
```
