export function linearInterpolation(start, end, count) {
  let start_long = start[0]
  let start_lat = start[1]
  let end_long = end[0]
  let end_lat = end[1]

  let denta_long = (end_long - start_long) / count
  let denta_lat = (end_lat - start_lat) / count

  let segments = []
  for (var i = 0; i < count + 1; i++) {
    let x = start_long + denta_long * i
    let y = start_lat + denta_lat * i
    let z = (50 * i) / 2000
    let ptr = [x, y, z]
    segments.push(ptr)
  }
  return segments
}

export function ziczacInterpolation(start, end, count) {
  let start_long = start[0]
  let start_lat = start[1]
  let end_long = end[0]
  let end_lat = end[1]

  let denta_long = (end_long - start_long) / count
  let denta_lat = (end_lat - start_lat) / count

  let segments = []
  for (var i = 0; i < count; i++) {
    let positive = i % 2 == 0 ? 1 : -1
    let denta = denta_long * positive
    let x = start_long + denta_long * i + denta
    let y = start_lat + denta_lat * i
    let z = (50 * i) / 2000
    let ptr = [x, y, z]

    segments.push(ptr)
  }
  return segments
}
