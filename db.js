let dbUser = null;

async function login(email, password) {
    let success = true;
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        console.error("Auth failed", error);
        success = false;
    });
    return success;
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        dbUser = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
        };
    } else {
        // User is signed out.
        dbUser = null;
    }
});