import { use } from "react"
import ReviewsDao from "../dao/reviewsDao.js"

export default class ReviewsCntrl{
    static async apiPostReview(req,res,next){
        try{
            const movieId=req.body.movieId
            const review=req.body.review
            const user=req.body.user

            const reviewResponse=await ReviewsDao.addReview(
                movieId,
                user,
                review
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({
                error:e.message
            })
        }

    }
    static async apiGetReviews(req,res){
         try {
      const id = req.params.id;
      let reviews;

      if (id) {
        // if id is a movieId
        reviews = await ReviewsDao.getReviewByMovieId(id);
      } else {
        reviews = await ReviewsDao.getAllReviews();
      }

      if (!reviews || reviews.length === 0) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
    static async apiDeleteReviews(req, res, next) {
    try {
        const reviewId = req.params.id; // ✅ Correct
        const reviewResponse = await ReviewsDao.deleteReview(reviewId);

        if (reviewResponse.error) {
            return res.status(400).json({ error: reviewResponse.error.message || reviewResponse.error.toString() });
        }

        if (reviewResponse.deletedCount === 0) {
            return res.status(404).json({ error: "No review found with that ID" });
        }

        res.json({ status: "success" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

    static async apiUpdateReviews(req, res, next) {
    try {
        const reviewId = req.params.id;
        const { review, user } = req.body;

        const reviewResponse = await ReviewsDao.updateReview(reviewId, user, review);

        // Handle DAO errors properly
        if (reviewResponse.error) {
            return res.status(400).json({ 
                error: reviewResponse.error.message || reviewResponse.error.toString() 
            });
        }

        // Handle case when nothing was updated
        if (reviewResponse.modifiedCount === 0) {
            return res.status(404).json({ 
                error: "Unable to update review: no matching review found" 
            });
        }

        // Success
        res.json({ status: "success" });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

     
}