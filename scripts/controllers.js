'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope','menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.dishes = menuFactory.getDishes();
            
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])

        .controller('FeedbackController', ['$scope', function($scope) {
                        $scope.sendFeedback = function() {
                                console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])


        .controller('DishDetailController', ['$scope', '$stateParams','menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.commentFormObj = {yourName : "",
            comments : "",
            rating :5}
            
           
            $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));
            $scope.setRating = function(rate){
              $scope.commentFormObj.rating = rate;
            }
            
            $scope.sendComment = function() { 
                dish.comments.push({rating:$scope.rating,
                    comment: $scope.commentFormObj.comments,
                    author: $scope.commentFormObj.yourName,
                    date:new Date() });
                    $scope.commentFormObj.yourName = "";
                    $scope.commentFormObj.comments = "";
                    $scope.commentFormObj.rating =5;
                    $scope.commentForm.$setPristine();
            }
            
        }])

;
