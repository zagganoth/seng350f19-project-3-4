---
Title: Marking Rubric - Project
Authors: Neil Ernst
---

# Running Total (this will change each milestone):   69.5

NB: for all milestones, basic clean coding style: comments, standardized indentation, lack of code smells, is expected. Your submission and repository should show the following: 
	- Travis CI is being used (M3+)
	- a static analysis tool and linter has been applied (M3+)
	- Typescript project best practices are followed (M3+)

# Milestone 1   7  / 10

## Marking Guide	
- ASRs complete and capture
  - need to persist data
  - need to manage user state and cookies
  - security and privacy
  - usability
  - performance and latency
  - async issues

Marks deducted:
- scenarios seem to have little to no connection with the project (-2)
- poor technical writing  (-2)
- Quality of scenarios (clear analysis of stimulus, response, response measure)

## Notes M1
(explaining why marks were deducted)
-----
- some QAS are features in disguise - little obvious design impact (-2)
- testability issue - see comment
- user story titles are uninformative (-1)



# Milestone 2   20 / 20

## Marking Guide

- technical writing is clear and concise (key decisions are documented; organization is easy to follow; basic English spelling and writing conventions adhered to)
- design follows basic principles like cohesion/coupling, single responsibility, open/closed
- design addresses QAR from M1
- design provides path for implementing user stories in M1
- design models follow conventions for class and sequence diagrams
- design justifies technology choices
- ADRs (3+) explain why decision was taken, what the context is, and what alternatives were rejected
- ADRs don't capture trivial design decisions

## Notes M2

(explaining why marks were deducted)
-----

- nice work. 


# Milestone 3   18.5 / 20

## Marking Guide

- code compiles
- code conventions/CI from above (commented, code style, design principles)
- working demo
- clear explanation of what user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful

Marks deducted:

- Coding convention and good coding design was not followed properly. (-1.5)

## Notes M3

(explaining why marks were deducted)
-----

- The methods are large. The database connection could be moved somewhere else to avoid having large methods.

# Milestone 4 24 / 30

## Marking Guide

- code compiles
- code conventions/CI from above (commented, code style, design principles)
- working demo
- clear explanation of what user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful
- explanation of how you are automating testing 3 QAS from your list in M1
- explanation of integration testing and CI pipeline


Marks deducted:

- Code comments. (-2)
- Test Coverage. (-1)
- CI build failed. (-2)
- Does not fully comply the QASs in the implementation(-1) 


## Notes M4

(explaining why marks were deducted)
-----

- Code commenting could be better. For example, in the algorithm file which is very crucial to understand is not commented well. Reduces readability, maintanability.
- Overall test coverage could be a little better.
- CI build failed on the last build on deadline day due to failing some of the checks.
