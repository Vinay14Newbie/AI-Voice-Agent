import pool from "../config/dbConfig.js";

export async function checkAvailabilityService(doctorId, date) {
  const result = await pool.query(
    `SELECT available_slots 
     FROM doctor_schedule 
     WHERE doctor_id = $1 AND date = $2`,
    [doctorId, date],
  );

  if (result.rows.length === 0) {
    return { available: false, slots: [] };
  }

  return {
    available: true,
    slots: result.rows[0].available_slots,
  };
}

export async function bookAppointmentService(patientId, doctorId, date, time) {
  // check if slot already booked
  const conflict = await pool.query(
    `SELECT * FROM appointments 
     WHERE doctor_id=$1 AND date=$2 AND time=$3`,
    [doctorId, date, time],
  );

  if (conflict.rows.length > 0) {
    return { success: false, message: "Slot already booked" };
  }

  const result = await pool.query(
    `INSERT INTO appointments 
     (patient_id, doctor_id, date, time, status)
     VALUES ($1,$2,$3,$4,'booked')
     RETURNING *`,
    [patientId, doctorId, date, time],
  );

  return { success: true, appointment: result.rows[0] };
}

export async function cancelAppointmentService(appointmentId) {
  const result = await pool.query(
    `UPDATE appointments
     SET status='cancelled'
     WHERE id=$1
     RETURNING *`,
    [appointmentId],
  );

  if (result.rows.length === 0) {
    return { success: false, message: "Appointment not found" };
  }

  return { success: true, appointment: result.rows[0] };
}

export async function rescheduleAppointmentService(id, newDate, newTime) {
  const conflict = await pool.query(
    `SELECT * FROM appointments
     WHERE date=$1 AND time=$2`,
    [newDate, newTime],
  );

  if (conflict.rows.length > 0) {
    return { success: false, message: "Slot unavailable" };
  }

  const result = await pool.query(
    `UPDATE appointments
     SET date=$1, time=$2
     WHERE id=$3
     RETURNING *`,
    [newDate, newTime, id],
  );

  return { success: true, appointment: result.rows[0] };
}
