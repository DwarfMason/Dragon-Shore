let dbUser = null;
let db = null;

if (firebase) {
    db = firebase.firestore();
}

async function isOnline() {
    let online = !!db;
    if (online) {
        await db.collection("constants").doc("checkOnline").get().then(val => {
            online = val.data().mustBeTrue;
        }).catch(error => {
            console.error("Checking online failed:", error.toString());
            online = false;
        });
    }
    return online;
}

async function login(email, password) {
    if (!isOnline()) {
        return false;
    }
    let success = true;
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        console.error("Auth failed", error);
        success = false;
    });
    return success;
}

async function registrate(email, password, nickname=null) {
    if (!isOnline()) {
        return false;
    }
    let success = true;
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((userCreds)=>{
        userCreds.user.updateProfile({
            displayName: nickname
        });
    }).catch(error => {
        console.error("Registration failed", error);
        success = error.code;
    });
    return success;
}

async function postScore(depth) {
    if (!isOnline()) {
        return false;
    }
    let success = true;
    await db.collection("leaderboards").where("uid", "==", dbUser.uid).limit(1).get().then(querySnapshot => {
        if (querySnapshot.empty) {
            db.collection("leaderboards").add({
                uid: dbUser.uid,
                depth: depth,
            }).catch(error => {
                console.error("Writing to DB failed", error);
                success = false;
            });
        } else {
            db.collection("leaderboards").doc(querySnapshot.docs[0].id).set({
                depth: depth,
            }, {merge: true}).catch(error => {
                console.error("Writing to DB failed", error);
                success = false;
            });
        }
    }).catch(error => {
        console.error("Accessing DB failed", error);
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
        if (!user.displayName) {
            user.updateProfile({
                displayName: "MISSINGNO"
            }).then(()=>{
                dbUser.displayName = user.displayName;
            });
        }
    } else {
        // User is signed out.
        dbUser = null;
    }
});