const app=angular.module('myapp',['ngRoute']);

app.config(function($locationProvider,$routeProvider){
	$routeProvider.when('/',{
		templateUrl:'views/v1.html',
		controller:'SingleFileController'
	}).when('/multi',{
		templateUrl:'views/v2.html',
		controller:'MultipleFileController'
	}).when('/notfound',{
		templateUrl:'views/404.html',
	}).otherwise({
		redirectTo:'/notfound'
	});
	$locationProvider.html5Mode(true);
});

app.controller('SingleFileController',function($scope,$http){
	$scope.submitForm=function(){
		var form=new FormData();
		form.append('file',$scope.myfile);
		form.append('testdata',new Date());
		$http({
			url:'api/fileupload',
			method:'POST',
			headers:{
				'content-type':undefined
			},
			data:form
		}).then(function(response){
			console.log(response);
		},function(response){			
			console.log(response);
		});
	}
});
app.controller('MultipleFileController',function($scope,$http){
	$scope.submitForm=function(){
		var form=new FormData();
		form.append('files',$scope.myfile1);
		form.append('files',$scope.myfile2);
		form.append('files',$scope.myfile3);
		$http({
			url:'api/fileuploads',
			method:'POST',
			headers:{
				'content-type':undefined
			},
			data:form
		}).then(function(response){
			console.log(response);
		},function(response){			
			console.log(response);
		});
	}
});

app.directive('fileModel',  function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         });