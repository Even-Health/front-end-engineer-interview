Even Health Front End Engineer Interview

Part 1: Bug Fix 
- A bug has been identified in the file LoginForm 
- The description is listed below:
Login Button on Login Screen is Enabled Even if Field Validation Fails.
On the login screen, the disabled status of the login button is not controlled by the field validators (like the sign-up screen). This allows the user to attempt to login with a malformed email address
- Please open the file LoginForm and describe what you see.
______________________________________________________________________________

Part 2: Feature Implementation
- We would like to add a new feature with details listed below:
Pass UserProfile Data to Frontend
As a user, I want my UserProfile data (email, Personalization fields) to be passed to the frontend to populate screens like Home. The existing UserProfileProvider uses dummy data. This should be replaced with an API call.
- Please open the file UserProfileProvider & describe what changes you would make.  CabanaApiProvider is available as well since it is referenced.
