//constants
var EPOCH = {
	JD : 2451545, //J2000
};

var PHASE = {
	EPS : 0.0001,
	EPSD : 0.001,
};

var MICHID = {
	RA : 0.9922, //rad
	RAR : 0.1579, //rev
	DEC : 0.4209,
};

//Julian date to JS date object
function JSDate(jd) {
var jj=jd-2440587.5; //days since 1970/1/1 00:00:00
var dat = new Date(jj*86400000); //milliseconds since 1970/1/1 00:00:00
return dat;
}

//fractional part
function frac_part(a) {
	return a-Math.floor(a);
}

//Moon phase, n = jd - 2451545
function moonphase_fast(n) {
	var Omega = 2.1429 - 0.0010394594*n;
	mls = 4.8950630 + 0.017202791698*n; //mean longitude
	mas = 6.2400600 + 0.0172019699*n; //mean anomaly
	els = mls + 0.03341607*Math.sin(mas) + 0.00034894*Math.sin(mas*2) 
	- 0.0001134 - 0.0000203*Math.sin(Omega); //ecliptic longitude
	var t = n/36525.0;
	mlm = 0.606433 + 1336.855225*t; //mean longitude
	l = Math.PI*2*frac_part(0.374897 + 1325.552410*t); //mean anomaly
	ls = Math.PI*2*frac_part(0.993133 + 99.997361*t); //Sun's mean anomaly
	D = Math.PI*2*frac_part(0.827361 + 1236.853086*t); //diff
	F = Math.PI*2*frac_part(0.259086 + 1342.227825*t); //distance from ascending node
	dL = 22640*Math.sin(l) - 4586*Math.sin(l-2*D) + 2370*Math.sin(2*D) + 769*Math.sin(2*l)
		- 668*Math.sin(ls) - 412*Math.sin(2*F) - 212*Math.sin(2*l-2*D) - 206*Math.sin(l+ls-2*D)
		+ 192*Math.sin(l+2*D) - 165*Math.sin(ls-2*D) - 125*Math.sin(D) - 110*Math.sin(l+ls)
		+148*Math.sin(l-ls) - 55*Math.sin(2*F-2*D);
	elm = mlm + dL/1296000.0; //ecliptic longitude
	var p = frac_part(elm - els/(Math.PI*2));
	return p;

}

//Moon right ascension, n = jd - 2451545
function moon_ra(n) {
	var t = n/36525;
	mlon = (0.606433 + 1336.855225*t)*Math.PI*2; //mean longitude
	man = (0.374897 + 1325.552410*t)*Math.PI*2; //mean anomaly
	l = man%(Math.PI*2);
	ls = Math.PI*2*frac_part(0.993133 + 99.997361*t); //Sun's mean anomaly
	D = Math.PI*2*frac_part(0.827361 + 1236.853086*t); //diff
	F = Math.PI*2*frac_part(0.259086 + 1342.227825*t); //distance from ascending node
	dL = 22640*Math.sin(l) - 4586*Math.sin(l-2*D) + 2370*Math.sin(2*D) + 769*Math.sin(2*l)
		- 668*Math.sin(ls) - 412*Math.sin(2*F) - 212*Math.sin(2*l-2*D) - 206*Math.sin(l+ls-2*D)
		+ 192*Math.sin(l+2*D) - 165*Math.sin(ls-2*D) - 125*Math.sin(D) - 110*Math.sin(l+ls)
		+148*Math.sin(l-ls) - 55*Math.sin(2*F-2*D);
	S = F + (dL + 412*Math.sin(2*F) + 541*Math.sin(ls))*Math.PI/648000;
	h = F - 2*D;
	N = -526*Math.sin(h) + 44*Math.sin(l+h) - 31*Math.sin(-l+h) - 23*Math.sin(ls+h)
		+ 11*Math.sin(-ls+h) - 25*Math.sin(-2*l+F) + 21*Math.sin(-l+F);
	lon = mlon + dL*Math.PI/648000; //ecliptic longitude
	lon%=Math.PI*2;
	lat = (18520*Math.sin(S) + N)*Math.PI/648000; //ecliptic latitude
	var Omega = 2.1429 - 0.0010394594*n;
	eps = 0.4090928 - (6.2140E-9)*n + 0.0000396*Math.cos(Omega); //obliquity
	var sl = Math.sin(lon);
	var cl = Math.cos(lon);
	var sb = Math.sin(lat);
	var cb = Math.cos(lat);
	var se = Math.sin(eps);
	var ce = Math.cos(eps);
	ra = Math.atan2(ce*sl*cb-se*sb,cl*cb); 
	return frac_part(ra/(Math.PI*2)); //rev
}

