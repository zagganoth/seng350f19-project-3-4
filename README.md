### Team SEAR Software
# Grade Achiever

## Implemented User Stories
- User Story #7: View current grades
- User Story #4: View gradable items

## Changed Design Rational
During the development process, a few architectural designs were changed from the original Module Diagram in Milestone 2. These changes included...

## Build Process
Clone this project from GitHub and run:
``docker`` stuff 

## Testing
Unit test are written using Jest.
To manually run tests:
`npm run test` or `npm t`


## End Goal
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
