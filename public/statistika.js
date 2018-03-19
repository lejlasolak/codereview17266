function popuniKomentare(page){

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {

        if (ajax.readyState === 4 && ajax.status === 200) {

            document.getElementById("brspirale").innerHTML="Spirala "+page;

            var res=JSON.parse(ajax.responseText);
            var kom=document.getElementsByClassName("komentar");

            for(var i=0;i<kom.length;i++) {

                kom[i].innerHTML = "";
                if(res[i]!==undefined)
                kom[i].innerHTML = res[i];
            }
        }
    }

    ajax.open("GET", "/statistika/"+page, true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
}

function changeActive(id){

    var btns=document.getElementsByClassName("p");
    for(var i=0;i<btns.length;i++){
        btns[i].style.backgroundColor="#E4FDE1";
        btns[i].style.color="#114B5F";
    }

    document.getElementById(id.toString()).style.backgroundColor="#D8262E";
    document.getElementById(id.toString()).style.color="#FDFFFC";
}