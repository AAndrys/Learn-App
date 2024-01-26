const fragmentShader = `
  precision mediump float;

  varying float vElevation;
  // varying vec2 vCursor;

  void main() {
    // vec2 um = vCursor.xy;

    vec4 rgba = vec4(0.5, 0.5, 1.0, 1.0);
    rgba *= vElevation * 0.2 + 0.7;

    gl_FragColor = rgba;
  }
`;

export default fragmentShader;
