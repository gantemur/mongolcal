settings.tex="pdflatex";
if(settings.render < 0) settings.render=4;
settings.toolbar=false;
viewportmargin=(2,2);

real x0=0, y0=0;
real xh=10, yh=5;
int nn=25, nn1=nn-1;
real r=.3, rr=.4;
real h=2, h2=h/2;
real a=40, b=32;
pen spring=rgb(0,0,.2);
pen summer=rgb(0,.15,0);
pen fall=rgb(.15,.15,0);
pen winter=rgb(.1,.1,.1);
pen spring=rgb(.93,.93,1);
pen summer=rgb(.8,1,.8);
pen fall=rgb(1,1,.8);
pen winter=rgb(.99,.99,.99);

path sig=(0,0)--(0,1)--(1,1)--(.5,1)--(.5,0);

size(10cm,15cm);

fill((x0-xh,y0+yh)--(23h+x0+xh,y0+yh)--(23h+x0+xh,y0-nn1*h-yh)--(x0-xh,y0-nn1*h-yh)--cycle,white);

//DefaultHead=HookHead;
DefaultHead=SimpleHead;

fill((x0-h2,y0+h2)--(x0+2h+h2,y0+h2)--(x0+2h+h2,y0-nn1*h-h2)--(x0-h2,y0-nn1*h-h2)--cycle,spring);
fill((x0+2h+h2,y0+h2)--(x0+5h+h2,y0+h2)--(x0+5h+h2,y0-nn1*h-h2)--(x0+2h+h2,y0-nn1*h-h2)--cycle,summer);
fill((x0+5h+h2,y0+h2)--(x0+8h+h2,y0+h2)--(x0+8h+h2,y0-nn1*h-h2)--(x0+5h+h2,y0-nn1*h-h2)--cycle,fall);
fill((x0+8h+h2,y0+h2)--(x0+11h+h2,y0+h2)--(x0+11h+h2,y0-nn1*h-h2)--(x0+8h+h2,y0-nn1*h-h2)--cycle,winter);
fill((x0+11h+h2,y0+h2)--(x0+14h+h2,y0+h2)--(x0+14h+h2,y0-nn1*h-h2)--(x0+11h+h2,y0-nn1*h-h2)--cycle,spring);
fill((x0+14h+h2,y0+h2)--(x0+17h+h2,y0+h2)--(x0+17h+h2,y0-nn1*h-h2)--(x0+14h+h2,y0-nn1*h-h2)--cycle,summer);
fill((x0+17h+h2,y0+h2)--(x0+20h+h2,y0+h2)--(x0+20h+h2,y0-nn1*h-h2)--(x0+17h+h2,y0-nn1*h-h2)--cycle,fall);
fill((x0+20h+h2,y0+h2)--(x0+23h+h2,y0+h2)--(x0+23h+h2,y0-nn1*h-h2)--(x0+20h+h2,y0-nn1*h-h2)--cycle,winter);

int m=0, s=32;
for (int i=0;i<nn;++i) for (int j=0;j<24;++j) {
	++m;
	if (m==s) {
		filldraw(circle((x0+j*h-rr,y0-i*h),r),purple,purple);
		draw(circle((x0+j*h+rr,y0-i*h),r),purple);		
		m=0;s=65-s;
		continue;
	}
	draw(circle((x0+j*h,y0-i*h),r),purple);
}

defaultpen(fontsize(6pt));
for (int i=0;i<nn;++i) {
	label(format("$%d$",1979+2i),(x0-h2-h,y0-i*h),rgb(.4,.4,.4));	
	label(format("$%d$",1980+2i),(x0+23h+h2+h,y0-i*h),rgb(.4,.4,.4));	
}


draw(shift(23h+x0+xh-1.4,y0-nn1*h-yh+.7)*sig,rgb(.8,.8,.8));










