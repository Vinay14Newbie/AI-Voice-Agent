// this file defines the executor that will be responsible for executing the tools defined in tools.js. The executor will receive the tool name and arguments from the agent, and then call the corresponding service function to perform the desired action. The executor will also handle any errors that may occur during the execution of the tools.

import {
  checkAvailabilityService,
  bookAppointmentService,
  cancelAppointmentService,
} from "../services/appointmentService.js";

export async function executeTool(toolName, args) {
  switch (toolName) {
    case "checkAvailability":
      return await checkAvailabilityService(args.doctorId, args.date);

    case "bookAppointment":
      return await bookAppointmentService(
        args.patientId,
        args.doctorId,
        args.date,
        args.time,
      );

    case "cancelAppointment":
      return await cancelAppointmentService(args.appointmentId);

    default:
      throw new Error("Unknown tool");
  }
}
