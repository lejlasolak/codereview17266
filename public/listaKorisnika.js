function Korisnici(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (xhttp.readyState === 4 && xhttp.status === 200)
            if(document.getElementById("lista"))
                document.getElementById("tabela").innerHTML += KreirajTabeluKorisnika(JSON.parse(xhttp.responseText));
    }
    xhttp.open("GET", "/korisnici", true);
    xhttp.send();
}

function Pretrazi(korisnicko) {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {
            document.getElementsByTagName('tbody')[0].innerHTML='';
            document.getElementsByTagName('tbody')[0].innerHTML=KreirajTabeluPretrage(JSON.parse(ajax.responseText));
        }
    }

    ajax.open("GET", "/korisnici/search/?username="+korisnicko, true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function VerifyUnverify(id, verify){

    var v="verify";
    if(!verify) v="unverify"

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {
            document.getElementById("tabela").removeChild( document.getElementsByTagName("tbody")[0]);
            Korisnici();
            return;
        }
    }
    ajax.open("PUT", "/korisnici/?id="+id+'&'+'verification='+v, true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function DeleteUser(id) {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            alert(ajax.responseText);
            document.getElementById("tabela").removeChild( document.getElementsByTagName("tbody")[0]);
            Korisnici();
            return;
        }
    }

    ajax.open("DELETE", "/korisnici/"+id, true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function Delete(id) {

    if (confirm("Are you sure you want to delete this user?")) DeleteUser(id);
    else return;
}

function Details(id) {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            var k=JSON.parse(ajax.responseText);
            document.getElementById("zajednicki").style.display="block";

            if(k.role.roles === "student") {

                document.getElementById("studentski").style.display="block";
                document.getElementById("nastavnicki").style.display="none";


            }

            else {

                document.getElementById("studentski").style.display="none";
                document.getElementById("nastavnicki").style.display="block";

            }
        }
    }

    ajax.open("GET", "/korisnici/details/"+id, true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function KreirajTabeluPretrage(korisnik){

    var red = '<tbody>' + popuniRed(korisnik);
    if (korisnik.role.roles === 'nastavnik') {

        if (korisnik.verified == false) red += '<td><button class="verify" onClick="VerifyUnverify(' + korisnik.id + ',' + true + ')">Verify</button></td>';
        else red += '<td><button class="unverify" onClick="VerifyUnverify(' + korisnik.id + ',' + false + ')">Unverify</button></td>';
    }
    else red += '<td></td>';
    red+='<td><button class="delete" onClick="Delete('+ korisnik.id+')">Delete</button></td>'+
        '<td><button class="details" onClick="Details('+ korisnik.id+')">Details</button></td><tr></tbody>';
    return red;
}

function KreirajTabeluKorisnika(korisnici) {

    var ispis = '';
    var redovi = [];
    redovi.push('<tbody>');
    korisnici.forEach(function (korisnik) {

        if (korisnik.role.roles !== 'administrator') {
            var red = popuniRed(korisnik);
            if (korisnik.role.roles === 'nastavnik') {

                if (korisnik.verified == false) red += '<td><button class="verify" onClick="VerifyUnverify(' + korisnik.id + ',' + true + ')">Verify</button></td>';
                else red += '<td><button class="unverify" onClick="VerifyUnverify(' + korisnik.id + ',' + false + ')">Unverify</button></td>';
            }
            else red += '<td></td>';
            red+='<td><button class="delete" onClick="Delete('+ korisnik.id+')">Delete</button></td>'+
                '<td><button class="details" onClick="Details('+ korisnik.id+')">Details</button></td><tr>';
            redovi.push(red);
        }
    });
    for (var j = 0; j < redovi.length; j++) ispis += redovi[j];
    ispis += '</tbody>';
    return ispis;
}

function popuniRed(korisnik) {

    return '<tr><td>' + korisnik.personalInfo.ime_i_prezime + '</td>' +
        '<td>' + korisnik.username + '</td>';
}
