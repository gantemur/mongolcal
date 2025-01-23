settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

import graph;

string gg(real y)
{
	int d=20+floor(y/24);
	int h=floor(y)%24;
	return format("3/%d",d)+" "+format("%0.2d:00",h);
}

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(400,200,IgnoreAspect);
defaultpen(fontsize(9pt));


//cd("/Users/gantumur/Dropbox/Sites/cal/images");
file in=input("equinox.txt");
//string header=in;
real[][] a=in.dimension(424,16);
a=transpose(a);
real[] year=a[0];
real[] speq=a[2];
for (int i=0;i<speq.length;++i) speq[i] += (a[1][i]-20)*24+a[3][i]/60;
    
draw(graph(year,speq),rgb(3,.3,.3),marker=marker(scale(circlescale)*unitcircle,rgb(.5,.5,.5),Fill));
xlimits(1775,2225);
ylimits(-12,48);
xaxis(BottomTop,Ticks(Step=100, step=50,pTick=lightgrey, ptick=lightgrey,extend=true));
yaxis(LeftRight,RightTicks(Step=6,step=6,pTick=lightgrey, ptick=lightgrey,extend=true,ticklabel=gg));

//LeftTicks(DefaultFormat, new real[] {6,10,12,14,16,18})

//fill((x0-xh,y0+yh)--(23h+x0+xh,y0+yh)--(23h+x0+xh,y0-nn1*h-yh)--(x0-xh,y0-nn1*h-yh)--cycle,white);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

//draw(shift(0,0)*sig,rgb(.8,.8,.8));








