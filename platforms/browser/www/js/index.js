var firebaseConfig = {
    apiKey: "AIzaSyDsq5nvaNFRSY_BmnkEU9DlhWpeptFSA7w",
    authDomain: "bucketlist-41b7c.firebaseapp.com",
    databaseURL: "https://bucketlist-41b7c.firebaseio.com",
    projectId: "bucketlist-41b7c",
    storageBucket: "bucketlist-41b7c.appspot.com",
    messagingSenderId: "501914594529",
    appId: "1:501914594529:web:e5a6fee46be71d25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.addEventListener("deviceready", onDeviceReady(), false);


function onDeviceReady() {
    var $newTaskInput = $('#newTaskInput');
    var $taskList = $('#taskList');
    console.log(window.localStorage);

    //if (navigator.network.connection.type != Connection.NONE) {
    maaklijst();

    //} else {
    //   geenInternet();
    // }







    $('#addNewTask').on('click', function () {
        var bucketitem = document.getElementById("newTaskInput").value;
        var key = Date.now();

        const db = firebase.firestore();
        const bucketlist = db.collection('bucketlist');
        if (bucketitem == null || bucketitem == "") {
            alert("vul iets in");
        } else {
            bucketlist.doc(key.toString()).set({

                bucketitem: bucketitem
            })

            var newTask = '<li id="' + key + '" data-key="' + key + '" onclick="clicked(this.id)"><span>' + $newTaskInput.val() + '</span></li>';
            $taskList.append(newTask);



            $newTaskInput.val('');
        }
    });

}



$(document).ready(function () {

});

function maaklijst() {
    var key = Date.now();
    var $newTaskInput = $('#newTaskInput');
    var $taskList = $('#taskList');
    const db = firebase.firestore();
    const bucketlist = db.collection('bucketlist');
    bucketlist.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var item = doc.data().bucketitem;

            storage = window.localStorage;
            storage.setItem(key, item);

            var newTask = '<li id="' + key + '"data-key="' + key + '" onclick="clicked(this.id)"><span>' + item + '</span></li>';
            $taskList.append(newTask);
        });
    })

    $newTaskInput.val('');

}

function clicked(id) {
    console.log("test");
    const db = firebase.firestore();
    const bucketlist = db.collection('bucketlist');
    bucketlist.doc(id).delete();
    var removeitem = document.getElementById(id);
    removeitem.parentNode.removeChild(removeitem);
    navigator.vibrate(500);


}

function geenInternet() {
    var $taskList = $('#taskList');
    storage = window.localStorage;
    for (var i = 0; i < localStorage.length; i++) {
        var newTask = '<li id="' + storage.key(i) + '"data-key="' + storage.key(i) + '" onclick="clicked(this.id)"><span>' + storage.getItem(storage.key(i)) + '</span></li>';
        $taskList.append(newTask);

    }
    alert("verbind met internet om nieuwe items toe te voegen");
}


function saveName() {
    var inputName = document.getElementById("getName").value;
    var storage = window.localStorage;
    storage.setItem('name', inputName);
    setName();

}

function GetName() {
    var storage = window.localStorage;
    return storage.getItem('name');




}

function setName() {
    var title = document.getElementById("title");
    var naam = GetName();
    if (naam == null || naam == "") {
        title.innerHTML = "bucketlist";

    } else {
        title.innerHTML = naam + "'s bucketlist";

    }
}
document.addEventListener("DOMContentLoaded", () => {

    setName();

});
