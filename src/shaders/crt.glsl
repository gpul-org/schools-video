#version 300 es
precision highp float;

#include "@motion-canvas/core/shaders/common.glsl"

float density = .4;
float opacityScanline = .1;
float opacityNoise = .2;

vec4 scanlines(in vec2 uv)
{
    vec3 col = texture(sourceTexture,uv).rgb;

    float count = resolution.y * density;
    vec2 sl = vec2(sin(uv.y * count), cos(uv.y * count));
    vec3 scanlines = vec3(sl.x, sl.y, sl.x);

    col += col * scanlines * opacityScanline;
    col += col * vec3(uv, 1. * sin(time)) * opacityNoise;

    return vec4(col,1.0);
}

void main()
{
    float zoom = .1;
    vec2 uv = sourceUV.xy * (1. + zoom) - vec2(zoom / 2.);

    float strength = sin(2.0) * 0.02;
    float aspectRatio = resolution.x / resolution.y;
    float intensity = strength * aspectRatio;

    vec2 coords = uv;
    coords = (coords - 0.5) * 2.0;

    vec2 realCoordOffs;
    realCoordOffs.x = (1.0 - coords.y * coords.y) * intensity * coords.x; 
    realCoordOffs.y = (1.0 - coords.x * coords.x) * intensity * coords.y;

    outColor =
        texture(sourceTexture, uv - realCoordOffs) * .5 +
        scanlines(uv - realCoordOffs) * .5;
}
