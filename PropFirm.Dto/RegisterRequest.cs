using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Dto
{
    public record RegisterRequest(string UserName,string Title, string FirstName, string LastName, DateOnly DateofBirth, string Email, string Password, string PhoneNumberPrefix, string PhoneNumber, string ReferalCode, bool Over18, bool DetailsCorrect, bool RecieveMarketingMaterial);
}
