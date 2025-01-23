var Mzero=3;
var epoch=1747;
var Ymin=1;
var ixx=46;
var betastar=10;
var beta=172;
var cnst={
	m0:2359237+2603/2828,
	m1:167025/5656,
	m2:11135/11312,
	s0:397/402,
	s1:65/804,
	s2:13/4824,
	a0:1523/1764,
	a1:253/3528,
	a2:1/28 //+1/105840
};
var Animal=["хулгана", "үхэр", "барс", "туулай", "луу", "могой", "морь", "хонь", "бич", "тахиа", "нохой", "гахай"];
var Animalin=["хулгана", "үхэр", "бар", "туулай", "луу", "могой", "морин", "хонин", "бичин", "тахиа", "нохой", "гахай"];
var Element=["модон", "гал", "шороон", "төмөр", "усан"];
var Colour=["хөх", "хөхөгчин", "улаан", "улаагчин", "шар", "шарагчин", "цагаан", "цагаагчин", "хар", "харагчин"];
var Element8=["гал", "шороо", "төмөр", "огторгуй", "ус", "уул", "мод", "хий"];
var Direction8=["урагшаа", "баруун урагшаа", "баруун тийшээ", "баруун хойшоо", "хойшоо", "зүүн хойшоо", "зүүн тийшээ", "зүүн урагшаа"];
var Colour9=["цагаан", "хар", "хөх", "ногоон", "шар", "цагаан", "улаан", "цагаан", "улаан"];
var Numbern=["нэг", "хоёр", "гурван", "дөрвөн", "таван", "зургаан", "долоон", "найман", "есөн"];
var Type=["Пүг","Цүр","Монгол","Бутан","Цагийн хүрдэн"];
var cal_type=2; //default type Mongolian

function set_cal_data(a) {
switch (a) {
   case 806:  //Phugpa 
	cal_type=0;
	epoch=806;
	ixx=48;
	betastar=61;
	beta=184-betastar;
	cnst.m0=2015501+4783/5656;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=743/804;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=475/3528;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
   case 1732:  //Tsurphu
	cal_type=1;
	epoch=1732;
	ixx=0;
	betastar=59;
	beta=142;
	cnst.m0=2353745+1795153/7635600;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=-5983/108540;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=207/392;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
   case 1747: //Mongolian
	cal_type=2;
	epoch=1747;
	ixx=46;
	betastar=10;
	beta=172;
	cnst.m0=2359237+2603/2828;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=397/402;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=1523/1764;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
   case 1754:  //Bhutanese
	cal_type=3;
	epoch=1754;
	ixx=59;
	betastar=2;
	beta=191;
	cnst.m0=2361807+52/707;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=1/67;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=17/147;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
   case 1852:  //Tsurphu
	cal_type=1;
	epoch=1852;
	ixx=0;
	betastar=14;
	beta=187;
	cnst.m0=2397598+1197103/7635600;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=23/27135;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=1/49;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
   case 1927:  //Phugpa
	cal_type=0;
	epoch=1927;
	ixx=48;
	betastar=55;
	beta=184-betastar;
	cnst.m0=2424972+5457/5656;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=749/804;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=1741/3528;
	cnst.a1=253/3528;
	cnst.a2=1/28;
	break;
   case 1987:  //Phugpa
	cal_type=0;
	epoch=1987;
	ixx=48;
	betastar=0;
	beta=184-betastar;
	cnst.m0=2446914+135/707;
	cnst.m1=167025/5656;
	cnst.m2=11135/11312;
	cnst.s0=0;
	cnst.s1=65/804;
	cnst.s2=13/4824;
	cnst.a0=38/49;
	cnst.a1=253/3528;
	cnst.a2=1/28;
	break;
   case 100806:  //Karana 
	cal_type=4;
	epoch=806;
	ixx=65;
	betastar=0;
	beta=4;
	cnst.m0=2015531+1/2;
	cnst.m1=29+191/360;
	cnst.m2=cnst.m1/30;
	cnst.s0=809/810;
	cnst.s1=1277/15795;
	cnst.s2=cnst.s1/30;
	cnst.a0=53/252;
	cnst.a1=253/3528;
	cnst.a2=1/28; //+1/105840;
	break;
}}

function amod(a,b) {
var t=a%b;
if (t<=0)t+=b;
return t;
}

function int_div(a,b) {
	return Math.floor(a/b); 
}

function Mstar(Y,M) {
return 12*(Y-epoch)+M-Mzero;
}

function intercal_ind(Y,M) {
var ix= (67*Mstar(Y,M)+betastar) % 65;
if (ix<0) ix+=65;
return ix;
}

