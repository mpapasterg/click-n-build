import mongoose from "mongoose";

export default defineNitroPlugin((nitro) => {
  // Connect to the database
  mongoose.connect("mongodb://root:root@mongodb:27017/", {
    autoIndex: false,
    dbName: "click-n-build",
  });
});
