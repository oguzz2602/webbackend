var express = require("express");
var router = express.Router();
var controllerVenues = require("../controllers/VenueController");
var controllerComment = require("../controllers/CommentController");

router
  .route("/venues")
  .get(controllerVenues.listVenues)
  .post(controllerVenues.addVenue);

router
  .route("/venues/:venueId")
  .get(controllerVenues.getVenue)
  .put(controllerVenues.updateVenue)
  .delete(controllerVenues.deleteVenue);

router.route("/venues/:venueId/comments").post(controllerComment.addComment);

router
  .route("/venues/:venueId/comments/:commentId")
  .get(controllerComment.getComment)
  .put(controllerComment.updateComment)
  .delete(controllerComment.deleteComment);

module.exports = router;