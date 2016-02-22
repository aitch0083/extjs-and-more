var app = angular.module('CitiBank', ['ngSanitize']),
    JSON_CALL = function(){};

//Setup global parameters
app.run(function($rootScope) {
     $rootScope.startTimestamp = moment().format('YYYY-M-DD H:m:s');
   })
   .constant('INFO', {
	   	'AITHOR'  : 'Aitch Zung',
	   	'EMAIL'   : 'aitch0083@gmail.com',
	   	'VERSION' : '1.0.0',
	   	'DESCRIPTION' : 'This app is the demo for Citi Bank interview.'
   })
   .constant('SETTINGS', {
	   	title : 'Currecy Exchange',
	   	amountLabel : 'Amount',
	   	exchangeLabel : 'Exchange',
	   	newsLabel : 'News',
	   	newsRefreshInterval : 10000,
	   	currencyRefreshInterval : 2000
   })
   .value('availableCurrencyList', [
   		{ from:'USD', to: 'JPY', bid:1, sell:1 },
   		{ from:'AUD', to: 'JPY', bid:1, sell:1 },
   		{ from:'EUR', to: 'CAD', bid:1, sell:1 },
   		{ from:'USD', to: 'CNY', bid:1, sell:1 },
   		{ from:'CAD', to: 'CNY', bid:1, sell:1 },
   		{ from:'GBP', to: 'USD', bid:1, sell:1 }
   ])
   .service('getTheCurrencies', function(availableCurrencyList){
   		this.cal = function(){
	   		//Init currenct list
		    var randomBase = 0,
		        minorDiff = 0;

		    _.each(availableCurrencyList, function(value, index){
		    	randomBase = 20 * Math.random() + 1;
		    	minorDiff = Math.random();
		    	value.bid = Math.round10(randomBase, -4);
		    	value.sell = Math.round10(value.bid + minorDiff, -4);
		    });
		};
   })
   .service('getRssFeed', function(){
   		this.get = function($http ,cb, url){
   			console.info(cb);
   			url = url || 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=https://news.google.com/?output=rss&callback=JSON_CALL';
   			JSON_CALL = cb;
   			$http.jsonp(url);
   		};
   });

/**
 * Directives
 */
//Top menu
app.directive('topMenu', function(){
	return {
       restrict: 'EA',
       scope: { 
       		commander : '=',
       		config    : '='
       },
       templateUrl:'/templates/top-menu.html'
    }
});
//Main body
app.directive('mainContainer', function(){
	return {
       restrict: 'EA',
       scope: { 
       		commander : '=',
       		config    : '=',
       		models    : '='
       },
       templateUrl:'/templates/main.html'
    }
});
//News body
app.directive('newsContainer', function(){
	return {
       restrict: 'EA',
       scope: { 
       		commander : '=',
       		config    : '=',
       		models    : '='
       },
       templateUrl:'/templates/news.html'
    }
});
//Attribute, number-only input
app.directive('numberOnly', function () {
	return {
		require: 'ngModel',
		link: function (scope) {	
			scope.$watch('models.userInputAmount', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.models.userInputAmount = oldValue;
                }
            });
		}
	};
});

//Attribute, set focus on input
app.directive('focusItem', function() {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusItem, function() {
            element[0].focus();
      });
    }
  };
});

/**
 * Entry point
 */
app.controller('MainCtrl', 
	function($rootScope, $scope, $http, $interval,
			 INFO, SETTINGS, availableCurrencyList, getTheCurrencies, getRssFeed){

		console.info('App started @ ' + $rootScope.startTimestamp);
		console.info('App Info: ', INFO);

		var parseReeFeed = function(data){
			$scope.models.rssFeed = data.responseData.feed.entries;
		};

		$scope.stage = '/views/main.html';

		$scope.models = {
			userInputAmount : 0,
			availableCurrencyList : availableCurrencyList,
			transactionList : [],
			rssFeed : [],
			targetNews : {
				title : '',
				content : ''
			}
		}

		$scope.commander = {
			menuBtnAction : function(cmd){
				$scope.stage = '/views/' + cmd + '.html';

				if(cmd === 'news'){
					getRssFeed.get($http, parseReeFeed);
				}
			},
			bidSell : function(cmd, extRec){
				console.info(cmd, extRec, $scope.models.userInputAmount);

				$scope.models.transactionList.push({
					cmd : cmd, 
					currencies : extRec.from + '/' + extRec.to,
					price      : extRec[cmd],
					datetime   : moment().format('YYYY-M-DD H:m:s'),
					amount     : $scope.models.userInputAmount,
					sum        : Math.round10($scope.models.userInputAmount * extRec[cmd], -4)
				});

				$scope.models.userInputAmount = 0;
				jQuery('input#amountTxt').focus();
			},
			removeRecord : function($index, record){
				if(confirm('Are you sure that you want to remove the history for ['+ record.currencies + record.sum +']?')){
					$scope.models.transactionList.splice($index, 1);
				}
			},
			removeAllRecords : function(){
				if(!$scope.models.transactionList.length){
					return;
				}
				if(confirm('There are ' + $scope.models.transactionList.length + ' records. Are you sure?')){
					$scope.models.transactionList = [];
				}
			},
			showNews : function(newsRecord){
				console.info(newsRecord);
				$scope.models.targetNews = newsRecord;
				jQuery('div.news-modal').modal('show');
			}
		};

		$scope.config = SETTINGS;

		$scope.$watch('models.userInputAmount', function (newValue, oldValue) {
	        var amount = Math.abs(parseFloat(newValue));

	        if(!isNaN(amount)){
	        	$scope.models.userInputAmount = amount;
	        }
	    });

	    getTheCurrencies.cal();

	    $interval(function(){
	    	if($scope.stage.indexOf('main') > 0){
				getTheCurrencies.cal();	    		
	    	}
	    }, SETTINGS.currencyRefreshInterval);

	    $interval(function(){
	    	if($scope.stage.indexOf('news') > 0){
	    		getRssFeed.get($http, parseReeFeed);
	    	}
	    }, SETTINGS.newsRefreshInterval);

	}//eo MainCtrl
);

