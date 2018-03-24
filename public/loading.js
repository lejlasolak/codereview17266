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

function UcitajPodatke() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            var res = JSON.parse(ajax.responseText);

            if (res.role === "student") {

                document.getElementById("index-p").innerHTML += " " + res.index;
                document.getElementById("link").href = res.bitbucket;
                document.getElementById("imeprezime-p").value = res.name;
                document.getElementById("korisnicko-p").value = res.username;
                document.getElementById("grupa-p").value = res.grupa;
                document.getElementById("url-p").value = res.bitbucket;
                document.getElementById("ssh-p").value = res.ssh;
                document.getElementById("repo-p").value = res.repo;
            }
            else if (res.role === "nastavnik") {

                document.getElementById("imeprezime-pp").value = res.name;
                document.getElementById("korisnicko-pp").value = res.username;
                document.getElementById("mail-pp").value = res.email;
                document.getElementById("maxgrupa-pp").value = res.maxgrupa;
                document.getElementById("semestar-pp").value = res.semestar;
                document.getElementById("godina-pp").value = res.godina;
            }
            else {

                document.getElementById("korisnicko-ppp").value = res.username;
            }
        }
    }

    ajax.open("GET", '/profil/podaci', true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}