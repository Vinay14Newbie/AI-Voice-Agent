import {
  checkAvailabilityService,
  bookAppointmentService,
  cancelAppointmentService,
  rescheduleAppointmentService,
} from "../services/appointmentService.js";

export async function getAvailabilityController(req, res) {
  const { doctorId, date } = req.query;

  const result = await checkAvailabilityService(doctorId, date);

  res.json(result);
}

export async function bookController(req, res) {
  const { patientId, doctorId, date, time } = req.body;

  const result = await bookAppointmentService(patientId, doctorId, date, time);

  res.json(result);
}

export async function cancelController(req, res) {
  const { appointmentId } = req.body;

  const result = await cancelAppointmentService(appointmentId);

  res.json(result);
}

export async function rescheduleController(req, res) {
  const { appointmentId, date, time } = req.body;

  const result = await rescheduleAppointmentService(appointmentId, date, time);

  res.json(result);
}
