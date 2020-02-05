import * as firebase from 'firebase';

const save = (col, data) => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref(col + '/').push(
            data
        )
        .then(ref => {
            resolve(ref);
        })
        .catch(err => {
            reject(err);
        });
	});
}

const get = (col, id) => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref(col + '/').child(id)
        .on('value', snapshot => {
            if(!snapshot.val()) {
                reject({
                    success: false,
                    message: "Cannot retrieve data."
                });
            } else {
                let tempObj = {...snapshot.val()}
                tempObj.id = id;

                resolve({
                    success: true,
                    data: tempObj
                });
            }
        })
	});
}

const getAll = (col) => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref(col + '/')
        .on('value', snapshot => {

            if(!snapshot.val()) {
                reject({
                    success: false,
                    message: "Cannot retrieve data."
                });
            } else {
                let records = snapshot.val();
                for (let property in records) {
                    if (records.hasOwnProperty(property)) {
                        records[property].id = property;
                    }
                }

                resolve({
                    success: true,
                    data:  Object.values(records)
                });
            }
        })
	});
}

const update = (col, id, data) => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref(col + '/' + id).set(
            data
        )
        .then(ref => {
            resolve(ref);
        })
        .catch(err => {
            reject(err);
        });
	});
}

const options = () => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref("options/")
        .on('value', snapshot => {
            if(!snapshot.val()) {
                reject({
                    success: false,
                    message: "Cannot retrieve data."
                });
            } else {
                resolve({...snapshot.val()});
            }
        })
	});
}

const optionsUpdate = (data) => {
    return new Promise(function(resolve, reject) {
		firebase.database().ref('options').set(
            data
        )
        .then(ref => {
            resolve(ref);
        })
        .catch(err => {
            reject(err);
        });
	});
}

export default {
    save,
    get,
    getAll,
    update,
    options,
    optionsUpdate
};