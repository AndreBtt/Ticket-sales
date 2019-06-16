$(document).ready(function() {



})

function display(id) {
    for(let i = 0; i < 10; i++) {
        if(i == id) continue
        if($("#" + i).not(":hidden")) {
            $("#" + i).hide(1000);
        }
    }

    if($("#" + id).is(":hidden")){
        $("#" + id).show(1000);
    } else{
        $("#" + id).hide(1000);
    }
}