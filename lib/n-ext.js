/**
 * Provides the loading of Ext Core
 * We do NOT load ext-core.js nor ext-core-debug.js nor ext-core-dev.js
 * because the modules included make use of navigator and window,
 * and we want the most minimalistic portion of Ext possible
 */
var nExtLoader = function() {
    /**
     * In which path are the sources located ?
     * @type string
     */
    var _prefix = 'Ext-src/';
    
    /**
     * Defines a debug/development environment
     */
    var _debug = false;
    
    /**
     * Loads the required files
     * @param sandbox Whether Ext should be defined application-wide or returned by the function to be used locally 
     */
    this.bootstrapCore = function(sandbox) {
        require(_prefix + 'src/Ext.js');
        require(_prefix + 'src/version/Version.js');
        require(_prefix + 'src/lang/Array.js');
        require(_prefix + 'src/lang/Date.js');
        require(_prefix + 'src/lang/Function.js');
        require(_prefix + 'src/lang/Number.js');
        require(_prefix + 'src/lang/Object.js');
        require(_prefix + 'src/lang/String.js');
        require(_prefix + 'src/class/Base.js');
        require(_prefix + 'src/class/Class.js');
        require(_prefix + 'src/class/ClassManager.js');
        require(_prefix + 'src/class/Loader.js');
        //Ext.Loader may be used from here, but we still use Node.js require method to end loading the core
        require(_prefix + 'src/util/Format.js');
        require(_prefix + 'src/util/DelayedTask.js');
        require(_prefix + 'src/util/Event.js');
        // The latest require are not strictly mandatory, but really useful
        require(_prefix + 'src/util/TaskManager.js');
        require(_prefix + 'src/misc/JSON.js');
        require(_prefix + 'src/Ext-more.js');
        
        Ext.Loader.config.enabled = true;
        Ext.Loader.setPath('Ext', _prefix + '/../Ext/src'); //@TODO Fix the crappy loader hack
        global.__defineGetter__('window', function() {
            return {};
        });
        Ext.require('Ext.ModelManager');
        Ext.require('Ext.data.Store');
        if (sandbox === true) {
            var _ext = Ext;
            delete(Ext);
            return _ext;
        }
    };
    
    /**
     * Defines where the Ext lirary is located in the file structure
     */
    this.setPath = function(_p) {
        _prefix = _p;
    }
    
    /**
     * Defines the debug/development environment
     */
    this.setDebug = function(value) {
        _debug = value;
    }
};

module.exports = new nExtLoader();
