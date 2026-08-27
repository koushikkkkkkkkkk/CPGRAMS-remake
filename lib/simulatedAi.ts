export type NlpIntent = "[ INFRASTRUCTURE ]" | "[ WASTAGE ]" | "[ GENERAL ]";
export type NlpDepartment = "Municipal Road Wing - Ward 4" | "Municipal Water Board - Ward 4" | "General Grievance Cell";

export interface RoutingResult {
  intent: NlpIntent;
  department: NlpDepartment;
}

export function simulateGrievanceAnalysis(text: string): RoutingResult {
  const lowerText = text.toLowerCase();

  // Infrastructure keywords
  const infraPattern = /(road|pothole|rasta|sadak|ರಸ್ತೆ|சாலை)/;
  if (infraPattern.test(lowerText)) {
    return {
      intent: "[ INFRASTRUCTURE ]",
      department: "Municipal Road Wing - Ward 4",
    };
  }

  // Wastage keywords
  const wastagePattern = /(water|leak|paani|neeru|ನೀರು|தண்ணீர்)/;
  if (wastagePattern.test(lowerText)) {
    return {
      intent: "[ WASTAGE ]",
      department: "Municipal Water Board - Ward 4",
    };
  }

  // Fallback
  return {
    intent: "[ GENERAL ]",
    department: "General Grievance Cell",
  };
}
