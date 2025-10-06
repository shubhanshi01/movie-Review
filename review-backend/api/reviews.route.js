import express from "express";
import ReviewsCntrl from "./reviews.Contoller.js";

const router = express.Router();

// Correct endpoint: /api/v1/reviews/movies/:id
router.route("/movies/:id").get(ReviewsCntrl.apiGetReviews);

router.route("/new").post(ReviewsCntrl.apiPostReview);

router.route("/:id")
  .get(ReviewsCntrl.apiGetReviews)
  .put(ReviewsCntrl.apiUpdateReviews)
  .delete(ReviewsCntrl.apiDeleteReviews);

export default router;
