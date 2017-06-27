(function (){
    angular
        .module('WebAppProj')
        .controller('adminReviewController',adminReviewController);

    function adminReviewController(userService,
                             movieService,
                             currentUser) {

        var model = this;
        model.currentUser = currentUser;
        model.deleteReview = deleteReview;
        model.movies = [];
        model.users = [];

        function init() {
            findAllReviews();
        }

        init();

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