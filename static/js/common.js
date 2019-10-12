function getQueryString() {
  let  ShengUtils = {};
  ShengUtils.decode=function(zipStr){
    var uzipStr="";
    for(var i=0;i<zipStr.length;i++){
      var chr = zipStr.charAt(i);
      if(chr == " "){
        uzipStr+="+";
      }else
      if(chr=="%"){
        var asc = zipStr.substring(i+1,i+3);
        if(parseInt("0x"+asc)>0x7f){
          uzipStr+=decodeURI("%"+asc.toString()+zipStr.substring(i+3,i+9).toString()); ;
          i+=8;
        }else{
          uzipStr+=ShengUtils.AsciiToString(parseInt("0x"+asc));
          i+=2;
        }
      }else{
        uzipStr+= chr;
      }
    }
    return uzipStr;
  };
  ShengUtils.StringToAscii=function(str){
    return str.charCodeAt(0).toString(16);
  }
  ShengUtils.AsciiToString = function(asccode){
    return String.fromCharCode(asccode);
  }
  let href = ShengUtils.decode(window.location.href)
  // let href = ShengUtils.decode('http://61.141.223.10:9080/yygl/#/xmgk-xmgk?appcode=XwNwVqtk1jWzI/p4w2FPrVwx8yQdTsklN2sl8QtI5j8=&pk_org=mb6CNYe6RJjMfl3Kh6OkEQpAEBtlI62++5Kv8JQZMdk=&cuserid=JBb97Pmbd7XfWoDjlQwZpwQFPUxq86NkXVorb9YQwdkKQBAbZSOtvvuSr/CUGTHZ')
  if(href){

    let  decodeResult =ShengUtils.decode(href)
    if(decodeResult){

      if(decodeResult.indexOf('&') != -1){

        return decodeResult.split('&')[2].split('=')[1];
      }

    }
  }

}
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}



function delCookie(name)
{
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
