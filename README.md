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


# How to run local
```
# install dependencies
bundle install

# create the database
rails db:create
rails db:migrate

# run the server
./bin/dev
```