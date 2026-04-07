import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  JobRequisition, CreateJobRequisitionRequest, RequisitionQueryParams,
  JobPosting, CreateJobPostingRequest, PostingQueryParams,
  Candidate, CreateCandidateRequest, CandidateQueryParams,
  JobApplication, CreateJobApplicationRequest, AdvanceApplicationRequest, ApplicationQueryParams,
  InterviewSchedule, CreateInterviewScheduleRequest, CompleteInterviewRequest,
  InterviewFeedback, CreateInterviewFeedbackRequest,
  OfferLetter, CreateOfferLetterRequest, OfferQueryParams, DeclineOfferRequest,
  RecruitmentPagedResult
} from '../../shared/models/recruitment.model';

@Injectable({ providedIn: 'root' })
export class RecruitmentService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;
  private http = inject(HttpClient);

  // --- Requisitions ---
  getRequisitions(params?: RequisitionQueryParams): Observable<RecruitmentPagedResult<JobRequisition>> {
    return this.http.get<RecruitmentPagedResult<JobRequisition>>(`${this.baseUrl}/job-requisitions`, { params: params as any });
  }
  getRequisition(id: number): Observable<JobRequisition> {
    return this.http.get<JobRequisition>(`${this.baseUrl}/job-requisitions/${id}`);
  }
  createRequisition(req: CreateJobRequisitionRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-requisitions`, req);
  }
  updateRequisition(id: number, req: CreateJobRequisitionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/job-requisitions/${id}`, req);
  }
  deleteRequisition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/job-requisitions/${id}`);
  }
  submitRequisition(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-requisitions/${id}/submit`, {});
  }
  approveRequisition(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-requisitions/${id}/approve`, {});
  }
  rejectRequisition(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-requisitions/${id}/reject`, { reason });
  }
  cancelRequisition(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-requisitions/${id}/cancel`, {});
  }

  // --- Postings ---
  getPostings(params?: PostingQueryParams): Observable<RecruitmentPagedResult<JobPosting>> {
    return this.http.get<RecruitmentPagedResult<JobPosting>>(`${this.baseUrl}/job-postings`, { params: params as any });
  }
  getPosting(id: number): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.baseUrl}/job-postings/${id}`);
  }
  createPosting(req: CreateJobPostingRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-postings`, req);
  }
  updatePosting(id: number, req: CreateJobPostingRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/job-postings/${id}`, req);
  }
  publishPosting(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-postings/${id}/publish`, {});
  }
  closePosting(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-postings/${id}/close`, {});
  }

  // --- Candidates ---
  getCandidates(params?: CandidateQueryParams): Observable<RecruitmentPagedResult<Candidate>> {
    return this.http.get<RecruitmentPagedResult<Candidate>>(`${this.baseUrl}/candidates`, { params: params as any });
  }
  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/candidates/${id}`);
  }
  createCandidate(req: CreateCandidateRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidates`, req);
  }
  updateCandidate(id: number, req: CreateCandidateRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/candidates/${id}`, req);
  }
  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/candidates/${id}`);
  }

  // --- Applications ---
  getApplications(params?: ApplicationQueryParams): Observable<RecruitmentPagedResult<JobApplication>> {
    return this.http.get<RecruitmentPagedResult<JobApplication>>(`${this.baseUrl}/job-applications`, { params: params as any });
  }
  getApplication(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/job-applications/${id}`);
  }
  createApplication(req: CreateJobApplicationRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-applications`, req);
  }
  advanceApplication(id: number, req: AdvanceApplicationRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-applications/${id}/advance`, req);
  }
  rejectApplication(id: number, reason: string, reasonAr?: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-applications/${id}/reject`, { reason, reasonAr });
  }
  withdrawApplication(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/job-applications/${id}/withdraw`, {});
  }
  getApplicationPipeline(postingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/job-applications/posting/${postingId}/pipeline`);
  }

  // --- Interviews ---
  getInterviews(params?: any): Observable<RecruitmentPagedResult<InterviewSchedule>> {
    return this.http.get<RecruitmentPagedResult<InterviewSchedule>>(`${this.baseUrl}/interviews`, { params });
  }
  getInterview(id: number): Observable<InterviewSchedule> {
    return this.http.get<InterviewSchedule>(`${this.baseUrl}/interviews/${id}`);
  }
  createInterview(req: CreateInterviewScheduleRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/interviews`, req);
  }
  updateInterview(id: number, req: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/interviews/${id}`, req);
  }
  completeInterview(id: number, req: CompleteInterviewRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/interviews/${id}/complete`, req);
  }
  cancelInterview(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/interviews/${id}/cancel`, { reason });
  }

  // --- Interview Feedback ---
  getFeedback(interviewId: number): Observable<InterviewFeedback> {
    return this.http.get<InterviewFeedback>(`${this.baseUrl}/interview-feedbacks/${interviewId}`);
  }
  submitFeedback(req: CreateInterviewFeedbackRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/interview-feedbacks`, req);
  }

  // --- Offers ---
  getOffers(params?: OfferQueryParams): Observable<RecruitmentPagedResult<OfferLetter>> {
    return this.http.get<RecruitmentPagedResult<OfferLetter>>(`${this.baseUrl}/offer-letters`, { params: params as any });
  }
  getOffer(id: number): Observable<OfferLetter> {
    return this.http.get<OfferLetter>(`${this.baseUrl}/offer-letters/${id}`);
  }
  createOffer(req: CreateOfferLetterRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters`, req);
  }
  updateOffer(id: number, req: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/offer-letters/${id}`, req);
  }
  submitOffer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/submit`, {});
  }
  approveOffer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/approve`, {});
  }
  sendOffer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/send`, {});
  }
  acceptOffer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/accept`, {});
  }
  declineOffer(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/decline`, { reason });
  }
  withdrawOffer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/offer-letters/${id}/withdraw`, {});
  }
}
