'use strict';

angular.module('myApp.mobile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mobile/mobile.html', {
    templateUrl: 'mobile/mobile.html',
    controller: 'MobileCtrl'
  });
}])

.controller('MobileCtrl', [function() {
    Restangular.all('sites/').getList().then(function (data) {
        $scope.sites = data;
    });

    (function(){

        var entries = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twentyone', 'Twentytwo', 'Twentythree', 'Twentyfour', 'Twentyfive', 'Twentysix', 'Twentyseven', 'Twentyeight', 'Twentynine', 'Thirty', 'Thirtyone', 'Thirtytwo', 'Thirtythree', 'Thirtyfour', 'Thirtyfive', 'Thirtysix', 'Thirtyseven', 'Thirtyeight', 'Thirtynine', 'Forty', 'Fortyone', 'Fortytwo', 'Fortythree', 'Fortyfour', 'Fortyfive', 'Fortysix', 'Fortyseven', 'Fortyeight', 'Fortynine', 'Fifty', 'Fiftyone', 'Fiftytwo', 'Fiftythree', 'Fiftyfour', 'Fiftyfive', 'Fiftysix', 'Fiftyseven', 'Fiftyeight', 'Fiftynine', 'Sixty', 'Sixtyone', 'Sixtytwo', 'Sixtythree', 'Sixtyfour', 'Sixtyfive', 'Sixtysix', 'Sixtyseven', 'Sixtyeight', 'Sixtynine', 'Seventy', 'Seventyone', 'Seventytwo', 'Seventythree', 'Seventyfour', 'Seventyfive', 'Seventysix', 'Seventyseven', 'Seventyeight', 'Seventynine', 'Eighty', 'Eightyone', 'Eightytwo', 'Eightythree', 'Eightyfour', 'Eightyfive', 'Eightysix', 'Eightyseven', 'Eightyeight', 'Eightynine', 'Ninety', 'Ninetyone', 'Ninetytwo', 'Ninetythree', 'Ninetyfour', 'Ninetyfive', 'Ninetysix', 'Ninetyseven', 'Ninetyeight', 'Ninetynine'];


            // Keep the list height in sync with the window height
            window.addEventListener( 'orientationchange', updateHeight, false );
            window.addEventListener( 'resize', updateHeight, false );

            var IS_ANDROID = navigator.userAgent.match( /android/gi ),
                IS_IPHONE = navigator.userAgent.match( /iphone/gi );

            var exampleList = document.querySelector( '.example-list' ),
                effectsList = document.querySelector( '.settings .effects' ),
                settingsToggle = document.querySelector( '.settings-toggle' ),
                settingsPanel = document.querySelector( '.settings' );

            var html = '';

				// Unfortunately all devices aren't capable of running very long lists
				// so let's adapt in favor of smooth animations
            if( IS_ANDROID ) entries.length = 30;
            if( IS_IPHONE ) entries.length = 60;

            for( var i = 0, len = entries.length; i < len; i++ ) {
					// The cache class is applied as an attempt to force Android to run
					// all list items through the GPU at start to avoid lag later
                var attributes = IS_ANDROID ? 'class="cache"' : '';

                html += '<li ' + attributes + '>'+ entries[i] +'</li>';
            }

            exampleList.innerHTML = html;

            if( IS_ANDROID ) {
                document.body.classList.add( 'android' );

                var exampleElements = exampleList.querySelectorAll( 'li' );

                for( var i = 0, len = exampleElements.length; i < len; i++ ) {
                    exampleElements[i].classList.remove( 'cache' );
                }
            }

            // Set the default effect
            changeEffect( 'curl' );

            // Run an initial height update
            updateHeight();

            // Toggle the appearance of the settings panel when the
            // button is tapped
            settingsToggle.addEventListener( 'touchstart', function( event ) {
                if( /open/gi.test( document.body.className ) ) {
                    document.body.classList.remove( 'opened' );
                }
                else {
                    document.body.classList.add( 'opened' );

                    stroll.bind( effectsList );
                }
            }, false );

            // Monitors clicks on effect types in the settings panel
            effectsList.addEventListener( 'touchend', function( event ) {
                // TODO Figure out a cleaner way to prevent propagation from
                // within stroll.js
                setTimeout( function() {
                    if( !event.defaultPrevented ) {
                        if( event.target && event.target.nodeName.toLowerCase() === 'li' ) {
                            changeEffect( event.target.className );

                            // Close the settings panel
                            document.body.classList.remove( 'opened' );
                        }
                    }
                }, 0 );
            }, false );

            /**
             * Changes to a new type of effect style, this also updates
             * the settings UI to highlight the correct style.
             *
             * @param {String} type The name of the effect to apply
             */
            function changeEffect( type ) {
                var previousSelector = document.querySelector( '.settings .effects .' + exampleList.className ),
                    currentSelector = document.querySelector( '.settings .effects .' + type );

                exampleList.className = type;

                if( previousSelector ) {
                    previousSelector.classList.remove( 'active' );
                }

                if( currentSelector ) {
                    currentSelector.classList.add( 'active' );
                }
            }

            /**
             * Updates the list height to match the window height for
             * the demo. Also re-binds the list with stroll.js.
             */
            function updateHeight() {
                exampleList.style.height = window.innerHeight + 'px';
                effectsList.style.height = ( window.innerHeight - effectsList.offsetTop ) + 'px';

                stroll.bind( 'ul' );
            }

        })();
}]);