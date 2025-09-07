import * as z from "zod";

const studentValidationSchema = z.object({ 
    id: z.string().trim().min(1, "ID is required"),
  });