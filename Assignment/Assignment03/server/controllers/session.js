const Session = require("../models/Session");

exports.getRoom = (req, res, next) => {
  const id = req.params.id;
  Session.findById(id).then((session) => {
    if (
      session.customerCreated.toString() === req.seesion.user._id.toString()
    ) {
      return res.send(session);
    } else {
      return res.status(401).send({ message: "Access Denied!" });
    }
  });
};

exports.createRoomChat = (req, res, next) => {
  const content = req.body.content;
  User.findById(req.seesion.user._id).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "Unauthorized!" });
    } else {
      const seesion = new Session({
        customerCreated: user._id,
        streamData: [{ createAt: new Date(), content, user: user._id }],
      });
      seesion.save().then((result) => {
        return res.send({ message: "Created Room!", session: result });
      });
    }
  });
};

exports.pushMessage = (req, res, next) => {
  const id = req.params.id;
  const content = req.body.content;

  Session.findById(id).then((session) => {
    if (
      session.customerCreated.toString() === req.seesion.user._id.toString()
    ) {
      return session
        .pushMessage(content, req.seesion.user._id.toString())
        .then((result) => {
          return res.send(result);
        });
    } else {
      return res.status(401).send({ message: "Access Denied!" });
    }
  });
};
