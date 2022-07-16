exports.me = (req, res) => {
  res.send({ cool: "nice" });
};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.upload = (req, res) => {
  res.send(req.user);
  //   res.send(req.cool);
};
