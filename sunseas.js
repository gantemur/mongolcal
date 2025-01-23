var flg=0;
var fst=3;
var fs=3;
var fsg=1;
var bg="white";
var mbg='FFE0FF';
var col=["red","blue"];
var bgcol=['FFFFCC','CCFFFF'];
var Dlong=["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"];
var Sunseas=["Өчүүхэн хүйтэн","Их хүйтэн","Хаврын уур орох","Хур усны улирал", "Ичигсэд хөдлөх", "Хаврын хугас", "Ханш нээх", "Тариалангийн хур", "Зуны уур орох", "Өчүүхэн дүүрэн", "Буудай боловсрох", "Нар буцах", "Өчүүхэн халуун", "Их халуун", "Намрын уур орох", "Сэрүү орох", "Цагаан хяруу унах", "Намрын хугас", "Хүйтэн шүүдэр унах", "Хяруу унах", "Өвлийн үр унах", "Өчүүхэн цас", "Их цас", "Өвлийн туйл"];
var Roman12=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

function possessive_form(n) {
var m=n%10;
if (m==1||m==4||m==9) return n+"-ний"; else return n+"-ны";
}

function sunseasons(Y) {
var ss="<h3>"+Y+" оны нарны 24 улирал</h3>"
//var ss="";

ss+="<p>Нарны улирлууд нь Дэлхийн тойрог замыг наран дээрээс харахад үүсэх 360&deg; өнцгийг 24 тэнцүү хуваахад үүснэ.";
ss+="<br/>Хаанаас эхэлж тоолох вэ гэвэл өдөр шөнө тэнцэх цэгүүд, эсвэл өвөл зуны туйлуудаас эхэлж тоолж болно.";
ss+="<br/>Эдгээр цэгүүд нь хоорондоо 90&deg; эсвэл 180&deg; өнцөг үүсгэж байрлах тул алинаас нь ч эхэлсэн ялгаагүй юм.";
ss+="</p>";

//var today = new Date(); var ddd = today.getDate(); var mmm = today.getMonth()+1; var yyy = today.getFullYear(); var jjj = g2jdn(yyy,mmm,ddd);

ss+="<TABLE><TR><TD>";
ss+="<TABLE><TR><TD></TD><TD ALIGN=LEFT><b>&nbsp;&nbsp;улирал</b></TD>";
ss+="<TD ALIGN=CENTER><b>эхлэх мөч</b></TD>";
ss+="<TD ALIGN=CENTER><b>үргэлжлэх хугацаа</b></TD>";
ss+="</TR>";
bb=0;

var j1 = g2jdn(Y,1,6);
var j = find_sun_event(j1-4,j1+4,-5*Math.PI/12);

for (i=0;i<24;++i) {
var jj = j1 + Math.round((i+1)*365/24);
jj = find_sun_event(jj-4,jj+4,(i-4)*Math.PI/12);
var d = jj-j;
var h = Math.floor(d*24);
var m = Math.floor((d*24-h)*60);
var sd = JSDate(j+8/24);
j=jj;
var sa="";
var sb="";
if (i%6==5) {sa = "<b><FONT COLOR='purple'>"; sb = "</FONT></b>"; }
ss+="<TR BGCOLOR="+bgcol[bb]+">";bb=1-bb;
ss+="<TD ALIGN=CENTER>"+sa+(i+1)+sb+"</TD>";
ss+="<TD ALIGN=LEFT>"+sa+"&nbsp;"+Sunseas[i]+sb+"</TD>";
ss+="<TD ALIGN=CENTER>"+sa+Roman12[sd.getUTCMonth()]+"/"+((sd.getUTCDate()<=9)?"0":"")+sd.getUTCDate();
ss+=" - "+((sd.getUTCHours()<=9)?"0":"")+sd.getUTCHours()+"ц "+((sd.getUTCMinutes()<=9)?"0":"")+sd.getUTCMinutes()+"м"+sb+"</TD>";
ss+="<TD ALIGN=CENTER>"+sa+h+"ц "+m+"м"+sb+"</TD>";
ss+="</TR>";
}
ss+="</TABLE>";
ss+="</TD><TD><TABLE><TR><TD ALIGN=CENTER><b>Дэлхийн тойрог замыг 'дээрээс' нь <br/>буюу хойд талаас нь харсан байдал</b></TD></TR><TR><TD>";
ss+="<img src='images/sunseas.png' alt='Дэлхийн тойрог зам' style='height:460px;'>"
ss+="</TD></TR><TR><TD ALIGN=CENTER>Зураг дээрх цэнхэр сум Дэлхийн хөдлөх чиглэлийг,<br/>";
ss+="ягаан сум тэнхлэгээ эргэх чиглэлийг,<br/>нил ягаан сум хойд туйл хаашаа хэлбийснийг заана.";
ss+="</TD></TR></TABLE></TD></TR></TABLE>";
ss+="<ul>";
ss+="<li>Улирал эхлэх мөчүүд Улаанбаатарын өвлийн цагаар байгаа.</li>";
ss+="<li>Тооцооны нарийвчлал ойрын 100 жилдээ &plusmn;15 минут.</li>";
ss+="</ul>";
return ss;
}
