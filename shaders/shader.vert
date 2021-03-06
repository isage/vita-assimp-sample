// In/out variables
attribute vec3 vertex;
attribute vec2 uv;
varying vec2 uvIn;

// Model matrix
uniform mat4 model;

// Camera uniforms
uniform mat4 cameraProjection;
uniform mat4 cameraView;

// Changed calculations to be in tangent space
void main()
{
	// Calculate position using MVP
	gl_Position = cameraProjection * cameraView * model * vec4(vertex, 1.0);
	uvIn = uv;	
}