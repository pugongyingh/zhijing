function IsPC()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone",  "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function do_redirt(flag){ // true  手机端    false pc端

    if(IsPC()){
        if(flag==true){
            window.location.href = 'index-2.html' ;
        }
    }else{
        if(flag==false){
            window.location.href = 'phone/index.html' ;
        } 
    }   

}
