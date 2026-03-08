// This file defines the tools that the agent can use to interact with the appointment scheduling system. Each tool is defined as a function with a name, description, and parameters. The agent can call these functions to perform actions like checking availability, booking appointments, and canceling appointments.

export const tools = [
  {
    type: "function",
    function: {
      name: "checkAvailability",
      description: "Check available appointment slots for a doctor",
      parameters: {
        type: "object",
        properties: {
          doctorId: { type: "string" },
          date: { type: "string" },
        },
        required: ["doctorId", "date"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "bookAppointment",
      description: "Book a doctor appointment",
      parameters: {
        type: "object",
        properties: {
          patientId: { type: "string" },
          doctorId: { type: "string" },
          date: { type: "string" },
          time: { type: "string" },
        },
        required: ["patientId", "doctorId", "date", "time"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "cancelAppointment",
      description: "Cancel an appointment",
      parameters: {
        type: "object",
        properties: {
          appointmentId: { type: "string" },
        },
        required: ["appointmentId"],
      },
    },
  },
];
