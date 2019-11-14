/**
 * Client side ts/js
 */

/**
 * changeGradeGoal by sending fetch request with course id and new goal
 */
function changeGradeGoal(courseID: number) {
    // Cast to input element to get value.
    const newGradeElement = document.getElementById("goalinput") as HTMLInputElement;
    let newGrade: number;
    console.log(newGradeElement);
    if (newGradeElement) {
        newGrade = Number(newGradeElement.value);

        console.log(newGrade);
        if (!newGrade || (isNaN(newGrade) || (newGrade > 100 || newGrade < 0))) {
            alert("Please enter a number between 0 and 100");
            return;
        }
        const body = {
            newGoal: newGrade,
            courseID,
        };
        console.log(body);
        fetch("/editGradeGoal", {
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            credentials: "same-origin",
            body: JSON.stringify(body),
            },
        )
        .then(function(response) {
            /* Check response status code*/
            if (response.ok) {
                return;
            }
            else{
                throw new Error("Could not update gradeGoal :( HTTP response not was not OK -> " + response.status);
            }
        })
        .then(function() {
            /* Update HTML with new value */
            const goal = document.getElementById("gradegoal");
            if (goal) {
                goal.innerHTML = String(newGrade);
            }
            return;
        })
        .catch(function(error) {
            console.log(error);
            return error;
        })
        .finally(function() {
        doneEditGradeGoal();
        });
    }

}

/**
 * Create prompt for user input
 */
function editGradeGoal() {
    hideElementbyID(document.getElementById("gradegoal"));
    showElementbyID(document.getElementById("gradegoalinput"));
    hideElementbyID(document.getElementById("editgoal"));
    showElementbyID(document.getElementById("submitgoal"));
}

/**
 * Hide prompt
 */
function doneEditGradeGoal() {
    hideElementbyID(document.getElementById("gradegoalinput"));
    hideElementbyID(document.getElementById("submitgoal"));
    showElementbyID(document.getElementById("gradegoal"));
    showElementbyID(document.getElementById("editgoal"));
}

function hideElementbyID(element: any) {
    element.style.display = "none";
}

function showElementbyID(element: any) {
    element.style.display = "table-cell";
}