function true_month(Y,M,L) {
var p=67*Mstar(Y,M)+betastar;
var ix=(67*Mstar(Y,M)+betastar) % 65;
if (ix<0) ix+=65;
var pp=(p-ix)/65;
switch(cal_type) {
case 1: if (L) return pp-1; else return pp; break; //Tsurphu
case 3: if (!L&&(ix<ixx)) return pp; else return pp+1; //Bhutan
case 4: if (!L) return pp; else return pp+1; //Karana
default: if (L||(ix<ixx)) return pp; else return pp+1;
}}

function inv_month(n,dat) {
var x=Math.ceil((65*n+beta)/67);
var t=(65*n+beta)%67;
dat.M= amod(x,12);
dat.Y=Math.ceil(x/12)-1+epoch;
dat.L=(t==1)||(t==2);
}

function leap_month(Y,M) {
var t=(24*(Y-epoch)+2*M-beta)%65;
if (t<0) t+=65;
return (t==0)||(t==1);
}

function leap_year(Y) {
var t=(24*(Y-epoch)-beta)%65;
if (t<0) t+=65;
return t>=41;
}

function leap_month_number(Y) {
var t=(24*(Y-epoch)-beta)%65;
if (t<0) t+=65;
return 1+Math.floor((64-t)/2);
}

function moon_tab(i) {
i=i%28;
if (i<0) i+=28;
var s=1;
if (i>=14) {i-=14; s=-1;}
if (i>7) i=14-i;
var a=Math.floor(i);
var b=Math.ceil(i);
var v = [0, 5, 10, 15, 19, 22, 24, 25];
if (a==b) return s*v[a];
else return s*((b-i)*v[a]+(i-a)*v[b])/(b-a);
}

function sun_tab(i) {
i=i%12;
if (i<0) i+=12;
var s=1;
if (i>=6) {i-=6; s=-1;}
if (i>3) i=6-i;
var a=Math.floor(i);
var b=Math.ceil(i);
var v = [0, 6, 10, 11];
if (a==b) return s*v[a];
else return s*((b-i)*v[a]+(i-a)*v[b])/(b-a);
}

function true_date(d,n) {
var mean_date=n*cnst.m1+d*cnst.m2+cnst.m0;
var mean_sun=n*cnst.s1+d*cnst.s2+cnst.s0;
var anomaly_moon=n*cnst.a1+d*cnst.a2+cnst.a0;
var moon_equ=moon_tab(28*anomaly_moon);
var anomaly_sun=mean_sun-.25;
var sun_equ=sun_tab(12*anomaly_sun);
var t=mean_date+moon_equ/60-sun_equ/60;
return t;
}

function prev_month(Y,M,L,dat) {
dat.Y=Y; dat.M=M; dat.L=L;
if (cal_type<=2) {
	if (leap_month(Y,M)) if (L) {dat.L=0; dat.M--;} else dat.L=1; else dat.M--; 
	if (dat.M<=0) {dat.M=12; dat.Y--;}
} else {
	if (leap_month(Y,M)) if (L) dat.L=0; else dat.M--; else dat.M--; 
	if (dat.M<=0) {dat.M=12; dat.Y--;}
	if (dat.M!=M) dat.L=leap_month(dat.Y,dat.M);
}
}

function next_month(Y,M,L,dat) {
dat.Y=Y; dat.M=M; dat.L=L;
if (cal_type<=2) {
	if (leap_month(Y,M)) if (L) dat.L=0; else dat.M++; else dat.M++; 
	if (dat.M>12) {dat.M=1; dat.Y++;}
	if (dat.M!=M) dat.L=leap_month(dat.Y,dat.M);
} else {
	if (leap_month(Y,M)) if (L) {dat.L=0; dat.M++;} else dat.L=1; else dat.M++; 
	if (dat.M>12) {dat.M=1; dat.Y++;}
}
}

//Julian day number of the lunar day
function julian_day(Y,M,L,d) {
var n=true_month(Y,M,L);
var t=true_date(d,n);
return Math.floor(t);
}

//Julian day number of the first day of the lunar year
function new_year_jd(Y) {
if (cal_type<=2) return julian_day(Y-1,12,0,30)+1;
else {
	var d={};
	prev_month(Y,1,0,d);
	return julian_day(d.Y,d.M,d.L,30)+1;
}
}

//Last day of the lunar month
function last_day_jd(Y,M,L) {
return julian_day(Y,M,L,30);
}

//First day of the lunar month
function first_day_jd(Y,M,L) {
var d={};
prev_month(Y,M,L,d);
return julian_day(d.Y,d.M,d.L,30)+1;
}

