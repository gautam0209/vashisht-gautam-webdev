(function (){
    angular
        .module('WebAppProj')
        .controller('adminReviewController',adminReviewController);

    function adminReviewController(userService,
                             movieService,
                                   $location,
                             currentUser) {

        var model = this;
        model.currentUser = currentUser;
        model.deleteReview = deleteReview;
        model.putProfileTrace = putProfileTrace;
        model.movies = [];
        model.users = [];

        function init() {
            findAllReviews();
        }

        init();

        function putProfileTrace()
        {
            userService
                .putProfileTrace('admin_reviews');
            $location.url('/profile');
        }

        function deleteReview(userId, reviewId)
        {
            movieService.deleteReview(userId, reviewId)
                .then(function(){
                    init();
                });

        }


        function findAllReviews()
        {
            movieService.findAllReviews()
                .then(function (reviews) {
                        model.reviews = reviews;
                });
        }

    }
})();