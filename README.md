# What is N-Ext ?

**N-Ext** is the compression of [*Node*](http://nodejs.org) and [*Ext*](http://www.sencha.com/products/extjs/).
Its purpose is to allow developpers to use the ExtJS 4 Javascript framework in a server-side environment using Node.js.

## Features

The project provides:

* Ext.core without the client-side-specific parts
* The [Dynamic class loading package](http://www.sencha.com/blog/countdown-to-ext-js-4-dynamic-loading-and-new-class-system)
* Ext.data package
* Provides a proxy for MongoDB that can be used with the classes from Ext.data. The proxy uses the excellent [node-mongodb-native](https://github.com/christkv/node-mongodb-native) adapter
* Examples available
* A developer who is all-ears to requests and comments!

## How to use it

Note: 
* *N-Ext* can not (as of now) use packaged version of ExtJS.
It provides a minimal subset of ExtJS in which the DOM-specific code has been removed.
* The only requirement to have N-Ext workin is the module contained in the ```node_modules``` folder.
  The ```lib``` folder contains the whole Ext package and the MongoDB proxy and store.

###Set up N-Ext:

1. Download the latest version of [ExtJS 4](http://www.sencha.com/products/extjs/)
2. Unzip the ```src``` folder in ```%PROJECT_ROOT%/lib/Ext``` (this can be changed with a single line of code)
3. In the main file (it can be any file) of your application, type the following:

    ```javascript
    var sencha = require('n-ext');
    sencha.bootstrapCore();
    ```

And that's it! You now have the beloved ```Ext``` namespace available application-wide.

##Documentation

A little (but growing) documentation is available at the [Wiki](https://github.com/xcambar/n-ext/wiki).

##FAQ

* What is the point of the project ?

Fun! Seriously, there is of course a *serious* reason to that (although fun is a big part of the game).
The point is that with ExtJS (which I love), client-side coding carries its share of the model, of the application,
and I was bored to have to code two equivalent models in both the server and the model, but with 2 different languages.
It meant twice the amount of coding, more than twice the amount of unit testing and a world of troubles.

So I plunged into Node.js and started coding N-Ext, hoping to have a consistent framework to work on and with throughout the apps I developed.

* Why does the ```Ext``` namespace have to be global to the app ?

I agree this is counter-intuitive in regards to the [CommonJS](http://www.commonjs.org/) conventions, but this is a
limitation due to the way the Ext namespace is constructed and its packages are self- and inter-referencing through the namespace.
I've worked a little on sandboxing the Ext namespace and having it in the exports variable of the module, but to no avail yet.

On the other hand, the package is supposed to be used throughout the whole app, so I'm still wondering whether it is
absolutely required or just more normative.

## License

N-ext is released under the MIT license.
ExtJS 4 is dual-licensed: GPL and commercial license.

See the ```LICENSE``` File for details. Head to [sencha.com](http://sencha.com) for greater details about the license of RxtJD

##Contact
* Xavier Cambar
 * Directly on GitHub
 * Mail : xavier.cambar@gmail.com
 * Twitter: [@xcambar](http://twitter.com/#!/xcambar)