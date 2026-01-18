// src/app/shared/models/attendance.model.ts
var AttendanceStatus;
(function(AttendanceStatus2) {
  AttendanceStatus2[AttendanceStatus2["Present"] = 1] = "Present";
  AttendanceStatus2[AttendanceStatus2["Absent"] = 2] = "Absent";
  AttendanceStatus2[AttendanceStatus2["Late"] = 3] = "Late";
  AttendanceStatus2[AttendanceStatus2["EarlyLeave"] = 4] = "EarlyLeave";
  AttendanceStatus2[AttendanceStatus2["OnLeave"] = 5] = "OnLeave";
  AttendanceStatus2[AttendanceStatus2["DayOff"] = 6] = "DayOff";
  AttendanceStatus2[AttendanceStatus2["Overtime"] = 7] = "Overtime";
  AttendanceStatus2[AttendanceStatus2["Incomplete"] = 8] = "Incomplete";
  AttendanceStatus2[AttendanceStatus2["Holiday"] = 9] = "Holiday";
  AttendanceStatus2[AttendanceStatus2["SickLeave"] = 10] = "SickLeave";
  AttendanceStatus2[AttendanceStatus2["Pending"] = 11] = "Pending";
  AttendanceStatus2[AttendanceStatus2["OnDuty"] = 12] = "OnDuty";
  AttendanceStatus2[AttendanceStatus2["Excused"] = 13] = "Excused";
  AttendanceStatus2[AttendanceStatus2["RemoteWork"] = 14] = "RemoteWork";
})(AttendanceStatus || (AttendanceStatus = {}));
var TransactionType;
(function(TransactionType2) {
  TransactionType2[TransactionType2["CheckIn"] = 1] = "CheckIn";
  TransactionType2[TransactionType2["CheckOut"] = 2] = "CheckOut";
  TransactionType2[TransactionType2["BreakStart"] = 3] = "BreakStart";
  TransactionType2[TransactionType2["BreakEnd"] = 4] = "BreakEnd";
  TransactionType2[TransactionType2["ManualAdjustment"] = 5] = "ManualAdjustment";
  TransactionType2[TransactionType2["AutoCheckOut"] = 6] = "AutoCheckOut";
})(TransactionType || (TransactionType = {}));
var AttendanceReportType;
(function(AttendanceReportType2) {
  AttendanceReportType2[AttendanceReportType2["Daily"] = 0] = "Daily";
  AttendanceReportType2[AttendanceReportType2["Weekly"] = 1] = "Weekly";
  AttendanceReportType2[AttendanceReportType2["Monthly"] = 2] = "Monthly";
  AttendanceReportType2[AttendanceReportType2["Custom"] = 3] = "Custom";
})(AttendanceReportType || (AttendanceReportType = {}));

export {
  AttendanceStatus
};
//# sourceMappingURL=chunk-XLGMY32C.js.map
