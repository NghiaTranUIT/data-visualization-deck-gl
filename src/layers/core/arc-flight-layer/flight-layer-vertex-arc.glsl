
#define SHADER_NAME trips-layer-vertex-shader

const float N = 49.0;

attribute vec3 positions;
attribute vec4 instanceSourceColors;
attribute vec4 instanceTargetColors;
attribute vec4 instancePositions;
attribute vec3 instancePickingColors;

uniform float opacity;
uniform float renderPickingBuffer;

varying vec4 vColor;

float paraboloid(vec2 source, vec2 target, float ratio) {

  vec2 x = mix(source, target, ratio);
  vec2 center = mix(source, target, 0.5);

  float dSourceCenter = distance(source, center);
  float dXCenter = distance(x, center);
  return (dSourceCenter + dXCenter) * (dSourceCenter - dXCenter);
}

void main(void) {
  vec2 source = preproject(instancePositions.xy);
  vec2 target = preproject(instancePositions.zw);

  float segmentRatio = smoothstep(0.0, 1.0, positions.x / N);

  float vertex_height = paraboloid(source, target, segmentRatio);
  if (vertex_height < 0.0) vertex_height = 0.0;
  vec3 p = vec3(
    // xy: linear interpolation of source & target
    mix(source, target, segmentRatio),
    // z: paraboloid interpolate of source & target
    sqrt(vertex_height)
  );

  gl_Position = project(vec4(p, 1.0));

  vec4 color = mix(instanceSourceColors, instanceTargetColors, segmentRatio) / 255.;

  vColor = mix(
    vec4(color.rgb, color.a * opacity),
    vec4(instancePickingColors / 255., 1.),
    renderPickingBuffer
  );
}
