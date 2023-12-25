var mongoose = require("mongoose");
var Venue = mongoose.model("venue");

// Static Class olarak düşün
var converter = (function () {
  var earthRadius = 6371; // km

  var radian2Kilometer = (radian) => parseFloat(radian * earthRadius);
  var kilometer2Radian = (kilometer) => parseFloat(kilometer / earthRadius);

  return {
    radian2Kilometer,
    kilometer2Radian,
  };
})();

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const listVenues = async (req, res) => {
  var lat = parseFloat(req.query.lat); // ? ile sorguda verilen değerleri almak için query kullanılır.
  var long = parseFloat(req.query.long);

  var point = {
    type: "Point",
    coordinates: [lat, long],
  };
  var geoOptions = {
    distanceField: "dis",
    spherical: true,
  };

  try {
    const result = await Venue.aggregate([
      {
        $geoNear: {
          near: point,
          ...geoOptions,
        },
      },
    ]);

    const venues = result.map((venue) => {
      return {
        distance: converter.kilometer2Radian(venue.dis),
        name: venue.name,
        address: venue.address,
        rating: venue.rating,
        foodanddrink: venue.foodanddrink,
        id: venue._id,
      };
    });

    createResponse(res, 202, venues);
  } catch (error) {
    createResponse(res, 404, {
      status: error.toString(),
    });
  }
};

const addVenue = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

const getVenue = async (req, res) => {
  try {
    await Venue.findById(req.params.venueId)
      .exec()
      .then((venue) => {
        createResponse(res, 200, venue);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir mekan yok!" });
  }
};

const updateVenue = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

const deleteVenue = (req, res) => {
  createResponse(res, 200, { status: "Başarılı" });
};

module.exports = { listVenues, addVenue, getVenue, updateVenue, deleteVenue };
