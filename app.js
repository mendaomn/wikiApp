(function() {
  var app = angular.module( "WikiApp", []);

  app.config([ "$httpProvider", function( $httpProvider ) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common[ "X-Requested-With" ];
    }
  ]);

  app.controller( "WikiSearchCtrl", [ "$scope", "$http", function( $scope, $http ) {

    mostraRisultati();

    $scope.onSubmit = mostraRisultati;

    function mostraRisultati() {

      getData( $scope.searchText || "niente").then(function( dati ) {
        var risultati = [];
        var len = dati[ 1 ].length;

        for ( var i = 0; i < len; i++ ) {
          risultati[ i ] = {
            nome: dati[ 1 ][ i ],
            descrizione: dati[ 2 ][ i ],
            link: dati[ 3 ][ i ]
          };
        }

        $scope.risultati = risultati;
      });

    };

    function getData( stringa ) {
      return $http.jsonp( "http://it.wikipedia.org/w/api.php?search=" + stringa + "&rawcontinue=true&action=opensearch&format=json&prop=extracts&callback=JSON_CALLBACK" ).then(function( dati ) {
        return dati.data;
      });
    }

  } ]);

}() );
