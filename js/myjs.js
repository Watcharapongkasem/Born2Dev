(function (global){
    var item = {};
    var HomePage = "Homepage.html";
    var sportPage = "sport.html";
    var imgP="img-ABC.html"
    var dataSport = "data.txt";
    var data_h = "0";
    var data_w = "0";
    var BMI = 0;

    function CalBMI(w,h){
        if (w == "" || h == ""){
            return parseInt(0);
        }else{
            var result =(parseInt(w)/Math.pow(parseInt(h)/100,2)).toFixed(2);
            if (result == "Infinity") {
                return 0;
            }else{
                return result;
            }
        }
    }

    //replace some text 
    function insertname(url,text,value){
        var txtHTML = "{{" + text + "}}";
        url = url.replace(new RegExp(txtHTML,"g"),value);
        return url;
    }

    // innerHTML
    function insertHTML(selector,HTML){
        document.getElementById(selector).innerHTML = HTML;
    }
    // reload 
    document.addEventListener("DOMContentLoaded", function (event){
        $ajax.getrequest(HomePage,ShowHomepage)
        alert("กรอกข้อมูล 1.น้ำหนัก หน่วย Kg  2.ส่วนสูง หน่วย cm ");
    });

    function ShowHomepage(home){
        insertHTML("content",home);
        
        // collect data height
        document.querySelector("input#Weight").addEventListener("input", function(eventW){
            data_w =eventW.target.value;
            chcolur='<div class="alert alert-secondary" role="alert">';
            BMI = CalBMI(data_w,data_h);
            if (BMI>0 && BMI<18.5){
                chcolur='<div class="alert alert-warning" role="alert">';
            }else if (BMI>=18.5 && BMI<=24.9){
                chcolur='<div class="alert alert-success" role="alert">';
            }else if (BMI>24.9){
                chcolur='<div class="alert alert-danger" role="alert">';
            }else if (BMI==0){
                chcolur='<div class="alert alert-secondary" role="alert">';
            }     
            if(BMI != "NaN"){
                insertHTML("calBMI",chcolur+"BMI : "+BMI+"</div>");
            }else{
                insertHTML("calBMI",chcolur+"กรุณากรอกข้อมูลเป็นตัวเลข"+"</div>");
            }  
            $ajax.getrequest(sportPage,Showsport);               
        });
        document.querySelector("input#Height").addEventListener("input", function(eventH){
            data_h =eventH.target.value;
            BMI = CalBMI(data_w,data_h);
            chcolur='<div class="alert alert-secondary" role="alert">';
            if (BMI>0 && BMI<18.5){
                chcolur='<div class="alert alert-warning" role="alert">';
            }else if (BMI>=18.5 && BMI<=24.9){
                chcolur='<div class="alert alert-success" role="alert">';
            }else if (BMI>24.9){
                chcolur='<div class="alert alert-danger" role="alert">';
            }else if (BMI==0){
                chcolur='<div class="alert alert-secondary" role="alert">';
            }
            if(BMI != "NaN"){
                insertHTML("calBMI",chcolur+"BMI : "+BMI+"</div>");
            }else{
                insertHTML("calBMI",chcolur+"กรุณากรอกข้อมูลเป็นตัวเลข"+"</div>");
            }            
            
            $ajax.getrequest(sportPage,Showsport);
        });        
    }

    function Showsport (sportHTML) {
        $ajax.getrequest(dataSport,function(data){
            if (BMI>0){
                document.getElementById("sportdata").innerHTML = sportHTML;
                $ajax.getrequest(imgP,function(imh){
                    let nameF = "";
                    let workout = [];
                    let l =[];
                    if (BMI<18.5){
                        nameF="A";
                        workout[0]="ออกกำลังที่มีแรงต้าน";
                        l[0]="gjRnm_wmArY";
                        workout[1]="โยคะ";
                        l[1]="_79I7KRzYUQ";
                        workout[2]="เพิ่มปริมาณอาหาร";
                        l[2]="VYZfswfLVUI";
                    }else if (BMI>=18.5 && BMI<=24.9){
                        nameF="B";
                        workout[0]="ออกกำลังที่มีแรงต้าน";
                        l[0]="gjRnm_wmArY";
                        workout[1]="วิ่ง";
                        l[1]="0c5QU_-QErg"
                        workout[2]="ควบคุมปริมาณอาหาร";
                        l[2]="wgd6B0LN2GI";
                    }else if (BMI>24.9){
                        nameF="C"
                        workout[0]="เดินออกกำลังกาย";
                        l[0]="y0Z0mf5-rKo"
                        workout[1]="ปั่นจักรยาน";
                        l[1]="qZ21dtKPB3Q"
                        workout[2]="ควบคุมปริมาณอาหาร";
                        l[2]="wgd6B0LN2GI";
                    }
                    var head_res = "<div><h3>Recommend</h3></div>";
                    var res =imh;
                    for (var i=0; i<3; i++){
                        res = insertname(res,"a",workout[i]);
                        res = insertname(res,"folder",nameF);
                        res = insertname(res,"rail",l[i]);
                        res = insertname(res,"chJG",i+1)
                        if (i!=2){
                            res += imh;
                        }                        
                    }
                    /*
                    var res = insertname(imh,"folder",nameF);                    
                    res=insertname(res,"a",workout[0]);
                    res=insertname(res,"b",workout[1]); 
                    res=insertname(res,"c",workout[2]);   */                
                    document.getElementById("imgRes").innerHTML =head_res+res;
                });            
            }else{
                document.getElementById("sportdata").innerHTML = "";
            }
    });
    }

    
})(window);