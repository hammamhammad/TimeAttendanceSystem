// src/app/shared/models/employee.model.ts
var Gender;
(function(Gender2) {
  Gender2[Gender2["Male"] = 1] = "Male";
  Gender2[Gender2["Female"] = 2] = "Female";
})(Gender || (Gender = {}));
var EmploymentStatus;
(function(EmploymentStatus2) {
  EmploymentStatus2[EmploymentStatus2["Active"] = 1] = "Active";
  EmploymentStatus2[EmploymentStatus2["FullTime"] = 2] = "FullTime";
  EmploymentStatus2[EmploymentStatus2["PartTime"] = 3] = "PartTime";
  EmploymentStatus2[EmploymentStatus2["Contract"] = 4] = "Contract";
  EmploymentStatus2[EmploymentStatus2["Intern"] = 5] = "Intern";
  EmploymentStatus2[EmploymentStatus2["Consultant"] = 6] = "Consultant";
  EmploymentStatus2[EmploymentStatus2["Terminated"] = 7] = "Terminated";
  EmploymentStatus2[EmploymentStatus2["Inactive"] = 8] = "Inactive";
})(EmploymentStatus || (EmploymentStatus = {}));
var WorkLocationType;
(function(WorkLocationType2) {
  WorkLocationType2[WorkLocationType2["OnSite"] = 1] = "OnSite";
  WorkLocationType2[WorkLocationType2["Remote"] = 2] = "Remote";
  WorkLocationType2[WorkLocationType2["Hybrid"] = 3] = "Hybrid";
})(WorkLocationType || (WorkLocationType = {}));

export {
  Gender,
  EmploymentStatus,
  WorkLocationType
};
//# sourceMappingURL=chunk-TLKJPMWD.js.map
