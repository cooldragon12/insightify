function Gotoentries(clicked_id){

    $.ajax({
        type : "POST",  //type of method
        url  : "",  //your page
        data : { id : clicked_id },// passing the values
        success: function(res){  
                    location.href="./entries.php";
                }
    });

    
}