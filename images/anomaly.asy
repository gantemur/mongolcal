settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

//real nn0 = 6210; //2017-01-01 noon GMT
real nn0 = 9132; //2025-01-01 noon GMT


import graph;

//fractional part
real frac_part(real a) {
	return a-floor(a);
}

//Moon phase, n = jd - 2451545
real moonphase(real n) {
	n += nn0;
	real Omega = 2.1429 - 0.0010394594*n;
	real mls = 4.8950630 + 0.017202791698*n; //mean longitude
	real mas = 6.2400600 + 0.0172019699*n; //mean anomaly
	real els = mls + 0.03341607*sin(mas) + 0.00034894*sin(mas*2) 
	- 0.0001134 - 0.0000203*sin(Omega); //ecliptic longitude
	real t = n/36525.0;
	real mlm = 0.606433 + 1336.855225*t; //mean longitude
	real l = pi*2*frac_part(0.374897 + 1325.552410*t); //mean anomaly
	real ls = pi*2*frac_part(0.993133 + 99.997361*t); //Sun's mean anomaly
	real D = pi*2*frac_part(0.827361 + 1236.853086*t); //diff
	real F = pi*2*frac_part(0.259086 + 1342.227825*t); //distance from ascending node
	real dL = 22640*sin(l) - 4586*sin(l-2*D) + 2370*sin(2*D) + 769*sin(2*l)
		- 668*sin(ls) - 412*sin(2*F) - 212*sin(2*l-2*D) - 206*sin(l+ls-2*D)
		+ 192*sin(l+2*D) - 165*sin(ls-2*D) - 125*sin(D) - 110*sin(l+ls)
		+148*sin(l-ls) - 55*sin(2*F-2*D);
	real elm = mlm + dL/1296000.0; //ecliptic longitude
	real p = frac_part(elm - els/(pi*2));
	return p;

}

real moonlight(real n) {
	return floor(1.5-moonphase(n));
// 	return (1-cos(moonphase(n)*pi*2))/2;
}

//Elliptic anomaly
real moon_ell(real n) {
	real t = n/36525;
	real man = (0.374897 + 1325.552410*t)*pi*2; //mean anomaly
	real l = man%(pi*2);
	real dL = 22639*sin(l) + 769*sin(2*l) + 36*sin(3*l);
//	return dL*29.530587981*12/648000; //hour
	return dL*180/648000; //degree
}

//Evection
real moon_evec(real n) {
	real t = n/36525;
	real man = (0.374897 + 1325.552410*t)*pi*2; //mean anomaly
	real l = man%(pi*2);
	real D = pi*2*frac_part(0.827361 + 1236.853086*t); //diff
	real dL = - 4586*sin(l-2*D) ;
//	return dL*29.530587981*12/648000; //hour
	return dL*180/648000; //degree
}

//Variation
real moon_var(real n) {
	real t = n/36525;
	real D = pi*2*frac_part(0.827361 + 1236.853086*t); //diff
	real dL = 2370*sin(2*D);
//	return dL*29.530587981*12/648000; //hour
	return dL/3600; //degree
}

//Moon anomaly small corrections, including annual equation, parallactic inequality, and reduction to ecliptic
real moon_small(real n) {
	real t = n/36525;
	real man = (0.374897 + 1325.552410*t)*pi*2; //mean anomaly
	real l = man%(pi*2);
	real ls = pi*2*frac_part(0.993133 + 99.997361*t); //Sun's mean anomaly
	real D = pi*2*frac_part(0.827361 + 1236.853086*t); //diff
	real F = pi*2*frac_part(0.259086 + 1342.227825*t); //distance from ascending node
	real dL = - 668*sin(ls) - 412*sin(2*F) - 212*sin(2*l-2*D) - 206*sin(l+ls-2*D)
		+ 192*sin(l+2*D) - 165*sin(ls-2*D) - 125*sin(D) - 110*sin(l+ls)
		+148*sin(l-ls) - 55*sin(2*F-2*D);
//	return dL*29.530587981*12/648000; //hour
	return dL*180/648000; //degree
//	return dL/60; //minute
}

//tmp
real moon_tmp(real n) {
	n += nn0; 
	return moon_ell(n)+moon_evec(n)+moon_var(n)+moon_small(n);
}


real mty(int y)
{
	real t=(y-2000)/100;
	return 365.2421896698 - 6.15359e-6*t - 7.29e-10*t*t + 2.64e-10*t*t*t;
}

real anomoon(int n, real d)
{
	real a0 = 475/3528;
	real a1 = 253/3528;
	real a2 = 1/28;
	return a1*n+a2*d+a0;
}

real anomoon(real d)
{
	int n=floor(d/30);
	return anomoon(n,d-30*n);
}

real equmoon(int n, real d)
{
	real[] mt={0,5,10,15,19,22,24,25};
//	real[] mt={0,5,10,15,19,22,24,25,24,22,19,15,10,5,0,-5,-10,-15,-19,-22,-24,-25,-24,-22,-19,-15,-10,-5};
	real i=28*anomoon(n,d);
	i=i%28;
	if (i<0) i+=28;
	real s=1;
	if (i>=14) {i-=14; s=-1;}
	if (i>7) i=14-i;
	int a=floor(i);
	int b=ceil(i);
//	s = s/60;
	s = s/60*24;
	if (a==b) return s*mt[a];
	else return s*((b-i)*mt[a]+(i-a)*mt[b])/(b-a);
}

real equmoon(real d)
{
	int n=floor(d/30);
	return equmoon(n,d-30*n);
}

string gg(real d)
{
	int[] mm={31,28,31,30,31,30,31,31,30,31,30,31};
	int m=1, dd=floor(d);
	while (dd>mm[m-1]) { dd-=mm[m-1]; ++m; }
	return format("%d",m)+"/"+format("%d",dd);
}

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(500,200,IgnoreAspect);
defaultpen(fontsize(9pt));

int ymin=1747,ymax=2100;

for (real x=0;x<500;x+=.1) {
real c=(1-cos(moonphase(x)*pi*2))/2;
draw((x,-1)--(x,0),rgb(c,c,c));
}

draw(graph(moonlight,0,500,1000),rgb(.9,.3,.3));
draw(graph(moon_tmp,0,500,1500),rgb(.3,.3,.8));
//draw(graph(equmoon,0,30),rgb(1,.3,.3));
//xlimits(ymin-5,ymax+5);
ylimits(-10,10);
xaxis(BottomTop,Ticks(Step=30, step=10,pTick=rgb(.84,.84,.84), ptick=lightgrey,extend=true));
yaxis(LeftRight,RightTicks(Step=3,step=1,pTick=rgb(.84,.84,.84), ptick=lightgrey,extend=true));
//yaxis(LeftRight,RightTicks(Step=0.1,step=.1,pTick=lightgrey, ptick=lightgrey,extend=true,ticklabel=gg));

//fill((x0-xh,y0+yh)--(23h+x0+xh,y0+yh)--(23h+x0+xh,y0-nn1*h-yh)--(x0-xh,y0-nn1*h-yh)--cycle,white);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

//draw(shift(0,0)*sig,rgb(.8,.8,.8));








