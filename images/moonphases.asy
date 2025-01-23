settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real a=32, b=40, d=10, dt=18;
real e=66;
pair c = (8,0);
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

for (int i=1;i<=30;++i) {
	path q = (c--(c+2*a*dir(e+12*i)));
	p.push(intersectionpoint(orbit, q));
}

draw(c--p[29],rgb(.7,.7,.4));
draw(c--p[14],rgb(.7,.7,.4));
draw(c--p[5],purple);
draw(c--(b,0),rgb(.6,0,0)+.3);

for (int i=0;i<30;i+=2) {
	fill(buildcycle(orbit,(p[i+1]--c--p[i])),rgb(.2,.2,.2));
}

draw(orbit,rgb(.2,.2,.2));

for (int i=0;i<30;++i) {
	filldraw(shift(p[i]-c)*moon,rgb(.6,.6,.6),rgb(.8,.8,.8));
	filldraw(shift(p[i]-c)*nmoon,rgb(0,0,0),rgb(.2,.2,.2));
}

//for (int i=0;i<30;i+=2) label(format("$%d$",i+1),p[i]+(p[i+1]-c)*.09+(p[i+1]-p[i])*0.12);

defaultpen(fontsize(7pt));
label("1",c+.9((p[29]+p[0])/2-c),rgb(.4,.4,.4));
label("3",c+.9((p[1]+p[2])/2-c),rgb(.4,.4,.4));
label("5",c+.9((p[3]+p[4])/2-c),rgb(.4,.4,.4));
label("7",c+.9((p[5]+p[6])/2-c),rgb(.4,.4,.4));
label("9",c+.9((p[7]+p[8])/2-c),rgb(.4,.4,.4));
label("29",c+.9((p[27]+p[28])/2-c),rgb(.4,.4,.4));

real rd=25;
path pd=arc(c,rd,e+12*7+2,e+12*11-3,CCW);

draw(pd,rgb(0,.6,0)+.3);
draw(c--(c+rd*dir(e+12*7+2)),rgb(0,.6,0)+.3);
draw(c--(c+rd*dir(e+12*8+1)),rgb(0,.6,0)+.3);
draw(c--(c+rd*dir(e+12*9-1)),rgb(0,.6,0)+.3);
draw(c--(c+rd*dir(e+12*10-2)),rgb(0,.6,0)+.3);
draw(c--(c+rd*dir(e+12*11-3)),rgb(0,.6,0)+.3);

filldraw(earth,rgb(.2,.2,1),rgb(.4,.4,.9));
filldraw(nearth,rgb(0,0,0),rgb(.2,.2,.4));

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

draw(arc(c,4,e+30,e-27,CCW),blue,Arrow(size=1.5mm));

filldraw(circle(p[29]+7*dir(e),1),rgb(0,0,0),rgb(.2,.2,.2));
filldraw(circle(p[14]+7*dir(e+180),1),rgb(.6,.6,.6),rgb(.8,.8,.8));
pair cc=(p[6]+p[7])/2+7*dir(e+90);
filldraw(circle(cc,1),rgb(.6,.6,.6),rgb(.8,.8,.8));
filldraw(buildcycle(arc(cc,1,80,280,CCW),(cc+2*dir(-90))--(cc+2*dir(90))),rgb(0,0,0),rgb(.2,.2,.2));
pair cc=(p[21]+p[22])/2+7*dir(e-90);
filldraw(circle(cc,1),rgb(.6,.6,.6),rgb(.8,.8,.8));
filldraw(buildcycle(arc(cc,1,100,260,CW),(cc+2*dir(-90))--(cc+2*dir(90))),rgb(0,0,0),rgb(.2,.2,.2));

pair cc = p[29]+20*dir(e);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc += 4*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));
cc -= 8*dir(e+90);
draw(cc--(cc+6*dir(e+180)),rgb(.8,.8,.4),Arrow(size=1.5mm));

//dot((b+10,0),black); dot((-b-10,0),black); dot((0,a+18),black); dot((0,-a-10),black);

draw(shift(b+8.6,-a-9.3)*sig,rgb(.5,0,.5));


//shipout(scale(4.0) * currentpicture.fit());
//shipout(bbox(2mm,invisible));

//pen ppp = black; shipout(bbox(ppp,Fill));

