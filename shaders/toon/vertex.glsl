#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>



// /geo1/MAT/meshToonBuilder_BODY/skinning1

struct SkinningData_1993 {
	vec3 position;
	vec3 normal;
	vec3 tangent;
};
SkinningData_1993 computeSkinningData_1993(vec3 inputPos, vec3 inputNormal, vec4 skinIndex){
SkinningData_1993 skinningOut;
#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif
#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4(inputPos, 1.0);
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	skinningOut.position = ( bindMatrixInverse * skinned ).xyz;
#endif
#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	skinningOut.normal = vec4( skinMatrix * vec4(inputNormal, 0.0) ).xyz;
	#ifdef USE_TANGENT
		skinningOut.tangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif
return skinningOut;
}

// /geo1/MAT/meshToonBuilder_BODY/fresnel1
float fresnel(vec4 worldPosition, vec3 worldNormal, vec3 cameraPosition){
	return dot(
		normalize(worldNormal),
		normalize(cameraPosition - worldPosition.xyz)
	);
}







// /geo1/MAT/meshToonBuilder_BODY/globals1
varying vec3 v_POLY_globals1_cameraPosition;
varying mat4 v_POLY_globals1_modelMatrix;
varying vec3 v_POLY_globals1_position;
varying vec3 v_POLY_globals1_normal;

// /geo1/MAT/meshToonBuilder_BODY/globals2
varying vec2 v_POLY_globals2_uv;

// /geo1/MAT/meshToonBuilder_BODY/varyingWrite4
varying float fresnelVarying;




#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>



	// /geo1/MAT/meshToonBuilder_BODY/globals1
	v_POLY_globals1_cameraPosition = vec3(cameraPosition);
	v_POLY_globals1_modelMatrix = mat4(modelMatrix);
	v_POLY_globals1_position = vec3(position);
	v_POLY_globals1_normal = vec3(normal);
	
	// /geo1/MAT/meshToonBuilder_BODY/globals2
	v_POLY_globals2_uv = vec2(uv);
	
	// /geo1/MAT/meshToonBuilder_BODY/skinning1
	#ifdef USE_SKINNING
	SkinningData_1993 v_POLY_skinning1_out = computeSkinningData_1993(v_POLY_globals1_position, v_POLY_globals1_normal, skinIndex);
	vec3 v_POLY_skinning1_position = v_POLY_skinning1_out.position;
	vec3 v_POLY_skinning1_normal = v_POLY_skinning1_out.normal;
	vec3 v_POLY_skinning1_tangent = v_POLY_skinning1_out.tangent;
	#else
	vec3 v_POLY_skinning1_position = v_POLY_globals1_position;
	vec3 v_POLY_skinning1_normal = v_POLY_globals1_normal;
	vec3 v_POLY_skinning1_tangent = vec3(0.);
	#endif
	
	// /geo1/MAT/meshToonBuilder_BODY/vec3ToVec4_1
	vec4 v_POLY_vec3ToVec4_1_vec4 = vec4(v_POLY_skinning1_position.xyz, 1.0);
	
	// /geo1/MAT/meshToonBuilder_BODY/normalToWorld1
	vec3 v_POLY_normalToWorld1_worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * v_POLY_skinning1_normal );
	
	// /geo1/MAT/meshToonBuilder_BODY/multVectorMatrix1
	vec4 v_POLY_multVectorMatrix1_vec4 = v_POLY_globals1_modelMatrix * v_POLY_vec3ToVec4_1_vec4;
	
	// /geo1/MAT/meshToonBuilder_BODY/fresnel1
	float v_POLY_fresnel1_fresnel = fresnel(v_POLY_multVectorMatrix1_vec4,v_POLY_normalToWorld1_worldNormal,v_POLY_globals1_cameraPosition);
	
	// /geo1/MAT/meshToonBuilder_BODY/varyingWrite4
	fresnelVarying = v_POLY_fresnel1_fresnel;
	
	// /geo1/MAT/meshToonBuilder_BODY/output1
	vec3 transformed = position;
	vec3 objectNormal = normal;
	#ifdef USE_TANGENT
		vec3 objectTangent = vec3( tangent.xyz );
	#endif



	#include <morphcolor_vertex>
// removed:
//	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
// removed:
//	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}