#define SHADER_NAME flight-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

varying float vTime;
varying vec4 vColor;

void main(void) {
  gl_FragColor = vec4(vColor.rgb, 1);

  // Implement here
}
