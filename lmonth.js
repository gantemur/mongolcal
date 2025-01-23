var flg=0;
var fst=3;
var fs=3;
var fsg=1;
var bg="white";
var mbg='FFE0FF';
var col=["red","blue"];
var bgcol=['FFFFCC','CCFFFF'];
var mmn=["хаврын тэргүүн","хаврын дунд","хаврын сүүл","зуны эхэн","зуны дунд","зуны сүүл","намрын эхэн","намрын дунд","намрын сүүл","өвлийн эхэн","өвлийн дунд","өвлийн сүүл"];
var Dlong=["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"];
var Seas=["хавар","зун","намар","өвөл"];
var Roman12=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

function possessive_form(n) {
var m=n%10;
if (m==1||m==4||m==9) return n+"-ний"; else return n+"-ны";
}

function year_string(Y) {
var njd=new_year_jd(Y);
var g={};
jd2g(njd,g);
var att={};
attrib_year(Y,att);
var today = new Date();
var ddd = today.getDate();
var mmm = today.getMonth()+1;
var yyy = today.getFullYear();
var nnn="но";
if (g.year<yyy) nnn="сон";
else if (g.year==yyy) if (g.month<mmm) nnn="сон";
else if (g.month==mmm) if (g.day<ddd) nnn="сон";
else if (g.day==ddd) nnn="ж байна";
var sss="<p><ul><li>"+att.cycle+"-р жарны "+att.year+" он буюу "+Numbern[att.number-1]+" "+att.colour9+" мэнгэтэй <b>"+att.elcor+" "+att.animalin+" жилийн</b> цагаан сарын шинийн нэгэн <b>"+Y+" оны "+g.month+" сарын "+possessive_form(g.day)+" "+Dlong[(njd+1)%7]+"</b> гаригт бол"+nnn+".</li>";
if (leap_year(Y)) { sss+="<li>Энэ жилийн "+Seas[Math.floor((leap_month_number(Y)-1)/3)]+" <i>илүү сартай</i>.</li>"}
else {sss+="<li>Энэ нь ердийн (илүү саргүй) жил тул 12 сартай.</li>"}
//sss+="<p>Жилийн мэнгэ нь "+att.number+" "+att.colour9+".";
if (cal_type!=2) sss+="<li>Энэ жил Төвдийн "+tibetan_year(Y)+" онд харгалзана.<li>";
sss+="<li>'Билгийн жилийн дугаар' гэдгээр тухайн билгийн жилийн ихэнх нь багтдаг аргын жилийн дугаарыг ойлгоно. Жишээлбэл, аргын 2016 оны 1-р сар бүхлээрээ билгийн 2015 дугаартай жилд хамаарна.</li></ul>";
return sss;
}

function lunarmonth(Y,M,L) {
var att={};
attrib_year(Y,att);
ss="<h3>"+att.cycle+"-р жарны "+att.elcor+" "+att.animalin+" жилийн "
+mmn[M-1]+" "+(L?" илүү ":" ")+"сар<br/></h3>"
var j1=first_day_jd(Y,M,L);
var jj=julian_day(Y,M,L,30);

var today = new Date();
var ddd = today.getDate();
var mmm = today.getMonth()+1;
var yyy = today.getFullYear();
var jjj = g2jdn(yyy,mmm,ddd);
ss+="<TABLE><TR><TD><b>сарны өнцөг</b></TD>";
ss+="<TD ALIGN=CENTER><b>&nbsp;дүүрэлт&nbsp;</b></TD>";
ss+="<TD ALIGN=CENTER><b>аргын өдөр</b></TD>";
ss+="<TD><b>цаг минут</b></TD>";
ss+="<TD ALIGN=CENTER><b>&nbsp;цэх мандал</b></TD></TR>";

var bb=0;
var dd=0;

while (dd<=30) {
var p = dd/30;
var j = find_event(j1+dd-3,j1+dd+2,p);
if (dd<5) j = find_newmoon(j1+dd-3,j1+dd+2,p);
if (dd>25) j = find_newmoon(j1+dd-3,j1+dd+2,p-1);
var sd = JSDate(j);
ra = moon_ra(j-2451545);
var sa="";
var sb="";
if (Math.floor(j)==jjj) {sa = "<b><FONT COLOR='blue'>"; sb = "</FONT></b>"; }
ss+="<TR BGCOLOR="+bgcol[bb]+">";bb=1-bb;
ss+="<TD ALIGN=CENTER>"+dd*12+"&deg;"+"</TD>";
ss+="<TD ALIGN=CENTER>"+Math.round((1-Math.cos(p*Math.PI*2))*5000)/100+"%</TD>";
ss+="<TD ALIGN=CENTER>"+sa+sd.getFullYear()+"."+(sd.getMonth()+1)+"."+sd.getDate()+sb+"</TD>";
ss+="<TD ALIGN=CENTER>"+((sd.getHours()<=9)?"0":"")+sd.getHours()+":"+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"</TD>";
ss+="<TD ALIGN=CENTER>"+Math.round(ra*360)+"&deg;</TD>";
ss+="</TR>";
dd++;
}
ss+="</TABLE>";
ss+="<ul><li>'Сарны өнцөг' гэдгээр нар сарны харагдах чиглэлүүдийн хоорондох өнцгийг товчлон тэмдэглэв.</li></ul>";
return ss;
}
