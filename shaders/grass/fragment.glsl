uniform sampler2D uGrassGradient;
uniform float uGridSize;
uniform vec3 uLightDirection;  // Already normalized and points from light towards the scene.
uniform float uLightIntensity;

varying vec2 vUvGrid;
varying vec3 vTerrainPosition;

void main()
{   
    vec4 gradientColor = texture2D(uGrassGradient, vUvGrid);

    // Assume the normal slightly points to the camera for billboarded grass
    vec3 cameraFacingNormal = normalize(vTerrainPosition - cameraPosition);
    
    // Combine the camera-facing normal with the up direction.
    vec3 upDirection = vec3(0.0, 1.0, 0.0);
    vec3 blendedNormal = normalize(mix(upDirection, cameraFacingNormal, 0.0));  // 0.7 is a weight, adjust as needed

    // Calculate the dot product between the light direction and the blended normal
    float lightFactor = max(dot(uLightDirection, blendedNormal), 0.0);
    lightFactor *= uLightIntensity;

    // Ambient term
    float ambientFactor = 0.0;

    gl_FragColor = gradientColor * (lightFactor + ambientFactor);

}
