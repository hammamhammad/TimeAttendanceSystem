// src/app/shared/models/shift.model.ts
var ShiftType;
(function(ShiftType2) {
  ShiftType2[ShiftType2["TimeBased"] = 1] = "TimeBased";
  ShiftType2[ShiftType2["HoursOnly"] = 2] = "HoursOnly";
})(ShiftType || (ShiftType = {}));
var ShiftStatus;
(function(ShiftStatus2) {
  ShiftStatus2[ShiftStatus2["Active"] = 1] = "Active";
  ShiftStatus2[ShiftStatus2["Inactive"] = 2] = "Inactive";
  ShiftStatus2[ShiftStatus2["Draft"] = 3] = "Draft";
  ShiftStatus2[ShiftStatus2["Archived"] = 4] = "Archived";
})(ShiftStatus || (ShiftStatus = {}));
var ShiftAssignmentType;
(function(ShiftAssignmentType2) {
  ShiftAssignmentType2[ShiftAssignmentType2["Employee"] = 1] = "Employee";
  ShiftAssignmentType2[ShiftAssignmentType2["Department"] = 2] = "Department";
  ShiftAssignmentType2[ShiftAssignmentType2["Branch"] = 3] = "Branch";
})(ShiftAssignmentType || (ShiftAssignmentType = {}));
var ShiftAssignmentStatus;
(function(ShiftAssignmentStatus2) {
  ShiftAssignmentStatus2[ShiftAssignmentStatus2["Pending"] = 1] = "Pending";
  ShiftAssignmentStatus2[ShiftAssignmentStatus2["Active"] = 2] = "Active";
  ShiftAssignmentStatus2[ShiftAssignmentStatus2["Inactive"] = 3] = "Inactive";
  ShiftAssignmentStatus2[ShiftAssignmentStatus2["Expired"] = 4] = "Expired";
  ShiftAssignmentStatus2[ShiftAssignmentStatus2["Cancelled"] = 5] = "Cancelled";
})(ShiftAssignmentStatus || (ShiftAssignmentStatus = {}));

export {
  ShiftType,
  ShiftStatus,
  ShiftAssignmentType,
  ShiftAssignmentStatus
};
//# sourceMappingURL=chunk-ICLZUHFB.js.map
