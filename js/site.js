function displayMessage() {
    let msg = ""

    msg = document.getElementById("message").value;

    alert(msg);
}

function displayMessage2() {
    let msg = "";

    msg = document.getElementById("message").value;

    Swal.fire(msg);

}