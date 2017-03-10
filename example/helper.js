export function processHexagons(hexagons) {
  const values = hexagons.map(hexagon => Number(hexagon.value));
  const maxValue = Math.max(...values);

  const data = hexagons.map(hexagon => ({
    centroid: [
      hexagon['centroid.x'],
      hexagon['centroid.y']
    ],
    vertices: [
      [Number(hexagon['v0.x']), Number(hexagon['v0.y'])],
      [Number(hexagon['v1.x']), Number(hexagon['v1.y'])],
      [Number(hexagon['v2.x']), Number(hexagon['v2.y'])],
      [Number(hexagon['v3.x']), Number(hexagon['v3.y'])],
      [Number(hexagon['v4.x']), Number(hexagon['v4.y'])],
      [Number(hexagon['v5.x']), Number(hexagon['v5.y'])]
    ],
    color: [
      Number(hexagon.value) / maxValue * 255,
      Number(hexagon.value) / maxValue * 128,
      Number(hexagon.value) / maxValue * 64
    ],
    elevation: Number(hexagon.value) / maxValue

  }));
  return data;
}

export function pointsToArcs(points) {
  return points.map((point, i) => {
    if (i === points.length - 1) {
      return {
        sourcePosition: [0, 0],
        targetPosition: [0, 0],
        color: [35, 81, 128]
      };
    }

    const source = point;
    const target = points[i + 1];

    return {
      sourcePosition: source.position,
      targetPosition: target.position,
      color: [
        i % 255,
        255 - i % 255,
        Math.floor(i / 255) % 255,
        255
      ]
    };
  });
}

export function pointsToLines(points) {
  return points.map((point, i) => {
    if (i === points.length - 1) {
      return {
        sourcePosition: [0, 0, 0],
        targetPosition: [0, 0, 0],
        color: [35, 81, 128]
      };
    }

    const source = point;
    const target = points[i + 1];

    return {
      sourcePosition: [
        source.position[0],
        source.position[1],
        Math.random() * 1000
      ],
      targetPosition: [
        target.position[0],
        target.position[1],
        Math.random() * 1000
      ],
      color: [0, 0, 255]
    };
  });
}
