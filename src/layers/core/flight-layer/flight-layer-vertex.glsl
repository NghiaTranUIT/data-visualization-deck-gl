#define SHADER_NAME trips-layer-vertex-shader

attribute vec3 positions;
attribute vec3 colors;

uniform float opacity;
uniform float currentTime;
uniform float trailLength;

varying float vTime;
varying vec4 vColor;

void main(void) {
  vec2 p = preproject(positions.xy);
  gl_Position = project(vec4(p, 1., 1.));

  vColor = vec4(colors / 255.0, opacity);
  vTime = 1.0 - (currentTime - positions.z) / trailLength;
}
