settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real a=40, b=32, d=7, d1=11;
real e=66;
//pair c=(-sqrt(a*a-b*b),0);
pair c=(-10,0);
real dp=1/118;
real rev=24;
real re=.8;

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);
path earth = circle(c,re);

size(10cm,15cm);

fill((-a-d,-b-d)--(-a-d,a+d1)--(a+d,a+d1)--(a+d,-b-d)--cycle,black);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

draw(c--(-a,0),rgb(.6,0,0)+.3);

guide gd;
pair[] pd;
int nn=10;
int n=ceil(nn*rev);
real ee=e,de=360*rev/n;
int n0=0;

for (int i=0;i<n;++i) {
	pd.push(c+rotate(dp*ee)*shift(-c)*(a*Cos(ee),b*Sin(ee)));
	ee+=de;
}
for (int i=0;i<n;++i) gd = gd..pd[i];

real r0=.2, g0=.2, b0=.2;
real r1=.6, g1=.6, b1=.95;
real dr=(r1-r0)/n, dg=(g1-g0)/n, db=(b1-b0)/n;

for (int i=0;i<n;++i) draw(subpath(gd,i,i+1),rgb(r0+dr*i,g0+dg*i,b0+db*i)+.3);

draw(c--(c+rotate((rev-1)*360*dp)*shift(-c)*(-a,0)),rgb(.6,0,0)+.3);

filldraw(earth,rgb(.2,.2,1),rgb(.4,.4,.9));

draw(shift(a+d-1.4,-b-d+.7)*sig,rgb(.5,0,.5));
