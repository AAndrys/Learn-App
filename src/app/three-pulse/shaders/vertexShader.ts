const vertexShader = `
  // uniform mat4 projectionMatrix;
  // uniform mat4 viewMatrix;
  // uniform mat4 modelMatrix;

  // attribute vec3 position;

  uniform float time;
  uniform float uFrequency;

  uniform vec2 uCursor;

  // varying vec2 uv;

  varying float vElevation;
  varying vec2 vCursor;

  #define PI 3.14159265359
  #define T (time*25.)

  void main() {
    // float z = sin(abs(position.x) + abs(position.y) + time * -1.0);


    vec2 um = uCursor.xy;

    vec4 vector = vec4(position.x, position.y , position.z, 1.0);

    // vec4 modelPosition = modelMatrix * vector + vector + vector;
    vec4 modelPosition = modelMatrix * vector;
    float elevation = sin(length(vec4(modelPosition.x + um.x, modelPosition.y, modelPosition.z + um.y, 1.0)) - time);

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vElevation = elevation;
    // vCursor = uCursor;
  }
`;

export default vertexShader;
