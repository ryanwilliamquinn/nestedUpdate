var Promise = require('bluebird');

module.exports = {
  doNestedUpdate: function(id) {
    User.findOne(id)
      .populate('hats')
      .then(function(user) {
        console.log('the user!', user);
        if (!user.hats) return Promise.reject(new Error('no hats for this user: ' + JSON.stringify(user)));

        Promise.each(user.hats, function(hat) {
            if (hat.type === 'sombrero') {
              console.log('in here?', hat.id);
              user.hats.remove(hat.id);
              console.log('after removing?', user.hats);
              user.hats.add({
                type: 'safari'
              });
            } else {
              hat.type = 'used ' + hat.type;
              return hat.save();
            }
          })
          .then(function() {

            console.log('user.hats?', user.hats);
            return user.save()
              .then(function(data) {
                console.log('after saving', data);
              });

          });
      });
  }
};
