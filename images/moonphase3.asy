settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real a=40, b=32, d=10, dt=22;
pair c = (-8,0);
real e0=80, e=degrees((a*Cos(e0),b*Sin(e0))-c);
real s = 1.07;
real r=4, r1=3;
real re=1.1, rm=.7;

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(10cm,15cm);

fill((-a-d,-b-d)--(-a-d,b+dt)--(a+d,b+dt)--(a+d,-b-d)--cycle,black);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

path earth = circle(c,re);
path moon = circle(0,rm);
path nearth = buildcycle(arc(c,re,e+80,e-80,CCW),(c+2*dir(e-90))--(c+2*dir(e+90)));

guide orbit;
pair[] p;
int n=31;
real ee=e0,ms=360/27, ds=2.5;
real dp=3/360;

for (int i=0;i<n;++i) {
	p.push(c+rotate(dp*ee)*shift(-c)*(a*Cos(ee),b*Sin(ee)));
	ee+=ms+Cos(ee)*ds;
}
for (int i=0;i<n;++i) orbit = orbit..p[i];

//for (int i=1;i<27;i+=2) fill(buildcycle(subpath(orbit,i,i+1),(p[i+1]--c--p[i])),rgb(.2,.2,.2));

draw(c--(-a,0),rgb(.6,0,0)+.3);

real r0=.2, g0=.2, b0=.2;
real r1=.6, g1=.6, b1=.95;
real dr=(r1-r0)/n, dg=(g1-g0)/n, db=(b1-b0)/n;

for (int i=0;i<n;++i) {
//	draw(c--p[i],rgb(.2,.2,.2));	
	draw(subpath(orbit,i,i+1),rgb(r0+dr*i,g0+dg*i,b0+db*i)+.3);
	filldraw(shift(p[i])*moon,rgb(.6,.6,.6),rgb(.8,.8,.8+0.005i));
	real ee=e+s*i;
	path nmoon = buildcycle(arc(0,rm,ee+80,ee-80,CCW),dir(ee+90)--dir(ee-90));
	filldraw(shift(p[i])*nmoon,rgb(0,0,0),rgb(.2,.2,.15+.01i));
}

filldraw(earth,rgb(.2,.2,1),rgb(.4,.4,.9));
filldraw(nearth,rgb(.2,.2,.4),rgb(.2,.2,.4));
real ee=e+n*s;
path nearth = buildcycle(arc(c,re,ee+80,ee-80,CCW),(c+2*dir(ee-90))--(c+2*dir(ee+90)));
filldraw(nearth,rgb(.2,.2,.4),rgb(.2,.2,.4));
nearth = buildcycle(arc(c,re,ee+80,e-80,CCW),(c+2*dir(e-90))--c--(c+2*dir(ee+90)));
filldraw(nearth,rgb(0,0,0),rgb(.1,.1,.3));

//for (int i=0;i<30;i+=2) label(format("$%d$",i+1),p[i]+(p[i+1]-c)*.09+(p[i+1]-p[i])*0.12);

defaultpen(fontsize(7pt));
//label("3",c+.9((p[2]+p[3])/2-c),rgb(.4,.4,.4));
//label("5",c+.9((p[4]+p[5])/2-c),rgb(.4,.4,.4));
//label("25",c+.9((p[24]+p[25])/2-c),rgb(.4,.4,.4));
//label("27",c+.9((p[26]+p[27])/2-c),rgb(.4,.4,.4));

path q1 = (c--(c+2*a*dir(170)));
path q2 = (c--(c+2*a*dir(190)));
real[] t1 = intersect(orbit, q1);
real[] t2 = intersect(orbit, q2);
path aa = subpath(orbit,t1[0],t2[0]);
draw(shift(3*dir(0))*aa,rgb(.7,.7,.7),Arrow);

path q1 = (c--(c+2*a*dir(174)));
path q2 = (c--(c+2*a*dir(186)));
real[] t1 = intersect(orbit, q1);
real[] t2 = intersect(orbit, q2);
path aa = subpath(orbit,t1[0],t2[0]);
draw(shift(-3*dir(0))*scale(-1)*aa,rgb(.7,.7,.7),Arrow);

draw(arc(c,4,e+20,e-20,CCW),blue,Arrow(size=1.5mm));

pair cc = p[0]+19*dir(e);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc += 4*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc -= 8*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));

real sms=29.53*s;
pair cc = c+(length(p[0])+18)*dir(e+sms);
draw(cc--(cc+6*dir(e+sms+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc += 4*dir(e+sms+90);
draw(cc--(cc+6*dir(e+sms+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc -= 8*dir(e+sms+90);
draw(cc--(cc+6*dir(e+sms+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));

//dot((b+10,0),black);dot((-b-10,0),black);dot((0,a+18),black);dot((0,-a-10),black);

draw(shift(a+8.6,-b-9.3)*sig,rgb(.5,0,.5));


//shipout(scale(4.0) * currentpicture.fit());
//shipout(bbox(2mm,invisible));

//pen ppp = black; shipout(bbox(ppp,Fill));

