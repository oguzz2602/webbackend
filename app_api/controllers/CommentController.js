var mongoose = require("mongoose");
var Venue = mongoose.model("venue");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const addComment = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

const getComment = async (req, res) => {
  try {
    await Venue.findById(req.params.venueId)
      .select("name comments")
      .exec()
      .then((venue) => {
        var response, comment;

        if (!venue) {
          createResponse(res, 404, { status: "venueId bulunamadı!" });
        } else if (venue.comments && venue.comments.length > 0) {
          comment = venue.comments.id(req.params.commentId);

          if (!comment) {
            createResponse(res, 404, { status: "commentId bulunamadı!" });
          } else {
            response = {
              venue: {
                name: venue.name,
                id: req.params.venueId,
              },
              comment: comment,
            };
            createResponse(res, 202, response);
          }
        } else {
          createResponse(res, 404, { status: "Hiç yorum yok" });
        }
      });
  } catch (error) {
    createResponse(res, 404, { status: "Mekan bulunamadı!" });
  }
};

const updateComment = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

const deleteComment = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

module.exports = { addComment, getComment, updateComment, deleteComment };
