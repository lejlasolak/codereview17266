function Load(pageName)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState === 4 && xhttp.status === 200)
            document.getElementById("podstranice-container").innerHTML = xhttp.responseText;
    }
    xhttp.open("GET", "/"+pageName, true);
    xhttp.send();
}

function UcitajIme() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            var res=JSON.parse(ajax.responseText);
            var ime=document.getElementsByClassName("text-ime");

            ime[0].innerHTML=res.ime;
        }
    }

    ajax.open("GET", '/statistika/student', true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}