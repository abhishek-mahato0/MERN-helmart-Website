const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  img: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Offers = mongoose.model('Offer', offerSchema);
module.exports = Offers;
