var flg=0;
var fst=3;
var fs=3;
var fsg=1;
var bg="white";
var mbg='FFE0FF';
var col=["red","blue"];
var bgcol=['FFFFCC','CCFFFF'];
var cc=0;
var Mlong=["Нэг сарын","Хоёр сарын","Гэрван сарын","Дөрвөн сарын","Таван сарын","Зургаан сарын","Долоон сарын","Найман сарын","Есөн сарын","Арван сарын","Арваннэгэн сарын","Арванхоёр сарын"];
var Mmn=["Хаврын тэргүүн","Хаврын дунд","Хаврын сүүл","Зуны эхэн","Зуны дунд","Зуны сүүл","Намрын эхэн","Намрын дунд","Намрын сүүл","Өвлийн эхэн","Өвлийн дунд","Өвлийн сүүл"];
var Dshort=["Ня","Да","Мя","Лх","Пү","Ба","Бя"];
var Dlong=["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"];
var Seas=["хавар","зун","намар","өвөл"];

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
var jnew = find_newmoon(njd-3,njd+3,0);
var sd = JSDate(jnew+8/24);
sss+="<li>Шинийн саран битүүрэх/шинэчлэгдэх агшин: Улаанбаатарын цагаар ";
sss+=sd.getUTCFullYear()+" оны "+(sd.getUTCMonth()+1)+" сарын "+possessive_form(sd.getUTCDate());
sss+=" өдрийн "+((sd.getUTCHours()<9)?"0":"")+sd.getUTCHours()+" цаг "+((sd.getUTCMinutes()<9)?"0":"")+sd.getUTCMinutes()+" минутын орчимд.</li>";
if (leap_year(Y)) { sss+="<li>Энэ жилийн "+Seas[Math.floor((leap_month_number(Y)-1)/3)]+" <i>илүү сартай</i>.</li>"}
else {sss+="<li>Энэ нь ердийн (илүү саргүй) жил тул 12 сартай.</li>"}
//sss+="<p>Жилийн мэнгэ нь "+att.number+" "+att.colour9+".";
if (cal_type!=2) sss+="<li>Энэ жил Төвдийн "+tibetan_year(Y)+" онд харгалзана.<li>";
sss+="<li>'Билгийн жилийн дугаар' гэдгээр тухайн билгийн жилийн ихэнх нь багтдаг аргын жилийн дугаарыг ойлгоно. Жишээлбэл, аргын 2016 оны 1-р сар бүхлээрээ билгийн 2015 дугаартай жилд хамаарна.</li>";
sss+="<li>Дорх календарьт хаалтанд байгаа тоонууд аргын тооллын өдрийг заана.</li></ul>"
return sss;
}

function year(Y) {
var b = {};
b.Y=Y;
b.M=1;
b.L=0;
N=12;
if (leap_month(Y,1)) {
	b.L=1;
}
var c = {};
var sss="<p><TABLE BORDER=0><TR><TD VALIGN=TOP>";
sss+=Calendar(b);
sss+="</TD><TD VALIGN=TOP>";
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD></TR>";
sss+="<TR><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD></TR>";
sss+="<TR><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD></TR>";
sss+="<TR><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD><TD VALIGN=TOP>";
b = c;
next_month(b.Y,b.M,b.L,c);
sss+=Calendar(c);
sss+="</TD></TR>";
if (leap_year(Y)) {
	sss+="<TR><TD VALIGN=TOP>";
	b = c;
	next_month(b.Y,b.M,b.L,c);
	sss+=Calendar(c);
	sss+="</TD></TR>";
}
sss+="</TABLE></p>";

return sss;
}

function Calendar(bgn){
var ss="";
var today = new Date();
var ddd = today.getDate();
var mmm = today.getMonth()+1;
var yyy = today.getFullYear();
var jjj = g2jdn(yyy,mmm,ddd);
var j1=first_day_jd(bgn.Y,bgn.M,bgn.L);
var g={};
var att={};
var tmp={};
attrib_month(bgn.Y,bgn.M,att);
jd2g(j1,g);
dw=(j1+1)%7;
dy=g.day;
yr=g.year;
d="312831303130313130313031";
leap=false;
if (yr/4==Math.floor(yr/4)) leap=true;
if (yr/100==Math.floor(yr/100)) leap=false;
if (yr/400==Math.floor(yr/400)) leap=true;
if (leap) d="312931303130313130313031";
var mo=g.month;
var ld=eval(d.substring(mo*2-2,mo*2));
ss+="<TABLE"
+" BGCOLOR='"+bg
+"'><TR><TD ALIGN=CENTER COLSPAN=7 BGCOLOR="+mbg+">"
+"<FONT SIZE="+fst+"><b>"+Mmn[bgn.M-1]+(bgn.L?" илүү ":" ")+"сар</b><br/>"+att.elcor+" "+att.animal+", "+Numbern[att.number-1]+" "+att.colour9+" мэнгэтэй<br/>"
+"аргын тооллоор "+yr+"."+(mo<10?"0":"")+mo+"."+(dy<10?"0":"")+dy+"-нд эхэлнэ"
+"</FONT></TD></TR><TR><TR>";
for (var i=0;i<7;i++){
ss+="<TD ALIGN=CENTER>"
+"<FONT SIZE=1>"+Dshort[i]+"</FONT></TD>";
 }
ss+="</TR><TR>";
var ctr=1;
var dd=1;
var j=0;
var i=0;
var ccc;
j1--;
while (i<dw){
ss+="<TD ALIGN=CENTER>"
+"<FONT SIZE="+fs+"> </FONT>"
+"</TD>";
i++;
}
while (dd<=30){
if (i>6) {i=0; ss+="</TR><TR>";}
j=julian_day(bgn.Y,bgn.M,bgn.L,dd);
if (j1==j) {dd++; cc=1-cc; continue;}
else if (j==j1+1) {j1=j;ccc=cc;ctr=dd;dd++;}
else {j1=j-1;ccc=1-cc;ctr=dd;}
var sa="";
var sb="";
if (j==jjj) {sa = "<b>"; sb = "</b>"; }
ss+="<TD ALIGN=CENTER BGCOLOR="+bgcol[cc]+">"
+"<FONT SIZE="+fs+" COLOR='"+(i<5?col[1]:col[0])+"'>"+sa+ctr+sb+"  </FONT><FONT SIZE="+fsg+">("+sa+dy+sb+")</FONT>"
+"</TD>";
cc=ccc;
j++;
dy++; 
if (dy>ld) {dy=1; mo++; ld=eval(d.substring(mo*2-2,mo*2));}
if (mo>12) {yr++; mo=1; ld=eval(d.substring(mo*2-2,mo*2));}
i++;
}
while (i<7){
ss+="<TD ALIGN=CENTER>"
+" </TD>";
i++;
}
ss+="</TR></TABLE>";
return ss;
}

