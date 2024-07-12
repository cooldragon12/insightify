function generateSimplify(){
    var text = document.getElementById("input-text");
    var response = document.getElementsByName("message");

    fetch("generate.php",{
        method:"post",
        body:JSON.stringify({
            text: text.value,
        }),
    }).then(function(response){
        return response.text();
    }).then(function(data){
        return data;
    })
}