var getUser = (id, callback) =>{
    var user = {
        id: id,
        name: 'test'
    };

    setTimeout(()=> {
    callback(user);

    },2000);
};


getUser(31, (userObject) =>{
   printUser(userObject);
});


var printUser = (userObject) => {
    console.log(userObject);
}