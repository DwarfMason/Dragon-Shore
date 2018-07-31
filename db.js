let dbUser = null;
const defaultNickname = "MISSINGNO";
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

async function logout() {
    if (!isOnline()) {
        return false;
    }
    await firebase.auth().signOut();
    return true;
}

async function registrate(email, password, nickname=null) {
    if (!isOnline()) {
        return false;
    }
    let success = true;
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        console.error("Registration failed", error);
        success = error.code;
    });
    if (firebase.auth().currentUser) {
        await firebase.auth().currentUser.updateProfile({
            displayName: nickname
        }).then(()=>{
            dbUser.displayName = nickname;
        });
    }
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
                nickname: dbUser.displayName,
                depth: depth,
            }).catch(error => {
                console.error("Writing to DB failed", error);
                success = false;
            });
        } else {
            if (querySnapshot.docs[0].data().depth < depth) {
                db.collection("leaderboards").doc(querySnapshot.docs[0].id).set({
                    depth: depth,
                }, {merge: true}).catch(error => {
                    console.error("Writing to DB failed", error);
                    success = false;
                });
            }
        }
    }).catch(error => {
        console.error("Accessing DB failed", error);
        success = false;
    });
    return success;
}

async function getScores(scoresPerPage = 5) {
    if (!isOnline()) {
        return false;
    }
    let result = [];
    let queryHandler = querySnapshot => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                result.push(doc.data());
            });
        }
    };
    await db.collection("leaderboards").limit(scoresPerPage).orderBy("depth", "desc").get()
        .then(queryHandler)
        .catch(error => {
            console.error("Accessing DB failed", error);
            result = false;
    });
    return result;
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