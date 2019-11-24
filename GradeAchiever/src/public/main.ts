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
            UpdateHTML("gradegoal", newGrade);
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
 * changeGradeGoal by sending fetch request with course id and new goal
 */
function changeDifficulty(courseID: number) {
    // Cast to input element to get value.
    const newGradeElement = document.getElementById("diffinput") as HTMLInputElement;
    if (newGradeElement) {
        const newDiff: number = Number(newGradeElement.value);
        /* Verify user input */
        if (!verifyNewDiff(newDiff)) { return; }
        const body = {
            newDiff,
            courseID,
        };
        fetch("/editDifficulty", {
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
            UpdateHTML("diff", newDiff);
        })
        .catch(function(error) {
            console.log(error);
            return error;
        })
        .finally(function() {
            doneEditDifficulty();
        });
    }
}

/**
 * Change course name by sending fetch request with course id and new name
 */
function changeName(courseID: number) {
    // Cast to input element to get value.
    const newNameElement = document.getElementById("nameinput") as HTMLInputElement;
    if (newNameElement) {
        const newName: string = String(newNameElement.value);
        const body = {
            newName,
            courseID,
        };
        fetch("/editCourseName", {
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
            UpdateHTML("name", newName);
        })
        .catch(function(error) {
            console.log(error);
            return error;
        })
        .finally(function() {
            doneEditCourseName();
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

/*
 * Verifies new diff is a number between 1 and 5
 */
function verifyNewDiff(newDiff: number) {
    if (!newDiff || (isNaN(newDiff) || (newDiff > 5 || newDiff < 1))) {
        alert("Please enter a number between 1 and 5");
        return false;
    } else {
        return true;
    }
}

/** Updated edited html */
function UpdateHTML(id: string, newUpdate: any) {
    const goal = document.getElementById(id);
    if (goal) {
        goal.innerHTML = String(newUpdate);
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
 * Create prompt for user input
 */
function editDifficulty() {
    hideElementbyID(document.getElementById("diff"));
    showElementbyID(document.getElementById("difficultyinput"));
    hideElementbyID(document.getElementById("editdiff"));
    showElementbyID(document.getElementById("submitdiff"));
}

/**
 * Create prompt for user input
 */
function editCourseName() {
    hideElementbyID(document.getElementById("editname"));
    showElementbyID(document.getElementById("nameinput"));
    showElementbyID(document.getElementById("submitname"));
}

/**
 * Create prompt for user input
 */
function doneEditCourseName() {
    showElementbyID(document.getElementById("editname"));
    hideElementbyID(document.getElementById("nameinput"));
    hideElementbyID(document.getElementById("submitname"));
}

/**
 * Hide goal prompt
 */
function doneEditDifficulty() {
    hideElementbyID(document.getElementById("difficultyinput"));
    hideElementbyID(document.getElementById("submitdiff"));
    showElementbyID(document.getElementById("diff"));
    showElementbyID(document.getElementById("editdiff"));
}

/**
 * Hide difficulty prompt
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

function toggleAddCourse() {
    document.getElementById("courseAddOverlay")!.style.display = (document.getElementById("courseAddOverlay")!.style.display === "block" ? "none" : "block");
}


function toggleAddGradableItem() {
    document.getElementById("GradableItemAddOverlay")!.style.display = (document.getElementById("GradableItemAddOverlay")!.style.display === "block" ? "none" : "block");
}