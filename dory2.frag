#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct, float dif1, float dif2){
  return  smoothstep( pct+dif1, pct-dif2/10.0, st.y) -
          smoothstep( pct, pct+dif2, st.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
    float y = smoothstep(0.1,0.9,st.x);
    y+=(fract(0.1)-0.05)*sin(fract(PI)*u_time/PI)*sin(u_time/PI)/cos(u_time/PI);
    // y+=0.05*sin(fract(PI)*u_time/PI)*sin(u_time/PI)/cos(u_time/PI);

    vec3 color = vec3(y);
    float pct = plot(st,y,1.0,1.0);
    float pct1 = plot(st,-y,1.0,1.0);
    float pct2 = plot(st,y,0.6*pct,-0.8*pct1);
    // float pct2 = plot(st,y,-pct,-pct1);
    // float pct3 = plot(st,y,+0.42,-0.2);
    float pct3 = plot(st,y,+0.4*pct2,0.1*pct2);
	float pct4 = plot(st,pct,0.5*pct2,-0.5*pct3);	
    float pct5 = plot(st,pct3,1.5*pct3,10.0*pct2);	

    // color = (pct1)*color+pct*vec3(0.0,0.0,.5*sin(2.0*u_time/PI));
    // color+= pct2*vec3(0.0,.2*sin(2.0*u_time/PI),.2*cos(2.0*u_time/PI));
    // color+= pct3*vec3(0.0,0.0,0.2);
    // color+= pct4*vec3(0.0,0.1,0.3);
    // color+= pct5*vec3(0.0,0.1,0.2);
    // color+= pct3*pct4*vec3(0.0,sin(pct3*PI),sin(pct3*PI));
    // color+= pct5*pct4*vec3(0.0,sin(u_time/PI),sin(pct2*PI));
    // color+= pct5*pct3*vec3(0.0,sin(pct1*PI),sin(u_time/PI));

    color = (pct1)*color+pct*vec3(.5*sin(2.0*u_time/PI),.5*sin(2.0*u_time/PI),.5*sin(2.0*u_time/PI));
    color+= pct2*vec3(.2*cos(2.0*u_time/PI),.2*cos(2.0*u_time/PI),.1*cos(1.0*u_time/PI));
    color+= pct3*vec3(0.2,0.2,0.1);
	color+= pct4*vec3(.2,.2,.4);
    // color+= pct4*vec3(.4*sin(u_time/PI),.4*sin(u_time/PI),.6*cos(u_time/PI));
    color+= pct5*vec3(sin(u_time/PI),sin(u_time/PI),sin(u_time/PI));
    color+= pct3*pct4*vec3(sin(pct3*PI),sin(pct3*PI),sin(pct3*PI));
    // color+= pct5*pct4*vec3(sin(u_time/PI),sin(u_time/PI),sin(u_time/PI));
    // color+= pct5*pct3*vec3(sin(u_time/PI),sin(u_time/PI),sin(u_time/PI));
    color+= pct5*pct4*vec3(sin(pct2*PI),sin(pct2*PI),sin(pct1*PI));
    color+= pct5*pct3*vec3(sin(pct1*PI),sin(pct1*PI),sin(pct2*PI));

    // color = (pct)*color+pct*vec3(0.0,cos(u_time/2.0),sin(u_time));
    gl_FragColor = vec4(color,1.0);
}
