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
            document.getElementsByClassName("text-ime")[0].innerHTML=res.ime;
        }
    }

    ajax.open("GET", '/statistika/student', true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function UcitajPodatkeStudent() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            var res=JSON.parse(ajax.responseText);

            document.getElementById("index-p").innerHTML+=" "+res.index;
            document.getElementById("link").href=res.bitbucket;
            document.getElementById("imeprezime-p").value=res.name;
            document.getElementById("korisnicko-p").value=res.username;
            document.getElementById("grupa-p").value=res.grupa;
            document.getElementById("url-p").value=res.bitbucket;
            document.getElementById("ssh-p").value=res.ssh;
            document.getElementById("repo-p").value=res.repo;
        }
    }

    ajax.open("GET", '/profil/podaci', true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}