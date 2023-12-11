module.exports.go = (primus) => {
  primus.on("connection", (spark) => {
    console.log("WebSocket connected");

    spark.on("data", (data) => {
      // Handle data from the client
      console.log("Received data from client:", data);
      primus.write(data);
    });
  });
};
