const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function hasConflict({ userId, startTime, endTime, excludeId }) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

async function createMeeting(data) {
  const { userId, title, startTime, endTime } = data;

  if (!userId || !title || !startTime || !endTime) {
    throw { status: 400, message: "All fields are required" };
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw { status: 400, message: "startTime must be before endTime" };
  }

  const conflict = await hasConflict(data);
  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  return Meeting.create(data);
}

async function getMeetings(query) {
  const { userId, startDate, endDate } = query;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (startDate && endDate) {
    where.startTime = {
      [Op.gte]: new Date(startDate),
    };
    where.endTime = {
      [Op.lte]: new Date(endDate),
    };
  }

  return Meeting.findAll({ where });
}

async function getMeetingById(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }
  return meeting;
}

async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }

  if (new Date(data.startTime) >= new Date(data.endTime)) {
    throw { status: 400, message: "startTime must be before endTime" };
  }

  const conflict = await hasConflict({
    ...data,
    excludeId: id,
  });

  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  return meeting.update(data);
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }

  await meeting.destroy();
}

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
