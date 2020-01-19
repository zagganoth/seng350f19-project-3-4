### Team SEAR Software
# Grade Achiever
### Description:
- Keeps track of homework for the user.
- User inputs what grade they want to achieve in that class and the grading scheme for everything. 
- The user would input how much they spent working/studying on a specific item, what grade they got, etc.
- The app would calculate how much time they needed to spend on all the following assignments to achieve their target grade.
### Features:
- Assignment details submitted via Course Outline pdf scrape (verified by user) (good for csc/engr courses)
- List assignment deadlines in order
- Algorithm that calculates ideal study time based off previous study time and grades
- Sends (email?) notifications when deadline is approaching based on weight of assignment/midterm/final
- Notification configuration settings (enter an email to receive notifications)
- Beginner tutorial walk through to set up course assignment settings
- Add/remove assignment/course
- Change course grade goal
- View overall current semester grade
- Add a difficulty level to a course that is factored in to suggested study time
- Pass/Fail flag for certain assignments/finals
- Enter an assignment with no time recommendation

## Implemented User Stories
- User Story #7: View current grades:
Upon launching the app, the user can select an account to log in with, and see their grades on the overview page for each course they are enrolled in.
- User Story #6 Set grade goals:
From a course home page, a user can view their current grade goal and edit it to better reflect their goals as needed.
- User Story #5 Create/Delete users:
From the login page, a new user can be created. From the Admin page, an admin user can add create a new regular user or a new admin user and can delete exisitng users (except themselves).
- User Story #4: View gradable items:
Upon landing on the overview page, each user can see each gradable item they have due along with its due date in chronological order.
- User Story #3: Add a course
Upon logging in and landing on the overview page, each user can upload a course outline pdf and create a course to see on their overview page.
- User Story #2: Create/edit gradable items
Upon navigating to a course page, each user can add gradable items and edit them. Gradable items can be added at time of course creation. It is also possible to edit a gradable item from the overview page by clicking on it on the calendar display.
- User Story #1: Log time spent on gradable item
Each user can update each gradable item they have by clicking on it on the calendar view on either the course or overview page. 


## Automated 3 QAS Testing
 - Usability. We have made use of the jest-puppeteer npm module to write front-end tests for the QASs Data Input Simplicity. The tests occur as specified in the relevant issue: 
 Usability: User stories are attempted in under 5 clicks by jest-puppeteer. These tests include creating a new course and gradable items by uploading a course outline pdf.
 - Accessibility. We made use of google-lighthouse as a repo status check in Travis. Whenever Travis runs, we run lighthouse against the landing page to verify its accessibility. If the page gets a 50 or higher on accessibility, we accept the pull request. These tests are possible because we run a docker container as part of the build and run these tests against it
 - Performance. For Study Time Responsiveness, we have a unit test that runs the algorithm to verify it can compute within 5 seconds.
  
## Changed Design Rational
During the development process, a few architectural designs were changed from the original Module Diagram in Milestone 2. The most notable of these changes was the splitting of session controller functionality into an admin controller and a session controller. This was as during our initial design we overlooked the fact that the session controller would be responsible for both of these functionalities even though they are fairly distinct.

There was also an "admin model" added in to service interactions between controllers and the database that involved multiple users. Doing this allowed for the user model to only be responsible for editing/accessing data related to a particular user, which serves our security and privacy ASR as no user can obtain data for another user. Another functionality that was overlooked in the MVC diagram was that the session controller would first have to populate the login page with available users, which is now done using the admin model.

The final change regarding controllers and models is a tweak to the process of a user being shown their overview page. In the MVC diagram, the user would pose a login request to the view, which was passed to the session controller and through it to the overview controller, which would be responsible for presenting the user with the overview page. This design did not account for how routing would take place, and has been replaced by having the session router first use the session controller to verify the user as present in GradeAchiever, then contact the overview controller to load the page in the current iteration.

## CI Pipeline
Currently, we have husky call tslint before a commit is allowed, to ensure a basic standard of code being pushed. Then, when a pull request is created, it is run on Travis. Travis creates a docker container and starts it up, after which it runs tslint, our test suite, as well as google lighthouse to verify accessibility. Finally, it closes the docker container. If all of these steps pass, the pull request is merged into master. Because the docker container is running during tests, we are able to run full system-level tests using puppeteer as part of our CI (QAS-clicks.ts is the typescript file containing these tests)

## Build Process
Clone this project from GitHub and from the "GradeAchiever" directory run:
``tsc`` to compile
``./bin/www`` to run
``docker`` stuff 
The web app will likely not be accessible this way as it is designed to work in docker-compose 

### Running with Docker

From inside the `GradeAchiever` directory, run `sudo docker-compose up --build`
It should be possible to access the web app at http://localhost:8080
## Testing
Unit test are written using Jest.
To manually run tests:
`npm run test` or `npm t`

