module.exports = {
  doNestedUpdate: function(id) {
    User.findOne(id)
        .populate('hats')
        .then(function (user) {
            console.log('the user!', user);
            if (!user.hats) return Promise.reject(new Error('no hats for this user: ' + JSON.stringify(user)));

            user.hats.forEach(function(hat) {
                console.log('hat?', hat);
                hat.type += 'ryan';
                console.log('updated hat?', hat);
            });

            console.log('user.hats?', user.hats);
            return user.save();

        });
  }
};
