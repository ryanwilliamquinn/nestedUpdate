var Promise = require('bluebird');
var _ = require("lodash");

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
              return Promise.reject("Pick an option (UserService.js) then delete me.");

              /* Option A - doesn't persist */
              //hat = {
              //  "type": "old " + hat.type
              //};

              /* Option B - throws */
              //hat = {
              //  "type": "old " + hat.type
              //};
              //return hat.save();

              /* Option C - won't unset unprovided keys */
              //var newHat = {
              //  "type": "fedora"
              //};
              //hat = _.assign(hat, newHat);
              //return hat.save();

              /* Option D - also won't unset unprovided keys */
              //var newHat = {
              //  "type": "fedora"
              //};
              //_.forOwn(newHat, function(value, key) {
              //  if(_.has(hat, key)) {
              //    hat[key] = value;
              //  }
              //  else {
              //    delete hat[key];
              //  }
              //});
              //return hat.save();
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
