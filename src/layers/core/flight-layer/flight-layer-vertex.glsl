
#define SHADER_NAME flight-layer-vertex-shader

const float N = 49.0;

attribute vec3 positions;
attribute vec4 instanceSourceColors;
attribute vec4 instanceTargetColors;
attribute vec3 instanceSourcePositions;
attribute vec3 instanceTargetPositions;
attribute vec3 instancePickingColors;

uniform float opacity;
uniform float renderPickingBuffer;
uniform float currentTime;
uniform float trailLength;
uniform float timestamp;

varying float vTime;
varying vec4 vColor;

float paraboloid(vec2 source, vec2 target, float ratio) {

  vec2 x = mix(source, target, ratio);
  vec2 center = mix(source, target, 0.5);

  float dSourceCenter = distance(source, center);
  float dXCenter = distance(x, center);
  return (dSourceCenter + dXCenter) * (dSourceCenter - dXCenter);
}

void main(void) {
  gl_Position = vec4(instanceSourcePositions, 1.0)

  // Implement here

}
