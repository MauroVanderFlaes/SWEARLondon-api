module.exports.go = (primus) => {
  primus.on("connection", (spark) => {
    spark.on("data", (data) => {
      // Handle data from the client
      if (data.action === "newOrder") {
        // Broadcast the data to all connected clients
        primus.write(data);
      }

      if (data.action === "updateStatus") {
        // Broadcast the data to all connected clients
        primus.write(data);
      }
    });
  });
};
