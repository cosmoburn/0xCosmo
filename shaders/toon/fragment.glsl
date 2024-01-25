#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>



// /geo2/MAT/meshToonBuilder_BODY/texture1
uniform sampler2D v_POLY_texture_textureMap;

// /geo2/MAT/meshToonBuilder_BODY/globals2
varying vec2 v_POLY_globals2_uv;

// /geo2/MAT/meshToonBuilder_BODY/varyingRead4
varying float fresnelVarying;




#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );



	// /geo2/MAT/meshToonBuilder_BODY/constant2
	vec3 v_POLY_constant2_val = vec3(0.057805430183792694, 0.010329823026364548, 0.11697066774917994);
	
	// /geo2/MAT/meshToonBuilder_BODY/constant3
	vec3 v_POLY_constant3_val = vec3(0.7454042095350284, 0.6375968739867731, 0.7454042095350284);
	
	// /geo2/MAT/meshToonBuilder_BODY/constant_outline_mid1
	float v_POLY_constant_outline_mid1_val = 0.0;
	
	// /geo2/MAT/meshToonBuilder_BODY/constant_outline_width1
	float v_POLY_constant_outline_width1_val = 0.18;
	
	// /geo2/MAT/meshToonBuilder_BODY/varyingRead4
	float v_POLY_varyingRead4_fragment = fresnelVarying;
	
	// /geo2/MAT/meshToonBuilder_BODY/constant1
	vec3 v_POLY_constant1_val = vec3(1.0, 1.0, 1.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/constant_outline_mid
	float v_POLY_constant_outline_mid_val = 0.5;
	
	// /geo2/MAT/meshToonBuilder_BODY/constant_outline_width
	float v_POLY_constant_outline_width_val = 0.0;
	
	// /geo2/MAT/meshToonBuilder_BODY/texture1
	vec4 v_POLY_texture1_rgba = texture2D(v_POLY_texture_textureMap, v_POLY_globals2_uv);
	
	// /geo2/MAT/meshToonBuilder_BODY/multScalar1
	vec3 v_POLY_multScalar1_val = (7.0*v_POLY_constant3_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/multAdd3
	float v_POLY_multAdd3_val = (0.5*(v_POLY_constant_outline_width1_val + 0.0)) + 0.0;
	
	// /geo2/MAT/meshToonBuilder_BODY/clamp1
	float v_POLY_clamp1_val = clamp(v_POLY_varyingRead4_fragment, 0.0, 1.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/multScalar2
	vec3 v_POLY_multScalar2_val = (2.0*v_POLY_constant1_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/multAdd1
	float v_POLY_multAdd1_val = (0.5*(v_POLY_constant_outline_width_val + 0.0)) + 0.0;
	
	// /geo2/MAT/meshToonBuilder_BODY/vec4ToVec3_1
	vec3 v_POLY_vec4ToVec3_1_vec3 = v_POLY_texture1_rgba.xyz;
	
	// /geo2/MAT/meshToonBuilder_BODY/subtract2
	float v_POLY_subtract2_subtract = (v_POLY_constant_outline_mid1_val - v_POLY_multAdd3_val - 0.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/add2
	float v_POLY_add2_sum = (v_POLY_constant_outline_mid1_val + v_POLY_multAdd3_val + 0.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/null1
	float v_POLY_null1_val = v_POLY_clamp1_val;
	
	// /geo2/MAT/meshToonBuilder_BODY/subtract1
	float v_POLY_subtract1_subtract = (v_POLY_constant_outline_mid_val - v_POLY_multAdd1_val - 0.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/add1
	float v_POLY_add1_sum = (v_POLY_constant_outline_mid_val + v_POLY_multAdd1_val + 0.0);
	
	// /geo2/MAT/meshToonBuilder_BODY/smoothstep3
	float v_POLY_smoothstep3_val = smoothstep(v_POLY_subtract2_subtract, v_POLY_add2_sum, v_POLY_null1_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/smoothstep2
	float v_POLY_smoothstep2_val = smoothstep(v_POLY_subtract1_subtract, v_POLY_add1_sum, v_POLY_null1_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/mix2
	vec3 v_POLY_mix2_mix = mix(v_POLY_constant2_val, v_POLY_multScalar1_val, v_POLY_smoothstep3_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/mix1
	vec3 v_POLY_mix1_mix = mix(v_POLY_mix2_mix, v_POLY_multScalar2_val, v_POLY_smoothstep2_val);
	
	// /geo2/MAT/meshToonBuilder_BODY/mult1
	vec3 v_POLY_mult1_product = (v_POLY_vec4ToVec3_1_vec3 * v_POLY_mix1_mix * vec3(1.0, 1.0, 1.0));
	
	// /geo2/MAT/meshToonBuilder_BODY/output1
	diffuseColor.xyz = v_POLY_mult1_product;



	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}