# Airline itinerary example

## Technologies used
* [IOJS (A fork of NodeJS)](https://iojs.org)
* [Express](http://expressjs.com/)
* [Jade](http://jade-lang.com/)
* [bower](http://bower.io/)
  * [Twitter Bootstrap](http://getbootstrap.com/)
  * [knockout](http://knockoutjs.com/)
  * [moment](http://momentjs.com/)
  * [components-font-awesome](https://github.com/components/font-awesome)
  * [seiyria-bootstrap-slider](https://github.com/seiyria/bootstrap-slider)


## Instructions to run the code
UI dependencies are not stored in the github repo. So they need to be installed after code is downloaded. Also its recommended to use a virtual manager for nodejs installation(like [nvm](https://github.com/creationix/nvm)).

### Steps
* Install "iojs-v1.7.x". Using nvm it can be done with this command:
```shell
nvm install iojs-v1.7.1
```
* Install npm package "bower"
```shell
npm install -g bower
```
* Download the source code, get into source root directory and set default nvm version
```shell
git clone git@github.com:touchps/js-examples.git
cd js-examples/knockout/airline
nvm use
```
nvm use command picks up the .nvmrc file and sets the nodejs version.

* Install all the node and bower packages
```shell
npm install
```
Since scripts section contains a post install bower command, it will install bower dependencies as well
* Start the app
```shell
npm start
```

## Demo
[Link](https://salty-bayou-5292.herokuapp.com/)
