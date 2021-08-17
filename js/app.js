(function(global){
    var ajaxfunction ={};
    ajaxfunction.getrequest = function (requestUrl,responseUrl){    
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (request.readyState == 4){
                responseUrl(request.responseText);
            }
        }
        request.open("GET",requestUrl,true);
        request.send(null);
    }
    global.$ajax = ajaxfunction
})(window)



