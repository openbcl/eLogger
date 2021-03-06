# eLogger
eLogger is a web app that can be used to create event-based logs. Each log is based on a template that defines which events can occur while the log is being recorded. During logging these events are available as individual buttons. When such a button is pressed the event is triggered and recorded in the protocol in tabular form.

### Event Types
1. **Start**: If you define a start event and trigger it during logging a start time is stored from which the relative times of all other events of the log are derived. In addition, the elapsed relative time (similar to a stopwatch) is displayed during the logging.
2. **Custom**: A custom event has a title given by the user. When the corresponding button is pressed, the time is recorded in the log. Such an event can also be triggered before a start event.
3. **Text**: A text event has the same characteristics as a custom event. In addition, the user can enter a text when pressing the corresponding button during logging. The text is recorded in the tabular protocol.
4. **Audio**: An audio event has the same characteristics as a custom event. In addition, the user can store a live audio recording by pressing the corresponding button during logging. The recording is listed in the tabular protocol.
5. **Photo**: A photo event has the same characteristics as a custom event. In addition, the user can take a photo by pressing the corresponding button during logging. The photo is listed in the tabular protocol.
6. **Pause**: If you define a pause event, the logging can be paused. The timer is paused, too. A pause event can only be triggered if a start event has been triggered before. If a pause event is defined a resume event should also be defined so that the logging can be continued again.
7. **Resume**: When a resume event is triggered logging is continued. The timer continues to run again. The relative times of subsequent events are calculated by offsetting the start time and all previous pause times.
8. **End**: When an end event is triggered logging is terminated. No further event recordings can be stored for the current log.

### Export Records
You can export your logs all together or individually. The tabular logs are provided as a csv file together with photos and audio records in a single zip file.

### Sharing Templates
Both templates and empty logs can be shared either as a json file or QR code. The import takes place on another device either via the shared file or by scanning the QR code. No other apps are needed for this. All functions are provided by eLogger.

The implemented QR code scanner is [@zxing/ngx-scanner](https://github.com/zxing-js/ngx-scanner). With some browsers (e.g. Firefox) it can happen that the scan fails. It is also possible that some webcams or mobilephone cameras have a low resolution or close focus limit in order to scan the high-resolution QR codes. In this case please use the file import function.

### Install eLogger as [Progressive Web App (PWA)](https://en.wikipedia.org/wiki/Progressive_web_application)
Chrome-based browsers or Safari on iOS devices allow the web app to be added to the home screen. In this case the app has an app icon like any other app and can be used offline. A browser window is no longer visible.

Regardless of whether you install eLogger as a web app or use it in a regular browser, all data is persistently stored locally on your device in the browsers database. Therefore there is no backend and no server. All data remains on your device!

```diff
! If for some reason the browser is reseted and private data or the cache is deleted
! your eLogger configuration and all log records will be lost. To protect yourself
! from this you should back up your configuration and logs at regular intervals.
```

## Development

### Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project in english or run `npm run build-de` to build the project in german.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
