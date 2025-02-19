1. User Model
Represents the users of the platform, including citizens, government officials, NGOs, and admins.

User ID
Name
Email
Phone (optional)
Password
Role (Citizen, Government Official, NGO, Admin)
Profile Picture (optional)
Verification Status
Created At
Updated At
2. Discussion Forum Model
Represents discussion topics where users can engage in policy debates.

Forum ID
Title
Description
Category (Policy, Budget, Infrastructure, Environment, Social Welfare)
Created By (User ID)
Created At
Updated At
3. Forum Comment Model
Stores comments under discussion forums.

Comment ID
Forum ID (Linked to Forum)
User ID (Linked to User)
Content
Created At
Updated At
4. Petition Model
Allows users to create petitions for social and policy changes.

Petition ID
Title
Description
Created By (User ID)
Total Signatures
Created At
Updated At
5. Petition Signature Model
Tracks users who have signed a petition.

Signature ID
Petition ID (Linked to Petition)
User ID (Linked to User)
Signed At
6. Issue Reporting Model
Allows users to report public issues, such as corruption or infrastructure problems.

Issue ID
Title
Description
Category (Corruption, Infrastructure, Public Safety, Health, Education)
Created By (Optional for anonymous reporting)
Status (Pending, In Progress, Resolved)
Government Response (optional)
Created At
Updated At
7. Voting & Polling Model
Facilitates public opinion collection through polls.

Poll ID
Question
Options (e.g., Yes, No, Undecided)
Created By (User ID)
Created At
Expiration Date
8. Vote Model
Tracks individual votes on polls.

Vote ID
Poll ID (Linked to Poll)
User ID (Linked to User)
Selected Option
Created At
9. Public Notices Model
Stores government announcements and official statements.

Notice ID
Title
Content
Published By (User ID - Government Official/Admin)
Created At
Updated At
10. Notifications Model
Tracks system-generated alerts for users.

Notification ID
User ID (Recipient)
Type (New Comment, New Vote, Petition Update, Issue Status Change)
Message
Read Status
Created At
11. Feedback & Government Response Model
Stores government responses to reported issues.

Feedback ID
Issue ID (Linked to Issue)
Government Official ID (User ID)
Response Content
Created At
