




var inputt = document.getElementById("mailInput");

function validation() {
    var form = document.getElementById('form');
    var email = document.getElementById('mailInput').value;
    var text = document.getElementById("mail-error");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.match(pattern))
    {
        inputt.style.border = "hsl(223, 100%, 88%) solid thin";
        text.textContent = "Votre courrier a été soumis";
        text.style.color = "green";
        text.style.display = "block";
        document.getElementById("btn").style.marginBottom = "1.3rem";
    }

    else
    {
        inputt.style.border = "hsl(354, 100%, 66%) solid thin";
        document.getElementById("btn").style.marginBottom = "1.3rem";
        text.textContent = "Veuillez fournir une adresse email valide";

        text.style.display = "block";
        text.style.color = "hsl(354, 100%, 66%)"
    }
}
inputt.style.border = "hsl(223, 100%, 88%) solid thin";
