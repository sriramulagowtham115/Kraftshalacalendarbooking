const service = require("../service/meeting.service");

async function create(req, res, next) {
  try {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const meetings = await service.getMeetings(req.query);
    res.status(200).json(meetings);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const meeting = await service.getMeetingById(req.params.id);
    res.status(200).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const meeting = await service.updateMeeting(req.params.id, req.body);
    res.status(200).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await service.deleteMeeting(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
