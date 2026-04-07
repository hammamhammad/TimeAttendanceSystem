// ===== Enums =====

export enum SurveyType {
  EmployeeEngagement = 'EmployeeEngagement',
  PulseSurvey = 'PulseSurvey',
  ENPS = 'ENPS',
  Onboarding = 'Onboarding',
  ExitSurvey = 'ExitSurvey',
  Custom = 'Custom'
}

export enum SurveyQuestionType {
  Rating = 'Rating',
  MultipleChoice = 'MultipleChoice',
  MultiSelect = 'MultiSelect',
  OpenText = 'OpenText',
  NPS = 'NPS',
  YesNo = 'YesNo'
}

export enum SurveyTargetAudience {
  All = 'All',
  Branch = 'Branch',
  Department = 'Department',
  Role = 'Role'
}

export enum SurveyDistributionStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Active = 'Active',
  Closed = 'Closed',
  Cancelled = 'Cancelled'
}

export enum SurveyParticipantStatus {
  Pending = 'Pending',
  Started = 'Started',
  Completed = 'Completed',
  Expired = 'Expired'
}

// ===== Survey Template =====

export interface SurveyQuestionDto {
  id: number;
  questionText: string;
  questionTextAr?: string;
  questionType: SurveyQuestionType;
  isRequired: boolean;
  sortOrder: number;
  options?: string[];
  optionsAr?: string[];
}

export interface CreateSurveyQuestionRequest {
  questionText: string;
  questionTextAr?: string;
  questionType: SurveyQuestionType;
  isRequired: boolean;
  sortOrder: number;
  options?: string[];
  optionsAr?: string[];
}

export interface SurveyTemplateDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  surveyType: SurveyType;
  isActive: boolean;
  questionCount: number;
  distributionCount: number;
  questions: SurveyQuestionDto[];
  createdByName: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CreateSurveyTemplateRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  surveyType: SurveyType;
  isActive: boolean;
  questions: CreateSurveyQuestionRequest[];
}

export interface UpdateSurveyTemplateRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  surveyType: SurveyType;
  isActive: boolean;
  questions: CreateSurveyQuestionRequest[];
}

// ===== Survey Distribution =====

export interface SurveyDistributionDto {
  id: number;
  templateId: number;
  templateName: string;
  title: string;
  titleAr?: string;
  surveyType: SurveyType;
  status: SurveyDistributionStatus;
  targetAudience: SurveyTargetAudience;
  targetIds?: number[];
  targetNames?: string[];
  isAnonymous: boolean;
  startDate: string;
  endDate: string;
  totalParticipants: number;
  completedCount: number;
  completionRate: number;
  createdByName: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CreateSurveyDistributionRequest {
  templateId: number;
  title: string;
  titleAr?: string;
  targetAudience: SurveyTargetAudience;
  targetIds?: number[];
  isAnonymous: boolean;
  startDate: string;
  endDate: string;
}

export interface UpdateSurveyDistributionRequest {
  title: string;
  titleAr?: string;
  targetAudience: SurveyTargetAudience;
  targetIds?: number[];
  isAnonymous: boolean;
  startDate: string;
  endDate: string;
}

// ===== Survey Participant =====

export interface SurveyParticipantDto {
  id: number;
  distributionId: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  status: SurveyParticipantStatus;
  startedAtUtc?: string;
  completedAtUtc?: string;
  token: string;
}

// ===== Survey Response =====

export interface SurveyAnswerRequest {
  questionId: number;
  ratingValue?: number;
  textValue?: string;
  selectedOptions?: string[];
  npsValue?: number;
  yesNoValue?: boolean;
}

export interface SurveyResponseRequest {
  token: string;
  answers: SurveyAnswerRequest[];
}

// ===== Survey Results =====

export interface SurveyQuestionResultDto {
  questionId: number;
  questionText: string;
  questionTextAr?: string;
  questionType: SurveyQuestionType;
  responseCount: number;
  averageRating?: number;
  npsScore?: number;
  optionCounts?: { option: string; count: number }[];
  yesCount?: number;
  noCount?: number;
  textResponses?: string[];
}

export interface SurveyResultsDto {
  distributionId: number;
  title: string;
  surveyType: SurveyType;
  totalParticipants: number;
  completedCount: number;
  completionRate: number;
  enpsScore?: number;
  enpsPromoters?: number;
  enpsPassives?: number;
  enpsDetractors?: number;
  questionResults: SurveyQuestionResultDto[];
}

// ===== Portal Models (for self-service) =====

export interface MySurveyDto {
  id: number;
  distributionId: number;
  title: string;
  titleAr?: string;
  surveyType: SurveyType;
  status: SurveyParticipantStatus;
  isAnonymous: boolean;
  startDate: string;
  endDate: string;
  startedAtUtc?: string;
  completedAtUtc?: string;
  token: string;
}

export interface SurveyFormDto {
  distributionId: number;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  surveyType: SurveyType;
  isAnonymous: boolean;
  questions: SurveyQuestionDto[];
}
