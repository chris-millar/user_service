# User Service
This is a service that maintains users. It exposes both a React UI and APIs for interacting with the users. 

For the moment the app just serves a simple HelloWorld page defined from the 
following [tutorial](https://www.shakacode.com/react-on-rails/docs/guides/tutorial/). 
This helped get react working from being served from a rails server.

# Tools
These are defined in the [asdf](https://asdf-vm.com/) `.tool-versions` file. Asdf is a tool that allows for 
multiple versions of a given tool (coding language in our case) to be used on a single machine. It is not required. 
- Ruby: 3.3.1
- Nodejs: 22.5.1


# Setup
```
# install dependencies
bundle install

npm install

# create the database
rails db:create
rails db:migrate
```

# Run tests
```
rspec
```

# Run local
```
# run the api/web host server
./bin/dev

# run the vite dev server
bin/vite dev
```


Todo:
- [x] get app started with react served
- [x] add User model
- [x] add show endpoint
- [x] Handle errors in UsersController#show
- [x] add FactoryBot for testing
- [x] Implement UsersController#index
- [x] Implement date created range filter for UsersController#index
- [x] Implement profession filter for UsersController#index
- [ ] decide on custom endpoint + implement
- [x] write import script (or do this as the other endpoint?)
- [ ] UX: create User component
- [ ] UX: create list view of Users
- [ ] UX: create filter for date range
- [ ] UX: create profession filter
- [ ] UX: for custom endpoint(s)
- [ ] reproducible deployment
- [ ] document API
- [ ] document learnings/feedback