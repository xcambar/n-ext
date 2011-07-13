# What is N-Ext ?

**N-Ext** is the compression of *Node* and *Ext*.
Its purpose is to allow developpers to use the ExtJS4 in a server-side environment using Node.js

The project is at its early stages of development, and features only a very small subset of what it is supposed to do once ready.

## Features
* Brings Ext.core without the client-side-specific parts
* Brings the [dynamic class loading package](http://www.sencha.com/blog/countdown-to-ext-js-4-dynamic-loading-and-new-class-system)
* Brings Ext.data package (no adapters available yet. **Coming soon**)

## How to use it

*N-Ext* can not (as of now) use any packaged version of Ext, it fetches the required files directly from the source.
The reason is simple: Although the decoupling and the separation of concerns in ExtJS is getting better and better through major revisions, its core has yet references to client-side specific code which we don't want to run.

That's why when using N-Ext in your application, you must set as the source path the folder in which is the file Ext.js, and not any of the ext-core*.js or ext-all*.js, to avoid as much as possible the execution od client-side specific code.

Here's how it goes:

```javascript
var loader = require('n-ext'); // Lad the module and store it in a variable
loader.setPath(__dirname + '/vendor/Ext/src/'); // Indicates the path to the ExtJS source files
loader.bootstrapCore();
```

And that's it! You now have the Ext object available application-wide.


If you're not confident in having Ext available app-wide, just type the following instead

```javascript
var _e = loader.bootstrapCore(true);
```
Doing this, you get a version of Ext that is only available within the scope in which loader.bootstrapCode() has been called. 

It's up to you. Play it global or local, you choose, you still have all the power of ExtJS4 server-side.

##FAQ

None yet, as the project has just started. Feel free to contact me (see below), I'll be glad to answer you.

## License
See the ```LICENSE``` File

##Contact
* Xavier Cambar
 * Directly on GitHub
 * Mail : xavier.cambar@lecoffre.net
 * Twitter: (@xcambar)[http://twitter.com/#!/xcambar]