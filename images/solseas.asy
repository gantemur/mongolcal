settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real a=40, b=32;
real e=81;
pair c = (0,4);
real r=4,r1=3;

size(7cm,10cm);

pair ll=(-45,-55), ur=(45,55);

fill(ll--(ll.x,ur.y)--ur--(ur.x,ll.y)--cycle,black);


//DefaultHead=HookHead;
DefaultHead=SimpleHead;

path orbit = ellipse((0,0),b,a);
path sun = circle(c,.5);

pair[] p;

for (int i=1;i<=24;++i) {
	path q = (c--(c+2*a*dir(e+15*i)));
	p.push(intersectionpoint(orbit, q));
}

draw(c--p[23],purple);
draw(c--p[17],purple);
draw(c--p[11],purple);
draw(c--p[5],purple);

for (int i=0;i<24;i+=2) {
	fill(buildcycle(orbit,(p[i+1]--c--p[i])),rgb(.3,.7,.7));
}

draw(orbit,blue);
filldraw(sun,yellow,orange);

pair d = dir(e)*r;
pair d1 = dir(e)*r1;
draw((p[23]-d1)--(p[23]+d),purple+1.5bp,Arrow(size=2mm));
draw((p[17]-d1)--(p[17]+d),purple+1.5bp,Arrow(size=2mm));
draw((p[11]-d1)--(p[11]+d),purple+1.5bp,Arrow(size=2mm));
draw((p[5]-d1)--(p[5]+d),purple+1.5bp,Arrow(size=2mm));

for (int i=0;i<24;i+=2) {
	dot(p[i],blue);
	dot(p[i+1],blue);
	label(format("$%d$",i+1),p[i]+(p[i+1]-c)*.12+(p[i+1]-p[i])*0.1,rgb(1,1,1));
}

path q1 = (c--(c+2*a*dir(e+20)));
path q2 = (c--(c+2*a*dir(e+41)));
real[] t1 = intersect(orbit, q1);
real[] t2 = intersect(orbit, q2);
path a = subpath(orbit,t1[0],t2[0]);
draw(shift(-3*dir(e+30))*a,blue,Arrow);

draw(arc(p[9],2,80,400),blue+red,Arrow(size=1.5mm));

//shipout(scale(4.0) * currentpicture.fit());
//shipout(bbox(2mm,invisible));