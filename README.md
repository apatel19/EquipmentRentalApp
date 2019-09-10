Project: EquipmentRental

@authors: Apurva Patel, Lauren Kirkley, Jameson Evans

Course: CS495 - Capstone Computing @Univ of Alabama

For collaborators: to get project running
-To get-started do git clone development branch
-Move folder to your location from download
-open folder using VS Code
-If you dont have react-native cli installed follow documentation to install that
-perforn 'npm install' - make sure you are inside the EquipmentRentalApp folder
-make sure you have xcode installed and then
-Perform 'react-native run-ios' to build for iOS
-To build for Android
-Download Android Studio - Open it and bottom right corner click Configure -> AVD -> if you dont have that then create a device and run it
-Perform 'react-native run-android'

-Do quick google search if you run into an error.

Error handling:

    -If encounter error:
        simply do ctrl+c to break running server on terminal and recompile using react-native run-ios && react-native run-android

    -If Memory related error simply reset cache:
         npm start -- --reset-cache     OR
         rm -rf node_modules && npm install OR
         look-up online

//Helping command
specific iOS Device: react-native run-ios --simulator="iPhone 5s"
List all iOS Devices: xcrun simctl list devices
List all Andorid Devices: adb devices

//Helping Libraries : Do checkout getting started doc, I added here so that we know which libs we are using.

    -React-Redux is to manage app related data to store current state
        'npm install --save redux react-redux' || Redux is redux and react-redux is to connect reactNative with redux

    -To get cool vector icons
        'npm install --save react-native-vector-icons' || do manual or automatic linking

    - To Install specific version of react navigation
        'npm install --save react-native-navigation@1'

    -For performance it uses native screens
        react-native link react-native-screens

    -For react navigaions:
        npm install --save react-navigation
        npm install react-native-gesture-handler react-native-reanimated

    -For screen top header buttons
        npm install --save react-navigation-header-buttons

For android look:
npm install --save react-navigation-material-bottom-tabs
npm install --save react-native-paper

To install all together:
npm install --save redux react-redux react-navigation react-navigation-header-buttons
npm install --save react-native-gesture-handler react-native-reanimated
