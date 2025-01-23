settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real a=32, b=40, d=10, dt=20;
real e=66;
pair c = (8,0);
real s = 1.07;
real r=4, r1=3;
real re=1.1, rm=.7;

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(10cm,15cm);

fill((-b-d,-a-d)--(-b-d,a+dt)--(b+d,a+dt)--(b+d,-a-d)--cycle,black);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

path orbit = ellipse((0,0),b,a);
path earth = circle(c,re);
path moon = circle(c,rm);
path nearth = buildcycle(arc(c,re,e+80,e-80,CCW),(c+2*dir(e-90))--(c+2*dir(e+90)));
path nmoon = buildcycle(arc(c,rm,e+80,e-80,CCW),(c+dir(e-90))--(c+dir(e+90)));


pair[] p;

for (int i=0;i<=30;++i) {
	path q = (c--(c+2*a*dir(e+(12+s)*i)));
	p.push(intersectionpoint(orbit, q));
}

//for (int i=1;i<=30;i+=2) fill(buildcycle(orbit,(p[i+1]--c--p[i])),rgb(.2,.2,.02i));

for (int i=0;i<=30;++i) draw(c--p[i],rgb(.2,.2,.4-.01i));

draw(orbit,rgb(.2,.2,.2));

for (int i=0;i<=30;++i) {
	filldraw(shift(p[i]-c)*moon,rgb(.6,.6,.6),rgb(.8,.8,.95-0.005i));
	real ee=e+s*i;
	nmoon = buildcycle(arc(c,rm,ee+80,ee-80,CCW),(c+dir(ee-90))--(c+dir(ee+90)));
	filldraw(shift(p[i]-c)*nmoon,rgb(0,0,0),rgb(.2,.2,.4-.01i));
}

//for (int i=0;i<30;i+=2) label(format("$%d$",i+1),p[i]+(p[i+1]-c)*.09+(p[i+1]-p[i])*0.12);

defaultpen(fontsize(7pt));
label("5",c+.9((p[4]+p[5])/2-c),rgb(.4,.4,.4));
label("7",c+.9((p[6]+p[7])/2-c),rgb(.4,.4,.4));
label("9",c+.9((p[8]+p[9])/2-c),rgb(.4,.4,.4));
label("27",c+.9((p[26]+p[27])/2-c),rgb(.4,.4,.4));

real rd=20;
guide gd;
pair[] pd;
real ee=e+(12+s)*6-2.5, ms=360/26, ds=2;
int n0=6;
real[] de={2,1.5,1,-1,-2,-3,-4,-5,-6,-7,-8,-7,-6,-5,-4,-3,-2,-1,1,1};
int n=de.length;

//for (int i=0;i<n;++i) {	pd.push(c+rd*dir(ee)); ee+=ms-Cos(ee)*ds;}
for (int i=0;i<n;++i) pd.push(c+rd*dir(e+(12+s)*(i+n0)+de[i]));

for (int i=0;i<n;++i) gd = gd..pd[i];
draw(gd,rgb(0,.6,0)+.3);
for (int i=0;i<n;++i) draw(c--pd[i],rgb(0,.6,0)+.3);

filldraw(earth,rgb(.2,.2,1),rgb(.4,.4,.9));
filldraw(nearth,rgb(.2,.2,.4),rgb(.2,.2,.4));
real ee=e+30s;
nearth = buildcycle(arc(c,re,ee+80,ee-80,CCW),(c+2*dir(ee-90))--(c+2*dir(ee+90)));
filldraw(nearth,rgb(.2,.2,.4),rgb(.2,.2,.4));
nearth = buildcycle(arc(c,re,ee+80,e-80,CCW),(c+2*dir(e-90))--c--(c+2*dir(ee+90)));
filldraw(nearth,rgb(0,0,0),rgb(.1,.1,.3));

path q1 = (c--(c+2*a*dir(174)));
path q2 = (c--(c+2*a*dir(186)));
real[] t1 = intersect(orbit, q1);
real[] t2 = intersect(orbit, q2);
path aa = subpath(orbit,t1[0],t2[0]);
draw(shift(3*dir(0))*aa,rgb(.7,.7,.7),Arrow);

path q1 = (c--(c+2*a*dir(170)));
path q2 = (c--(c+2*a*dir(190)));
real[] t1 = intersect(orbit, q1);
real[] t2 = intersect(orbit, q2);
path aa = subpath(orbit,t1[0],t2[0]);
draw(shift(-3*dir(0))*scale(-1)*aa,rgb(.7,.7,.7),Arrow);

//draw(arc(c,4,e+30,e-27,CCW),blue,Arrow(size=1.5mm));

filldraw(circle(p[0]+7*dir(e),1),rgb(0,0,0),rgb(.2,.2,.4));
filldraw(circle(p[30]+7*dir(e+30s),1),rgb(0,0,0),rgb(.2,.2,.2));
filldraw(circle(p[15]+7*dir(e+180+15s),1),rgb(.6,.6,.6),rgb(.8,.8,.8));
pair cc=(p[7]+p[8])/2+7*dir(e+90+7.5s);
filldraw(circle(cc,1),rgb(.6,.6,.6),rgb(.8,.8,.8));
filldraw(buildcycle(arc(cc,1,80,280,CCW),(cc+2*dir(-90))--(cc+2*dir(90))),rgb(0,0,0),rgb(.2,.2,.2));
pair cc=(p[22]+p[23])/2+7*dir(e-90+22.5s);
filldraw(circle(cc,1),rgb(.6,.6,.6),rgb(.8,.8,.8));
filldraw(buildcycle(arc(cc,1,100,260,CW),(cc+2*dir(-90))--(cc+2*dir(90))),rgb(0,0,0),rgb(.2,.2,.2));

pair cc = p[0]+21*dir(e);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc += 4*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc -= 8*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));

pair cc = p[30]+19*dir(e+30s);
draw(cc--(cc+6*dir(e+30s+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc += 4*dir(e+30s+90);
draw(cc--(cc+6*dir(e+30s+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc -= 8*dir(e+30s+90);
draw(cc--(cc+6*dir(e+30s+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));

//dot((b+10,0),black); dot((-b-10,0),black); dot((0,a+18),black); dot((0,-a-10),black);

draw(shift(b+8.6,-a-9.3)*sig,rgb(.5,0,.5));


//shipout(scale(4.0) * currentpicture.fit());
//shipout(bbox(2mm,invisible));

//pen ppp = black;
//shipout(bbox(ppp,Fill));

