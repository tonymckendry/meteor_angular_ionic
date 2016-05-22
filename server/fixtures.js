if(Meteor.users.find().count() == 0){
  Accounts.createUser({
    username: 'bob',
      password: 'bob',
      profile: {
        createdOn: new Date()
      }
  })
}
