
function toggleAddCourse() {
    document.getElementById("courseAddOverlay")!.style.display = (document.getElementById("courseAddOverlay")!.style.display === "block" ? "none" : "block");
}

function parsePDF(inputID: string) {
    const input = document.getElementById(inputID)! as HTMLInputElement;
    const file = input!.files![0];
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/pdfparse", true);
    xmlhttp.onreadystatechange = function() {
        console.log("XML!");
    };
    xmlhttp.send(file);

}
