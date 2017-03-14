
#define SHADER_NAME trips-layer-vertex-shader

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
  vec2 source = preproject(instanceSourcePositions.xy);
  vec2 target = preproject(instanceTargetPositions.xy);

  float segmentRatio = smoothstep(0.0, 1.0, positions.x / N);

  float vertex_height = paraboloid(source, target, segmentRatio);
  if (vertex_height < 0.0) vertex_height = 0.0;
  vec3 p = vec3(
    // xy: linear interpolation of source & target
    mix(source, target, segmentRatio),
    // z: paraboloid interpolate of source & target
    sqrt(vertex_height)
  );

  // the magic de-flickering factor
  float _timestamp = (positions.x * 25.0) / 2000.0;
  vec4 shift = vec4(0., 0., mod(_timestamp, trailLength) * 1e-4, 0.);
  gl_Position = project(vec4(p, 1.0)) + shift;

  // Color
  vColor = mix(instanceSourceColors, instanceTargetColors, segmentRatio) / 255.;
  vTime = 1.0 - (currentTime - _timestamp) / trailLength;
  //vTime = 0.9;
}
