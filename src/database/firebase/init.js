import * as firebase from 'firebase';
import timerErrorFix from './timerErrorFix.js';


const initFirebase = () => {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDAKWCiNof4wQQE80AVC_fB4h4g-qXE_6U",
        authDomain: "checkzone-dm.firebaseapp.com",
        databaseURL: "https://checkzone-dm.firebaseio.com",
        storageBucket: "checkzone-dm.appspot.com"
    };
    
    firebase.initializeApp(firebaseConfig);
    console.log('Database connected!');

    timerErrorFix();

    return true;
}

export default initFirebase;



