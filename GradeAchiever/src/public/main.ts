/**
 * Client side ts/js
 */

/**
 * changeGradeGoal by sending fetch request with course id and new goal
 */
function changeGradeGoal(courseID: number) {
    // Cast to input element to get value.
    const newGradeElement = document.getElementById("goalinput") as HTMLInputElement;
    if (newGradeElement) {
        const newGrade: number = Number(newGradeElement.value);
        /* Verify user input */
        if (!verifyNewGrade(newGrade)) { return; }
        const body = {
            newGoal: newGrade,
            courseID,
        };
        fetch("/editGradeGoal", {
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            credentials: "same-origin",
            body: JSON.stringify(body),
            },
        )
        .then(function(response) {
            /* Check response status code*/
            CheckResponse(response);
        })
        .then(function() {
            /* Update HTML with new value */
            UpdateGoalHTML(newGrade);
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

/*
 * Check fetch response status code
 */
function CheckResponse(resp: any) {
    if (resp.ok) {
        return;
    } else {
        throw new Error("HTTP response not was not OK -> " + resp.status);
    }
}

/*
 * Verifies new goal is a number between 0 and 100
 */
function verifyNewGrade(newGrade: number) {
    if (!newGrade || (isNaN(newGrade) || (newGrade > 100 || newGrade < 0))) {
        alert("Please enter a number between 0 and 100");
        return false;
    } else {
        return true;
    }
}

/** Updated grade goal in html */
function UpdateGoalHTML(newGoal: number) {
    const goal = document.getElementById("gradegoal");
    if (goal) {
        goal.innerHTML = String(newGoal);
    }
    return;
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
