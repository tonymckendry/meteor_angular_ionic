if(Meteor.users.find().count() <= 1){
  Accounts.createUser({
    username: 'bob',
      password: 'bob',
      profile: {
        createdOn: new Date()
      }
  })
}
