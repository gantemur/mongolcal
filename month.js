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

function month(Y,M,L) {
var att={};
attrib_year(Y,att);
var attm={};
attrib_month(Y,M,attm);
ss="<h3>"+att.cycle+"-р жарны "+att.elcor+" "+att.animalin+" жилийн "
+mmn[M-1]+" "+(L?" илүү ":" ")+"сар<br/>("
+Numbern[attm.number-1]+" "+attm.colour9+" мэнгэтэй, "+attm.elcor+" "+attm.animal+" сар)</h3>"
var j1=first_day_jd(Y,M,L);
var jj=julian_day(Y,M,L,30);
var jm1 = find_moon_ra(j1-1,jj,MICHID.RAR);
var jm2 = find_moon_ra(jj-5,jj+1,MICHID.RAR);
mich2 = true;
if (jm2<-EPOCH.JD) mich2 = false; 
if (Math.abs(jm1-jm2)<25) mich2 = false; -EPOCH.JD
ss+="<p>";
var jnew = find_newmoon(j1-3,j1+3,0);
var sd = JSDate(jnew);
ss+="&nbsp;&nbsp;&#x1F311;&nbsp;саран шинэчлэгдэх мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jnew+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
var jj=julian_day(Y,M,L,7);
jnew = find_event(jj-3,jj+3,0.25);
sd = JSDate(jnew);
ss+="&nbsp;&nbsp;&#x1F313;&nbsp;тал саран гарах мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jnew+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
jj=julian_day(Y,M,L,15);
jnew = find_event(jj-3,jj+3,0.5);
sd = JSDate(jnew);
ss+="&nbsp;&nbsp;&#x1F315;&nbsp;тэргэл саран гарах мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jnew+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
jj=julian_day(Y,M,L,22);
jnew = find_event(jj-3,jj+3,0.75);
sd = JSDate(jnew);
ss+="&nbsp;&nbsp;&#x1F317;&nbsp;тал саран гарах мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jnew+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
jj=julian_day(Y,M,L,30);
jnew = find_newmoon(jj-3,jj+3,0);
sd = JSDate(jnew);
ss+="&nbsp;&nbsp;&#x1F311;&nbsp;саран шинэчлэгдэх мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jnew+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
sd = JSDate(jm1);
ss+="&nbsp;&nbsp;&#x2728;&nbsp;мичид тохиох мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jm1+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
if (mich2) {
sd = JSDate(jm2);
ss+="&nbsp;&nbsp;&#x2728;&nbsp;дараагийн мичид тохиох мөч ";
ss+=Roman12[sd.getMonth()]+"/"+((sd.getDate()<=9)?"0":"")+possessive_form(sd.getDate())+" өдрийн ";
ss+=((sd.getHours()<=9)?"0":"")+sd.getHours()+"ц "+((sd.getMinutes()<=9)?"0":"")+sd.getMinutes()+"м орчимд";
sd = JSDate(jm2+8/24);
ss+=" (УБ өвлийн цагаар "+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м)<br/>";
}
ss+="</p>";
var g={};
jd2g(j1,g);
var dy=g.day;
var mo=g.month;
var yr=g.year;
d="312831303130313130313031";
leap=false;
if (yr/4==Math.floor(yr/4)) leap=true;
if (yr/100==Math.floor(yr/100)) leap=false;
if (yr/400==Math.floor(yr/400)) leap=true;
if (leap) d="312931303130313130313031";
var ld=eval(d.substring(mo*2-2,mo*2));

var today = new Date();
var ddd = today.getDate();
var mmm = today.getMonth()+1;
var yyy = today.getFullYear();
var jjj = g2jdn(yyy,mmm,ddd);
ss+="<TABLE><TR><TD><b>өдөр</b></TD>";
ss+="<TD ALIGN=CENTER><b>өнгө</b></TD>";
ss+="<TD ALIGN=CENTER><b>гариг</b></TD>";
ss+="<TD><b>аргын тооллоор</b></TD>";
ss+="<TD ALIGN=CENTER><b>мэнгэ</b></TD>";
ss+="<TD ALIGN=CENTER><b>суудал</b></TD>";
ss+="<TD ALIGN=CENTER><b>сарны өнцөг</b></TD>";
ss+="<TD ALIGN=CENTER><b>&nbsp;дүүрэлт&nbsp;</b></TD>";
ss+="<TD ALIGN=CENTER><b>&nbsp;цэх мандал</b></TD></TR>";

var a={};
bb=0;
var ctr=1;
var dd=1;
var j=0;
jd=j1;
j1--;

while (dd<=30) {
j=julian_day(Y,M,L,dd);
if (j1==j) {dd++; continue;}
else if (j==j1+1) {j1=j;ctr=dd;dd++;}
else {j1=j-1;ctr=dd;}
p = moonphase_fast(j-2451545-1/3);
ra = moon_ra(j-2451545-1/3);
attrib_day(jd,a);
var sa="";
var sb="";
if (jd==jjj) {sa = "<b><FONT COLOR='blue'>"; sb = "</FONT></b>"; }
ss+="<TR BGCOLOR="+bgcol[bb]+">";bb=1-bb;
ss+="<TD ALIGN=CENTER>"+sa+ctr+sb+"</TD>";
ss+="<TD ALIGN=CENTER>"+a.elcor+" "+Animal[a.animal-1]+"</TD>";
ss+="<TD ALIGN=CENTER>"+Dlong[a.day]+"</TD>";
ss+="<TD ALIGN=CENTER>"+sa+yr+"."+((mo<10)?"0":"")+mo+"."+((dy<10)?"0":"")+dy+sb+"</TD>";
ss+="<TD ALIGN=CENTER>"+Numbern[a.number-1]+" "+a.colour9+"</TD>";
ss+="<TD ALIGN=CENTER>"+Element8[a.trigram-1]+"</TD>";
ss+="<TD ALIGN=CENTER>"+Math.round((0.5-Math.abs(p-0.5))*360)+"&deg;</TD>";
ss+="<TD ALIGN=CENTER>"+Math.round((1-Math.cos(p*Math.PI*2))*5000)/100+"%</TD>";
ss+="<TD ALIGN=CENTER>"+Math.round(ra*360)+"&deg;</TD>";
ss+="</TR>";
j++;
dy++; 
jd++;
if (dy>ld) {dy=1; mo++; ld=eval(d.substring(mo*2-2,mo*2));}
if (mo>12) {yr++; mo=1; ld=eval(d.substring(mo*2-2,mo*2));}
}
ss+="</TABLE>";
ss+="<ul><li>'Сарны өнцөг' гэдгээр нар сарны харагдах чиглэлүүдийн хоорондох өнцгийг товчлон тэмдэглэв.</li>";
ss+="<li>Сарны байрлалыг Улаанбаатарын цагаар тухайн өдрийн үд дундаар баримжаалсан.</li>";
ss+="<li>Мичид тохиох гэдэг нь сар мичид зургаатай харгалдаа ирэхийг хэлнэ.</li></ul>";
return ss;
}
