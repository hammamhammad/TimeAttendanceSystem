using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-details")]
[Authorize]
public class EmployeeDetailsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public EmployeeDetailsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    // ===========================
    // Bank Details
    // ===========================

    [HttpGet("{employeeId}/bank-details")]
    public async Task<IActionResult> GetBankDetails(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeBankDetails
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.IsPrimary)
            .ThenByDescending(x => x.CreatedAtUtc)
            .Select(x => new BankDetailDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                BankName = x.BankName,
                BankNameAr = x.BankNameAr,
                AccountHolderName = x.AccountHolderName,
                AccountNumber = x.AccountNumber,
                IBAN = x.IBAN,
                SwiftCode = x.SwiftCode,
                BranchName = x.BranchName,
                Currency = x.Currency,
                IsPrimary = x.IsPrimary,
                IsActive = x.IsActive
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/bank-details")]
    public async Task<IActionResult> CreateBankDetail(long employeeId, [FromBody] CreateBankDetailRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeBankDetail
        {
            EmployeeId = employeeId,
            BankName = request.BankName,
            BankNameAr = request.BankNameAr,
            AccountHolderName = request.AccountHolderName,
            AccountNumber = request.AccountNumber,
            IBAN = request.IBAN,
            SwiftCode = request.SwiftCode,
            BranchName = request.BranchName,
            Currency = request.Currency ?? "SAR",
            IsPrimary = request.IsPrimary,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeBankDetails.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("bank-details/{id}")]
    public async Task<IActionResult> UpdateBankDetail(long id, [FromBody] CreateBankDetailRequest request)
    {
        var entity = await _context.EmployeeBankDetails
            .Include(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Bank detail not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.BankName = request.BankName;
        entity.BankNameAr = request.BankNameAr;
        entity.AccountHolderName = request.AccountHolderName;
        entity.AccountNumber = request.AccountNumber;
        entity.IBAN = request.IBAN;
        entity.SwiftCode = request.SwiftCode;
        entity.BranchName = request.BranchName;
        entity.Currency = request.Currency ?? "SAR";
        entity.IsPrimary = request.IsPrimary;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("bank-details/{id}")]
    public async Task<IActionResult> DeleteBankDetail(long id)
    {
        var entity = await _context.EmployeeBankDetails
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Bank detail not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Dependents
    // ===========================

    [HttpGet("{employeeId}/dependents")]
    public async Task<IActionResult> GetDependents(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeDependents
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => new DependentDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                FirstNameAr = x.FirstNameAr,
                LastNameAr = x.LastNameAr,
                Relationship = x.Relationship,
                DateOfBirth = x.DateOfBirth,
                Gender = x.Gender,
                NationalId = x.NationalId,
                Phone = x.Phone,
                IsEmergencyContact = x.IsEmergencyContact,
                IsBeneficiary = x.IsBeneficiary,
                Notes = x.Notes
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/dependents")]
    public async Task<IActionResult> CreateDependent(long employeeId, [FromBody] CreateDependentRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeDependent
        {
            EmployeeId = employeeId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            FirstNameAr = request.FirstNameAr,
            LastNameAr = request.LastNameAr,
            Relationship = request.Relationship,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            NationalId = request.NationalId,
            Phone = request.Phone,
            IsEmergencyContact = request.IsEmergencyContact,
            IsBeneficiary = request.IsBeneficiary,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeDependents.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("dependents/{id}")]
    public async Task<IActionResult> UpdateDependent(long id, [FromBody] CreateDependentRequest request)
    {
        var entity = await _context.EmployeeDependents
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Dependent not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.FirstName = request.FirstName;
        entity.LastName = request.LastName;
        entity.FirstNameAr = request.FirstNameAr;
        entity.LastNameAr = request.LastNameAr;
        entity.Relationship = request.Relationship;
        entity.DateOfBirth = request.DateOfBirth;
        entity.Gender = request.Gender;
        entity.NationalId = request.NationalId;
        entity.Phone = request.Phone;
        entity.IsEmergencyContact = request.IsEmergencyContact;
        entity.IsBeneficiary = request.IsBeneficiary;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("dependents/{id}")]
    public async Task<IActionResult> DeleteDependent(long id)
    {
        var entity = await _context.EmployeeDependents
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Dependent not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Emergency Contacts
    // ===========================

    [HttpGet("{employeeId}/emergency-contacts")]
    public async Task<IActionResult> GetEmergencyContacts(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmergencyContacts
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.IsPrimary)
            .Select(x => new EmergencyContactDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                Name = x.Name,
                NameAr = x.NameAr,
                Relationship = x.Relationship,
                Phone = x.Phone,
                AlternatePhone = x.AlternatePhone,
                Email = x.Email,
                Address = x.Address,
                IsPrimary = x.IsPrimary,
                DisplayOrder = x.DisplayOrder
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/emergency-contacts")]
    public async Task<IActionResult> CreateEmergencyContact(long employeeId, [FromBody] CreateEmergencyContactRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmergencyContact
        {
            EmployeeId = employeeId,
            Name = request.Name,
            NameAr = request.NameAr,
            Relationship = request.Relationship,
            Phone = request.Phone,
            AlternatePhone = request.AlternatePhone,
            Email = request.Email,
            Address = request.Address,
            IsPrimary = request.IsPrimary,
            DisplayOrder = request.DisplayOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmergencyContacts.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("emergency-contacts/{id}")]
    public async Task<IActionResult> UpdateEmergencyContact(long id, [FromBody] CreateEmergencyContactRequest request)
    {
        var entity = await _context.EmergencyContacts
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Emergency contact not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Relationship = request.Relationship;
        entity.Phone = request.Phone;
        entity.AlternatePhone = request.AlternatePhone;
        entity.Email = request.Email;
        entity.Address = request.Address;
        entity.IsPrimary = request.IsPrimary;
        entity.DisplayOrder = request.DisplayOrder;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("emergency-contacts/{id}")]
    public async Task<IActionResult> DeleteEmergencyContact(long id)
    {
        var entity = await _context.EmergencyContacts
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Emergency contact not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Addresses
    // ===========================

    [HttpGet("{employeeId}/addresses")]
    public async Task<IActionResult> GetAddresses(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeAddresses
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.IsPrimary)
            .ThenByDescending(x => x.CreatedAtUtc)
            .Select(x => new AddressDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                AddressType = x.AddressType,
                AddressLine1 = x.AddressLine1,
                AddressLine2 = x.AddressLine2,
                City = x.City,
                CityAr = x.CityAr,
                State = x.State,
                StateAr = x.StateAr,
                PostalCode = x.PostalCode,
                Country = x.Country,
                CountryAr = x.CountryAr,
                IsPrimary = x.IsPrimary
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/addresses")]
    public async Task<IActionResult> CreateAddress(long employeeId, [FromBody] CreateAddressRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeAddress
        {
            EmployeeId = employeeId,
            AddressType = request.AddressType,
            AddressLine1 = request.AddressLine1,
            AddressLine2 = request.AddressLine2,
            City = request.City,
            CityAr = request.CityAr,
            State = request.State,
            StateAr = request.StateAr,
            PostalCode = request.PostalCode,
            Country = request.Country,
            CountryAr = request.CountryAr,
            IsPrimary = request.IsPrimary,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeAddresses.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("addresses/{id}")]
    public async Task<IActionResult> UpdateAddress(long id, [FromBody] CreateAddressRequest request)
    {
        var entity = await _context.EmployeeAddresses
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Address not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.AddressType = request.AddressType;
        entity.AddressLine1 = request.AddressLine1;
        entity.AddressLine2 = request.AddressLine2;
        entity.City = request.City;
        entity.CityAr = request.CityAr;
        entity.State = request.State;
        entity.StateAr = request.StateAr;
        entity.PostalCode = request.PostalCode;
        entity.Country = request.Country;
        entity.CountryAr = request.CountryAr;
        entity.IsPrimary = request.IsPrimary;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("addresses/{id}")]
    public async Task<IActionResult> DeleteAddress(long id)
    {
        var entity = await _context.EmployeeAddresses
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Address not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Education
    // ===========================

    [HttpGet("{employeeId}/education")]
    public async Task<IActionResult> GetEducation(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeEducations
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.IsHighestDegree)
            .ThenByDescending(x => x.EndDate)
            .Select(x => new EducationDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                Level = x.Level,
                InstitutionName = x.InstitutionName,
                InstitutionNameAr = x.InstitutionNameAr,
                Degree = x.Degree,
                DegreeAr = x.DegreeAr,
                FieldOfStudy = x.FieldOfStudy,
                FieldOfStudyAr = x.FieldOfStudyAr,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Grade = x.Grade,
                CertificateUrl = x.CertificateUrl,
                Country = x.Country,
                IsHighestDegree = x.IsHighestDegree
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/education")]
    public async Task<IActionResult> CreateEducation(long employeeId, [FromBody] CreateEducationRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeEducation
        {
            EmployeeId = employeeId,
            Level = request.Level,
            InstitutionName = request.InstitutionName,
            InstitutionNameAr = request.InstitutionNameAr,
            Degree = request.Degree,
            DegreeAr = request.DegreeAr,
            FieldOfStudy = request.FieldOfStudy,
            FieldOfStudyAr = request.FieldOfStudyAr,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Grade = request.Grade,
            CertificateUrl = request.CertificateUrl,
            Country = request.Country,
            IsHighestDegree = request.IsHighestDegree,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeEducations.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("education/{id}")]
    public async Task<IActionResult> UpdateEducation(long id, [FromBody] CreateEducationRequest request)
    {
        var entity = await _context.EmployeeEducations
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Education record not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.Level = request.Level;
        entity.InstitutionName = request.InstitutionName;
        entity.InstitutionNameAr = request.InstitutionNameAr;
        entity.Degree = request.Degree;
        entity.DegreeAr = request.DegreeAr;
        entity.FieldOfStudy = request.FieldOfStudy;
        entity.FieldOfStudyAr = request.FieldOfStudyAr;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.Grade = request.Grade;
        entity.CertificateUrl = request.CertificateUrl;
        entity.Country = request.Country;
        entity.IsHighestDegree = request.IsHighestDegree;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("education/{id}")]
    public async Task<IActionResult> DeleteEducation(long id)
    {
        var entity = await _context.EmployeeEducations
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Education record not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Work Experience
    // ===========================

    [HttpGet("{employeeId}/work-experience")]
    public async Task<IActionResult> GetWorkExperience(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeWorkExperiences
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.StartDate)
            .Select(x => new WorkExperienceDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                CompanyName = x.CompanyName,
                CompanyNameAr = x.CompanyNameAr,
                JobTitle = x.JobTitle,
                JobTitleAr = x.JobTitleAr,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Responsibilities = x.Responsibilities,
                ReasonForLeaving = x.ReasonForLeaving,
                Country = x.Country,
                ReferenceContactName = x.ReferenceContactName,
                ReferenceContactPhone = x.ReferenceContactPhone,
                CertificateUrl = x.CertificateUrl
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/work-experience")]
    public async Task<IActionResult> CreateWorkExperience(long employeeId, [FromBody] CreateWorkExperienceRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeWorkExperience
        {
            EmployeeId = employeeId,
            CompanyName = request.CompanyName,
            CompanyNameAr = request.CompanyNameAr,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Responsibilities = request.Responsibilities,
            ReasonForLeaving = request.ReasonForLeaving,
            Country = request.Country,
            ReferenceContactName = request.ReferenceContactName,
            ReferenceContactPhone = request.ReferenceContactPhone,
            CertificateUrl = request.CertificateUrl,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeWorkExperiences.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("work-experience/{id}")]
    public async Task<IActionResult> UpdateWorkExperience(long id, [FromBody] CreateWorkExperienceRequest request)
    {
        var entity = await _context.EmployeeWorkExperiences
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Work experience not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.CompanyName = request.CompanyName;
        entity.CompanyNameAr = request.CompanyNameAr;
        entity.JobTitle = request.JobTitle;
        entity.JobTitleAr = request.JobTitleAr;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.Responsibilities = request.Responsibilities;
        entity.ReasonForLeaving = request.ReasonForLeaving;
        entity.Country = request.Country;
        entity.ReferenceContactName = request.ReferenceContactName;
        entity.ReferenceContactPhone = request.ReferenceContactPhone;
        entity.CertificateUrl = request.CertificateUrl;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("work-experience/{id}")]
    public async Task<IActionResult> DeleteWorkExperience(long id)
    {
        var entity = await _context.EmployeeWorkExperiences
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Work experience not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ===========================
    // Visas
    // ===========================

    [HttpGet("{employeeId}/visas")]
    public async Task<IActionResult> GetVisas(long employeeId)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var items = await _context.EmployeeVisas
            .Where(x => x.EmployeeId == employeeId && !x.IsDeleted)
            .OrderByDescending(x => x.ExpiryDate)
            .Select(x => new VisaDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                VisaType = x.VisaType,
                VisaNumber = x.VisaNumber,
                SponsorName = x.SponsorName,
                IssueDate = x.IssueDate,
                ExpiryDate = x.ExpiryDate,
                IssuingCountry = x.IssuingCountry,
                Status = x.Status,
                DocumentUrl = x.DocumentUrl,
                Notes = x.Notes
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{employeeId}/visas")]
    public async Task<IActionResult> CreateVisa(long employeeId, [FromBody] CreateVisaRequest request)
    {
        if (!await HasAccessToEmployee(employeeId))
            return Forbid();

        var entity = new EmployeeVisa
        {
            EmployeeId = employeeId,
            VisaType = request.VisaType,
            VisaNumber = request.VisaNumber,
            SponsorName = request.SponsorName,
            IssueDate = request.IssueDate,
            ExpiryDate = request.ExpiryDate,
            IssuingCountry = request.IssuingCountry,
            Status = request.Status,
            DocumentUrl = request.DocumentUrl,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeVisas.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    [HttpPut("visas/{id}")]
    public async Task<IActionResult> UpdateVisa(long id, [FromBody] CreateVisaRequest request)
    {
        var entity = await _context.EmployeeVisas
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Visa not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.VisaType = request.VisaType;
        entity.VisaNumber = request.VisaNumber;
        entity.SponsorName = request.SponsorName;
        entity.IssueDate = request.IssueDate;
        entity.ExpiryDate = request.ExpiryDate;
        entity.IssuingCountry = request.IssuingCountry;
        entity.Status = request.Status;
        entity.DocumentUrl = request.DocumentUrl;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("visas/{id}")]
    public async Task<IActionResult> DeleteVisa(long id)
    {
        var entity = await _context.EmployeeVisas
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Visa not found." });

        if (!await HasAccessToEmployee(entity.EmployeeId))
            return Forbid();

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets visas expiring within the specified number of days across all employees.</summary>
    [HttpGet("visas/expiring")]
    public async Task<IActionResult> GetExpiringVisas([FromQuery] int daysAhead = 30)
    {
        var cutoff = DateTime.UtcNow.AddDays(daysAhead);

        var query = _context.EmployeeVisas
            .Include(x => x.Employee)
            .Where(x => !x.IsDeleted && x.Status == VisaStatus.Active && x.ExpiryDate <= cutoff);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(x => _currentUser.BranchIds.Contains(x.Employee.BranchId));

        var items = await query
            .OrderBy(x => x.ExpiryDate)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.VisaType,
                x.VisaNumber,
                x.ExpiryDate,
                x.IssuingCountry,
                x.Status,
                DaysUntilExpiry = (x.ExpiryDate - DateTime.UtcNow).Days
            })
            .ToListAsync();

        return Ok(items);
    }

    // ===========================
    // Helper
    // ===========================

    private async Task<bool> HasAccessToEmployee(long employeeId)
    {
        if (_currentUser.IsSystemAdmin)
            return true;

        var employee = await _context.Employees
            .Where(e => e.Id == employeeId && !e.IsDeleted)
            .Select(e => new { e.BranchId })
            .FirstOrDefaultAsync();

        if (employee == null)
            return false;

        if (_currentUser.BranchIds.Any() && !_currentUser.BranchIds.Contains(employee.BranchId))
            return false;

        return true;
    }
}

// ===========================
// Request Records
// ===========================

public record CreateBankDetailRequest(
    string BankName,
    string? BankNameAr,
    string AccountHolderName,
    string AccountNumber,
    string? IBAN,
    string? SwiftCode,
    string? BranchName,
    string? Currency,
    bool IsPrimary,
    bool IsActive
);

public record CreateDependentRequest(
    string FirstName,
    string LastName,
    string? FirstNameAr,
    string? LastNameAr,
    DependentRelationship Relationship,
    DateTime? DateOfBirth,
    Gender? Gender,
    string? NationalId,
    string? Phone,
    bool IsEmergencyContact,
    bool IsBeneficiary,
    string? Notes
);

public record CreateEmergencyContactRequest(
    string Name,
    string? NameAr,
    string Relationship,
    string Phone,
    string? AlternatePhone,
    string? Email,
    string? Address,
    bool IsPrimary,
    int DisplayOrder
);

public record CreateAddressRequest(
    AddressType AddressType,
    string? AddressLine1,
    string? AddressLine2,
    string? City,
    string? CityAr,
    string? State,
    string? StateAr,
    string? PostalCode,
    string? Country,
    string? CountryAr,
    bool IsPrimary
);

public record CreateEducationRequest(
    EducationLevel Level,
    string InstitutionName,
    string? InstitutionNameAr,
    string? Degree,
    string? DegreeAr,
    string? FieldOfStudy,
    string? FieldOfStudyAr,
    DateTime? StartDate,
    DateTime? EndDate,
    string? Grade,
    string? CertificateUrl,
    string? Country,
    bool IsHighestDegree
);

public record CreateWorkExperienceRequest(
    string CompanyName,
    string? CompanyNameAr,
    string? JobTitle,
    string? JobTitleAr,
    DateTime StartDate,
    DateTime? EndDate,
    string? Responsibilities,
    string? ReasonForLeaving,
    string? Country,
    string? ReferenceContactName,
    string? ReferenceContactPhone,
    string? CertificateUrl
);

public record CreateVisaRequest(
    VisaType VisaType,
    string? VisaNumber,
    string? SponsorName,
    DateTime IssueDate,
    DateTime ExpiryDate,
    string? IssuingCountry,
    VisaStatus Status,
    string? DocumentUrl,
    string? Notes
);
