const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    news: String,
    userName: String,
    prediction: String,
    dataset: String,
    model: String,
    accuracy: String,
  },
  { timestamps: true }
);

// Custom formatting for createdAt and updatedAt
// newsSchema.set('toJSON', {
//   transform: function (doc, ret) {
//     if (ret.createdAt) {
//       ret.createdAt = ret.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Format createdAt in IST
//     }
//     if (ret.updatedAt) {
//       ret.updatedAt = ret.updatedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Format updatedAt in IST
//     }
//     return ret;
//   }
// });

const userNews = mongoose.model("news", newsSchema);

module.exports = userNews;
