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

int mb(int y, int m) 
{
	int[] mm={31,28,31,30,31,30,31,31,30,31,30,31};
	if (gyl(y)>365) mm[1]=29;
	int r=0;
	for (int i=0;i<m-1;++i) r+=mm[i];
	return r;
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

//cd("/Users/gantumur/Dropbox/Sites/cal/images");
file in=input("tsagansar.txt");
//string header=in;
int[][] a=in.dimension(2001,3);
a=transpose(a);
int[] year=a[0];
int[] month=a[1];
int[] day=a[2];
int[] dd;

for (int i=0;i<month.length;++i) dd.push(mb(year[i],month[i])+day[i]);

ymin=max(ymin,year[0]);
ymax=min(ymax,year[year.length-1]);
bool3[] c=array(ymin-year[0],false);
c.append(array(ymax-ymin+1,true));
c.append(array(year[year.length-1]-ymax,false));
//draw(graph(year,dd,c),rgb(1,.3,.3));
draw(graph(year,dd,c),rgb(1,.5,.5),marker=marker(scale(circlescale)*unitcircle,rgb(.5,.5,.5),Fill));
xlimits(ymin-5,ymax+5);
ylimits(20,65);
xaxis(BottomTop,Ticks(Step=100, step=10,pTick=lightgrey, ptick=lightgrey,extend=true));
yaxis(LeftRight,RightTicks(Step=10,step=5,pTick=lightgrey, ptick=lightgrey,extend=true,ticklabel=gg));

//fill((x0-xh,y0+yh)--(23h+x0+xh,y0+yh)--(23h+x0+xh,y0-nn1*h-yh)--(x0-xh,y0-nn1*h-yh)--cycle,white);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

//draw(shift(0,0)*sig,rgb(.8,.8,.8));








