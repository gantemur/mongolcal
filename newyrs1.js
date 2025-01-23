var flg=0;
var fst=3;
var fs=3;
var fsg=1;
var bg="white";
var mbg='FFE0FF';
var col=["red","blue"];
var bgcol=['FFFFCC','CCFFFF'];

function newyrs(y1,y2) {
var ss="<TABLE><TR><TD><b>он</b></TD>";
ss+="<TD ALIGN=CENTER><b>сар</b></TD>";
ss+="<TD ALIGN=CENTER><b>өдөр</b></TD>";
ss+="</TR>";

var att={};
var a={};
var g={};
bb=0;

for (y=y1;y<=y2;++y) {
j=new_year_jd(y);
jd2g(j,g);
attrib_year(y,att);
attrib_day(j,a);
var jnew = find_newmoon(j-3,j+3,0);
var sd = JSDate(jnew+8/24);
var j1 = find_newmoon(j-3,j+3,1.0/30);
var sd1 = JSDate(j1+8/24);

ss+="<TR BGCOLOR="+bgcol[bb]+">";bb=1-bb;
ss+="<TD ALIGN=CENTER>"+y+"</TD>";
ss+="<TD ALIGN=CENTER>"+g.month+"</TD>";
ss+="<TD ALIGN=CENTER>"+g.day+"</TD>";
ss+="</TR>";
}
ss+="</TABLE>"
return ss;
}
