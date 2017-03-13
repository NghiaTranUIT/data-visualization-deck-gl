#define SHADER_NAME trips-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying float vTime;
varying vec4 vColor;

void main(void) {
  if (vTime > 1.0 || vTime < 0.0) {
    discard;
  }
  gl_FragColor = vec4(vColor.rgb, vColor.a * vTime);
}
