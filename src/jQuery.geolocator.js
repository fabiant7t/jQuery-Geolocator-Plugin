jQuery.geolocator = {
    _html5_geolocate: function(callback) {
        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                callback({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    altitude: pos.coords.altitude,
                    heading: pos.coords.heading,
                    speed: pos.coords.speed,
                    accuracy: pos.coords.accuracy
                });
            }, function() {
                callback({});
            }, { maximumAge: 1 });
            return true;
        } else {
            return false;
        }
    },

    _google_loader_geolocate: function(callback) {
        if((typeof google == 'object') && google.loader && google.loader.ClientLocation) {
            callback({
                latitude: google.loader.ClientLocation.latitude,
                longitude: google.loader.ClientLocation.longitude
            });
            return true;
        } else {
            return false;
        }
    },

    geolocate: function(kwargs) {
        var default_kwargs = {}
        var kwargs = jQuery.extend(default_kwargs, kwargs);

        if(!kwargs.callback || !jQuery.isFunction(kwargs.callback)) {
            alert('You need to pass a proper callback method for geocoding!');
            return false;
        }
        
        external_callback = kwargs.callback;
 
        is_located = this._html5_geolocate(this._callback);
        if(!is_located) {
            is_located = this._google_loader_geolocate(this._callback);
        }
        if(!is_located) {
            this._callback({});        
        }
    },

    _callback: function(data) {
        var default_data = {
            latitude: null,
            longitude: null,
            altitude: null,
            heading: null,
            speed: null,
            accuracy: null
        }
        data = jQuery.extend(default_data, data);
        external_callback(data);
    }
};
