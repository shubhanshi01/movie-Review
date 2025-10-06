import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDao {
  // Inject DB connection
  static async injectDb(conn) {
    if (reviews) return;
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in ReviewsDao: ${e}`);
    }
  }

  // Add a new review
  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: parseInt(movieId),
        user,
        review,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // Get a review by Mongo _id
  static async getReview(reviewID) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewID) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  // Update a review by Mongo _id
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { user, review } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // Delete a review by Mongo _id
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({ _id: new ObjectId(reviewId) });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  // Get all reviews for a specific movieId
  static async getReviewByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get review by movieId: ${e}`);
      return { error: e };
    }
  }

  // Get all reviews
  static async getAllReviews() {
    try {
      return await reviews.find({}).toArray();
    } catch (e) {
      console.error(`Unable to get all reviews: ${e}`);
      return { error: e };
    }
  }
}
