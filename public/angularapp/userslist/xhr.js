angular.module( "xhrErrorTracking", [
        'ng',
        'ngResource'
    ] )
    .factory( 'xhrErrorTracking', [ '$q', function( $q ) {
        var currentResponse = false;

        return {
            response: function( response ) {
                currentResponse = response;
                return response || $q.when( response );
            },
            responseError: function( rejection ) {
                var requestDesc = currentResponse.config.method + ' ' + currentResponse.config.url;
                if ( currentResponse.config.params ) requestDesc += ' ' + JSON.stringify( currentResponse.config.params );

                console.warn( 'JSON Errors Found in XHR Response: ' + requestDesc + '\n' + JSON.stringify( currentResponse.data, null, 3 ) );

                return $q.reject( rejection );
            }
        };
    } ] )
    .config( [ '$httpProvider', function( $httpProvider ) {
        $httpProvider.interceptors.push( 'xhrErrorTracking' );
    } ] );