attribute vec3 terrainPosition;

uniform float uTime;
uniform sampler2D uNoiseTexture;   // The texture for the noise
uniform float uGridSize;           // The size of the grass grid

uniform vec2 uWindDirection;   // Direction of the wind
uniform float uWindPower;      // Strength of the wind (how far it pushes the grass tip)
uniform float uWindSpeed;      // How fast the wind moves across the field
uniform vec2 uWindCenter;      // Central position of the wind area in world space
uniform float uWindArea;       // Width of the wind area in world space



varying vec3 vTerrainPosition;
varying vec2 vUvGrid;
varying float vNoiseValue;
varying float vUtime;

void main() 
{
    vUtime = uTime;
    // Determine the center of the blade using the terrain position
    vec3 bladeCenter = vec3(terrainPosition.x, terrainPosition.y, terrainPosition.z);

    // Calculate the normalized direction vector from the grass blade's center to the camera
    vec3 toCamera = normalize(cameraPosition - bladeCenter);

    // Construct the rotation matrix for billboarding:
    // 1. The 'right' vector is the cross product of the world up direction and the direction to the camera
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCamera));
    // 2. The 'up' vector is the cross product of the direction to the camera and the 'right' vector
    vec3 up = cross(toCamera, right);

    // 3. Construct matrix from 'right' & up 'vectors'
    mat3 rotationMatrix = mat3(right, up, toCamera);

    // Rotate the local grass blade position using the rotation matrix
    vec3 rotatedPosition = rotationMatrix * position;

    // Offset the rotated position by the blade's center in the world
    vec3 finalPosition = rotatedPosition + bladeCenter;

    // Add noise-based height variation
    float textureScale = 1.0; // Adjust this for noise frequency
    vec2 uvGrid = (terrainPosition.xz + vec2(uGridSize * 0.5, uGridSize * 0.5)) * (1.0 / uGridSize) * textureScale;
    
    float noiseValue = texture2D(uNoiseTexture, uvGrid * .5).r;
    float heightAmplification = 0.35; // Increase or decrease this value to control height variation
    if (position.y > 0.025)
        finalPosition.y += noiseValue * heightAmplification;

    // WIND LOGIC
    vec2 updatedWindCenter = uWindCenter + uTime * uWindSpeed * uWindDirection;
    updatedWindCenter.x = mod(updatedWindCenter.x, uGridSize + 2.0 * uWindArea) - uWindArea * 2.0;

    // Calculate distance to wind center
    float distanceToWindCenter = length(terrainPosition.xz - updatedWindCenter);

    // Determine if inside wind area - this is now just a check for optimization purposes
    bool isWithinWindRange = distanceToWindCenter <= uWindArea;

    // Calculate wind intensity based on distance to the wind center
    float windIntensity = isWithinWindRange ? (1.0 - clamp(distanceToWindCenter / (uWindArea * 0.5), 0.0, 1.0)) : 0.0;

    vec3 windOffset = vec3(0.0);

    if(position.y > 0.015 && windIntensity > 0.0) {
        windOffset.x = uWindDirection.x * uWindPower * windIntensity;
        windOffset.z = uWindDirection.y * uWindPower * windIntensity;
    }

    vec3 finalPositionWithWind = finalPosition + windOffset;

    // Add a small amount of random movement to every blade of grass, especially to the tip
    float randomSeed = fract(sin(dot(terrainPosition.xz, vec2(12.9898, 78.233))) * 43758.5453);
    float randomMovement = sin(uTime + randomSeed * 10.0) * 0.5; // Adjust 0.05 for intensity

    if(position.y > 0.015) {
        finalPositionWithWind.x += randomMovement * position.y; // Amplify the randomness at the tip
        finalPositionWithWind.z += randomMovement * position.y; // Amplify the randomness at the tip
    }


    // FINAL RENDER
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPositionWithWind, 1.0);


    // PASS VARS TO FRAGMENT SHADER
    vTerrainPosition = terrainPosition;
    vUvGrid = uvGrid;
    vNoiseValue = noiseValue;

}
