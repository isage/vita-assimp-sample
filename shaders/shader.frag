precision mediump float;
// Texture coords
varying vec2 uvIn;

// Material data
uniform vec3 diffuseColor;

// Texture data
uniform sampler2D diffuseTexture;

// Textures flags
uniform bool hasDiffuseTexture;

// Gamma correction

void main()
{
    vec3 gamma = vec3(1.0/2.0);
	
	// Material properties
	vec3 color;
	
	// Get diffuse color
	if(hasDiffuseTexture)
		color = pow(texture2D(diffuseTexture, uvIn).rgb, gamma);
	else
		color = diffuseColor;
		
	// Final color
	gl_FragColor = vec4(color, 1.0);
}