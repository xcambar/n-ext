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
    var _prefix = 'vendor/ext/';
    
    /**
     * Defines a debug/development environment
     */
    var _debug = false;
    
    /**
     * Loads the required files
     * @param sandbox Whether Ext should be defined application-wide or returned by the function to be used locally 
     */
    this.bootstrapCore = function(sandbox) {
        require(_prefix + 'core/src/Ext.js');
        require(_prefix + 'core/src/version/Version.js');
        require(_prefix + 'core/src/lang/Array.js');
        require(_prefix + 'core/src/lang/Date.js');
        require(_prefix + 'core/src/lang/Function.js');
        require(_prefix + 'core/src/lang/Number.js');
        require(_prefix + 'core/src/lang/Object.js');
        require(_prefix + 'core/src/lang/String.js');
        require(_prefix + 'core/src/class/Base.js');
        require(_prefix + 'core/src/class/Class.js');
        require(_prefix + 'core/src/class/ClassManager.js');
        require(_prefix + 'core/src/class/Loader.js');
        //Ext.Loader may be used from here, but we still use Node.js require method to end loading the core
        require(_prefix + 'core/src/util/Format.js');
        require(_prefix + 'core/src/util/DelayedTask.js');
        require(_prefix + 'core/src/util/Event.js');
        // The latest require are not strictly mandatory, but really useful
        require(_prefix + 'core/src/util/TaskManager.js');
        require(_prefix + 'core/src/misc/JSON.js');
        
        Ext.Loader.config.enabled = true;
        Ext.Loader.setPath('Ext', _prefix);
        Ext.require = _overrideRequire(Ext.require);
        Ext.require('Ext.ModelManager');
        if (sandbox === true) {
            var _ext = Ext;
            delete(Ext);
            return _ext;
        }
    };
    
    /**
     * The method encapsulates the original Ext.require to stand the use of
     * the global object window (most probably not defined in SSJS, but used in Loader.js)
     * If window is already defined, it is cloned and restored after after the call.
     * But it is highly probable tha if window is defined, the loading will fail due to 
     * context checks in ExtJS.
     * Any data modified in window during the execution of Ext.require are logged
     * to the console for the record
     */
    var _overrideRequire = function(f) {
        return function() {
            if (typeof(window) !== 'undefined') { //Window has NO REASON to be used in SSJS...
                var _w = Ext.clone(window);
            }
            window = {};
            var res = f.apply(this, arguments);
            if (_debug) {
                console.log('window has been set/updated');
                console.log(window);
            }
            if (_w) {
                window = _w;
            } else {
                delete window;
            }
            delete _w;
            return res;
        }
    }
    
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