//Year attributes
function attrib_year(Y,a) {
a.year=amod(Y-6,60);
a.cycle=Math.ceil((Y-1026)/60);
a.animal=Animal[amod(Y-3,12)-1];
a.animalin=Animalin[amod(Y-3,12)-1];
a.element=Element[Math.ceil(amod(Y-3,10)/2)-1];
a.colour=Colour[amod(Y-3,10)-1];
a.elcor=cal_type==2?a.colour:a.element;
a.number=amod(2-Y,9);
a.colour9=Colour9[a.number-1];
}

//Month attributes
function attrib_month(Y,M,a) {
if (cal_type==0) a.animal=Animal[(M+3)%12];
else a.animal=Animal[(M+1)%12];
var t=amod(Y-2+Math.floor((M-1)/2),5);
if (cal_type==0) if (M<=10) t=amod(Math.ceil((Y-1)/2)+Math.floor((M+1)/2),5);
else t=amod(Math.ceil(Y/2)+Math.floor((M-11)/2),5);
a.element=Element[t-1];
a.colour=Colour[2*(t-1)+(M-1)%2];
a.elcor=cal_type==2?a.colour:a.element;
a.number=amod(3-12*Y-M,9);
a.colour9=Colour9[a.number-1];
}

//Day attributes
function attrib_day(jd,a) {
a.animal=amod(jd+2,12);
var t=amod(jd,10);
a.colour=Colour[t-1];
a.element=Element[Math.ceil(t/2)-1];
a.elcor=cal_type==2?a.colour:a.element;
a.number=amod(-jd,9);
a.colour9=Colour9[a.number-1];
a.trigram=amod(jd+2,8);
a.day=(jd+1)%7; //0=Sunday,1=Monday
}

//Tibetan year number
function tibetan_year(Y) {
return Y+127;
}

//Lunar month containing the given Gregorian day
function lunar_month(y,m,d,dat) {
var jd=g2jdn(y,m,d);
dat.Y=y;
dat.M=m;
dat.L=0;
var dat1={};
while(true) {
	var jd1=first_day_jd(dat.Y,dat.M,dat.L);
	var jd2=last_day_jd(dat.Y,dat.M,dat.L);
	if (jd1<=jd) if (jd<=jd2) return;
	prev_month(dat.Y,dat.M,dat.L,dat1);
	dat.Y=dat1.Y; dat.M=dat1.M; dat.L=dat1.L;
}
}

//Incomplete
function lunar_date(y,m,d,dat) {
var jd=g2jdn(y,m,d);
dat.Y=y;
dat.M=m;
dat.L=0;
var dat1={};
while(true) {
	var jd1=first_day_jd(dat.Y,dat.M,dat.L);
	var jd2=last_day_jd(dat.Y,dat.M,dat.L);
	if (jd1<=jd) if (jd<=jd2) break;
	prev_month(dat.Y,dat.M,dat.L,dat1);
	dat.Y=dat1.Y; dat.M=dat1.M; dat.L=dat1.L;
}
dd=jd-jd1+1;
}

//Gregorian date and time to Julian day number
function psa_jd(y,m,d,h) {
	return int_div(1461*(y+4800+int_div(m-14,12)),4)
	+int_div(367*(m-2-12*int_div(m-14,12)),12)
	-int_div(3*int_div(y+4900+int_div(m-14,12),100),4)
	+d-32075-0.5+h/24;
}

//Gregorian date to Julian day number
function g2jdn(yy,mm,dd) {
	var a=int_div(14-mm,12);
	var y=yy+4800-a;
	var m=mm+12*a-3;
	return dd+int_div(153*m+2,5)+365*y+int_div(y,4)-int_div(y,100)+int_div(y,400)-32045; //+68/86400??
}

//Julian day number to day of week (0-Sunday)
function day_of_week(jdn) {
	return (jdn+1)%7;
}

//Julian day number to Gregorian date
function gregorian_date(jdn) {
var f = jdn + 1401 + int_div(int_div(4*jdn+274277,146097)*3,4) - 38;
var e = 4*f+3;
var h = int_div(e%1461,4);
h = 5*h+2;
var d = int_div(h%153,5)+1;
var m = (int_div(h,153)+2)%12+1;
var y = int_div(e,1461)-4716+int_div(14-m,12);
var dat = {year:y, month:m, day:d};
return dat;
}

//Julian day number to Gregorian date
function jd2g(jd,g) {
var gg=Math.floor(Math.floor((jd-4479.5)/36524.25)*0.75+0.5)-37;
var n=jd+gg;
g.year=Math.floor(n/365.25)-4712;
var dd = Math.floor((n-59.25)%365.25);
g.month = (Math.floor((dd+0.5)/30.6)+2)%12+1;
g.day = Math.floor((dd+0.5)%30.6)+1;
}