//Moon ecliptic longitude, n = jd - 2451545
function moon_lon(n) {
	var t = n/36525;
	mlon = (0.606433 + 1336.855225*t)*Math.PI*2; //mean longitude
	man = (0.374897 + 1325.552410*t)*Math.PI*2; //mean anomaly
	l = man%(Math.PI*2);
	ls = Math.PI*2*frac_part(0.993133 + 99.997361*t); //Sun's mean anomaly
	D = Math.PI*2*frac_part(0.827361 + 1236.853086*t); //diff
	F = Math.PI*2*frac_part(0.259086 + 1342.227825*t); //distance from ascending node
	dL = 22640*Math.sin(l) - 4586*Math.sin(l-2*D) + 2370*Math.sin(2*D) + 769*Math.sin(2*l)
		- 668*Math.sin(ls) - 412*Math.sin(2*F) - 212*Math.sin(2*l-2*D) - 206*Math.sin(l+ls-2*D)
		+ 192*Math.sin(l+2*D) - 165*Math.sin(ls-2*D) - 125*Math.sin(D) - 110*Math.sin(l+ls)
		+148*Math.sin(l-ls) - 55*Math.sin(2*F-2*D);
	S = F + (dL + 412*Math.sin(2*F) + 541*Math.sin(ls))*Math.PI/648000;
	h = F - 2*D;
	N = -526*Math.sin(h) + 44*Math.sin(l+h) - 31*Math.sin(-l+h) - 23*Math.sin(ls+h)
		+ 11*Math.sin(-ls+h) - 25*Math.sin(-2*l+F) + 21*Math.sin(-l+F);
	lon = mlon + dL*Math.PI/648000; //ecliptic longitude
	lon%=Math.PI*2;
	return lon; //rad
}

//solve moonphase(j-2451545)=pp where j1<=j<=j2
function find_event(j1,j2,pp) {
	var n1 = j1 - 2451545;
	var n2 = j2 - 2451545;
	var p1 = moonphase_fast(n1) - pp;
	if (Math.abs(p1)<=PHASE.EPS) return n1;
	var p2 = moonphase_fast(n2) - pp;
	if (Math.abs(p2)<=PHASE.EPS) return n2;
	if (p1*p2>0) return -EPOCH.JD - 1;
	var nn = n1 - p1*(n2-n1)/(p2-p1);
	var pn = moonphase_fast(nn) - pp;
	while (Math.abs(pn)>PHASE.EPS) {
		if (p1*pn>0) { p1 = pn; n1 = nn; }
		else { p2 = pn; n2 = nn; }
		nn = n1 - p1*(n2-n1)/(p2-p1);
		if (n2-n1<=PHASE.EPSD) break;
		pn = moonphase_fast(nn) - pp;
	}
	return nn+2451545;
}

//range in (-0.5,0.5)
function moonphase0(n) {
	return frac_part(moonphase_fast(n) + 0.5) - 0.5;
}

//solve moonphase(j-2451545)=pp where j1<=j<=j2
function find_newmoon(j1,j2,pp) {
	var n1 = j1 - 2451545;
	var n2 = j2 - 2451545;
	var p1 = moonphase0(n1) - pp;
	if (Math.abs(p1)<=PHASE.EPS) return n1;
	var p2 = moonphase0(n2) - pp;
	if (Math.abs(p2)<=PHASE.EPS) return n2;
	if (p1*p2>0) return -EPOCH.JD - 1;
	var nn = n1 - p1*(n2-n1)/(p2-p1);
	var pn = moonphase0(nn) - pp;
	while (Math.abs(pn)>PHASE.EPS) {
		if (p1*pn>0) { p1 = pn; n1 = nn; }
		else { p2 = pn; n2 = nn; }
		nn = n1 - p1*(n2-n1)/(p2-p1);
		if (n2-n1<=PHASE.EPSD) break;
		pn = moonphase0(nn) - pp;
	}
	return nn+2451545;
}


//solve moon_ra(j-2451545)=pp where j1<=j<=j2
function find_moon_ra(j1,j2,pp) {
	if (j1>j2) return -EPOCH.JD - 1;
	var n1 = j1 - 2451545;
	var n2 = j2 - 2451545;
	var p1 = moon_ra(n1) - pp;
	if (Math.abs(p1)<=PHASE.EPS) return n1;
	var p2 = moon_ra(n2) - pp;
	if (Math.abs(p2)<=PHASE.EPS) return n2;
	if (p2<p1) p1-=1;
	while (p1*p2>0) {
		n2 -= 5;
		if (n2<n1) return -EPOCH.JD - 1;
		p2 = moon_ra(n2) - pp;		
		if (p2<p1) p1-=1;
	}
	var nn = n1 - p1*(n2-n1)/(p2-p1);
	var pn = moon_ra(nn) - pp;
	if (p2<pn) pn-=1;
	while (Math.abs(pn)>PHASE.EPS) {
		if (p1*pn>0) { p1 = pn; n1 = nn; }
		else { p2 = pn; n2 = nn; }
		nn = n1 - p1*(n2-n1)/(p2-p1);
		if (n2-n1<=PHASE.EPSD) break;
		pn = moon_ra(nn) - pp;
		if (p2<pn) pn-=1;
	}
	return nn+2451545;
}



