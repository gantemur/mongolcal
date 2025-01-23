//constants
var EPOCH = {
	JD : 2451545, //J2000
};

var SUNSEASON = {
	EPS : 0.01,
	EPSD : 0.01,
};

function int_div(a,b) {
	return Math.floor(a/b); 
}

//fractional part
function frac_part(a) {
	return a-Math.floor(a);
}

//Julian date to JS date object
function JSDate(jd) {
var jj=jd-2440587.5; //days since 1970/1/1 00:00:00
var dat = new Date(jj*86400000); //milliseconds since 1970/1/1 00:00:00
return dat;
}

//Gregorian date to Julian day number
function g2jdn(yy,mm,dd) {
	var a=int_div(14-mm,12);
	var y=yy+4800-a;
	var m=mm+12*a-3;
	return dd+int_div(153*m+2,5)+365*y+int_div(y,4)-int_div(y,100)+int_div(y,400)-32045; //+68/86400??
}

//Sun ecliptic longitude, n = jd - 2451545
function sun_lon(n) {
	var Omega = 2.1429 - 0.0010394594*n;
	var mlon = 4.8950630 + 0.017202791698*n; //mean longitude
	var man = 6.2400600 + 0.0172019699*n; //mean anomaly
	var lon = mlon + 0.03341607*Math.sin(man) + 0.00034894*Math.sin(man*2) 
	- 0.0001134 - 0.0000203*Math.sin(Omega); //ecliptic longitude
	lon%=Math.PI*2;
	return lon;
}

//solve sun_lon(j-2451545)=pp where j1<=j<=j2
function find_sun_event1(j1,j2,pp) {
	var n1 = j1 - 2451545;
	var n2 = j2 - 2451545;
	var p1 = sun_lon(n1) - pp;
	if (Math.abs(p1)<=SUNSEASON.EPS) return n1;
	var p2 = sun_lon(n2) - pp;
	if (Math.abs(p2)<=SUNSEASON.EPS) return n2;
	if (p1*p2>0) return -EPOCH.JD - 1;
	var nn = n1 - p1*(n2-n1)/(p2-p1);
	var pn = sun_lon(nn) - pp;
	while (Math.abs(pn)>SUNSEASON.EPS) {
		if (p1*pn>0) { p1 = pn; n1 = nn; }
		else { p2 = pn; n2 = nn; }
		nn = n1 - p1*(n2-n1)/(p2-p1);
		if (n2-n1<=SUNSEASON.EPSD) break;
		pn = sun_lon(nn) - pp;
	}
	return nn+2451545;
}

//range in (-Math.PI,Math.PI)
function sun_lon0(n) {
	return (sun_lon(n) + Math.PI)%(Math.PI*2) - Math.PI;
}

//solve sun_lon0(j-2451545)=pp where j1<=j<=j2
function find_sun_event0(j1,j2,pp) {
	var n1 = j1 - 2451545;
	var n2 = j2 - 2451545;
	var p1 = sun_lon0(n1) - pp;
	if (Math.abs(p1)<=SUNSEASON.EPS) return n1;
	var p2 = sun_lon0(n2) - pp;
	if (Math.abs(p2)<=SUNSEASON.EPS) return n2;
	if (p1*p2>0) return -EPOCH.JD - 1;
	var nn = n1 - p1*(n2-n1)/(p2-p1);
	var pn = sun_lon0(nn) - pp;
	while (Math.abs(pn)>SUNSEASON.EPS) {
		if (p1*pn>0) { p1 = pn; n1 = nn; }
		else { p2 = pn; n2 = nn; }
		nn = n1 - p1*(n2-n1)/(p2-p1);
		if (n2-n1<=SUNSEASON.EPSD) break;
		pn = sun_lon0(nn) - pp;
	}
	return nn+2451545;
}

//solve sun_lon(j-2451545)=pp where j1<=j<=j2
function find_sun_event(j1,j2,pp) {
	if (pp<Math.PI*0.5)
		return find_sun_event0(j1,j2,pp);
	if (pp>Math.PI*1.5)
		return find_sun_event0(j1,j2,pp-Math.PI*2);
	return find_sun_event1(j1,j2,pp);
}



