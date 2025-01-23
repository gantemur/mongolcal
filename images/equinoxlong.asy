settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

import graph;

real mty(int y)
{
	real t=(y-2000)/100;
	return 365.2421896698 - 6.15359e-6*t - 7.29e-10*t*t + 2.64e-10*t*t*t;
}

int gyl(int y)
{
	int g=365;
	if (y%4==0) g=366;
	if (y%100==0) g=365;
	if (y%400==0) g=366;
	return g;
}

int jyl(int y) { return (y%4==0)?366:365; }

string gg(real y)
{
	int d=20+floor(y/24);
	int h=floor(y)%24;
	return format("3/%d",d);
//	return format("3/%d",d)+" "+format("%0.2d:00",h);
}

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(400,200,IgnoreAspect);
defaultpen(fontsize(9pt));


//cd("/Users/gantumur/Dropbox/Sites/cal/images");
file in=input("equinox.txt");
//string header=in;
real[][] a=in.dimension(424,16);
a=transpose(a);
int y0=80;
int y1=9020;
real[] year=sequence(y0,y1);
real[] speq=array(y1-y0+1,0);

for (int i=max(1788,y0),ii=0;i<min(2211,y1);++i,++ii) speq[i-y0] = a[2][ii]+(a[1][ii]-20)*24+a[3][ii]/60;
for (int i=2210;i<y1;++i) speq[i+1-y0]=speq[i-y0]+(mty(i)-gyl(i+1))*24;
for (int i=min(1788,y1);i>max(1582,y0);--i) speq[i-1-y0]=speq[i-y0]-(mty(i)-gyl(i))*24;
if (1582>=y0) if (1582<=y1) speq[1582-y0] -= 11*24;
for (int i=1582;i>y0;--i) speq[i-1-y0]=speq[i-y0]-(mty(i)-jyl(i))*24;
    
draw(graph(year,speq),rgb(3,.3,.3));
//draw(graph(year,speq),rgb(3,.3,.3),marker=marker(scale(circlescale)*unitcircle,rgb(.5,.5,.5),Fill));
xlimits(80,9020);
ylimits(-24*11,48);
xaxis(BottomTop,Ticks(Step=1000, step=500,pTick=lightgrey, ptick=lightgrey,extend=true));
yaxis(LeftRight,RightTicks(Step=48,step=6,pTick=lightgrey, ptick=lightgrey,extend=true,ticklabel=gg));

//LeftTicks(DefaultFormat, new real[] {6,10,12,14,16,18})

//fill((x0-xh,y0+yh)--(23h+x0+xh,y0+yh)--(23h+x0+xh,y0-nn1*h-yh)--(x0-xh,y0-nn1*h-yh)--cycle,white);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

//draw(shift(0,0)*sig,rgb(.8,.8,.8));








