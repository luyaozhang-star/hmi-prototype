# 3D Models Directory

Place your 3D vehicle model files here.

## Supported Formats
- **GLB** (recommended) - Binary GLTF format, single file with embedded textures
- **GLTF** - JSON format, may require separate texture files

## File Naming
The component will look for: `vehicle.glb` or `vehicle.gltf`

You can also specify a custom path in the Vehicle3D component.

## Where to Get Models
- [Sketchfab](https://sketchfab.com) - Free and paid 3D models
- [Poly Haven](https://polyhaven.com/models) - Free CC0 models
- [TurboSquid](https://www.turbosquid.com) - Professional 3D models
- [CGTrader](https://www.cgtrader.com) - 3D marketplace

## Model Requirements
- Optimized for web (keep file size reasonable, < 10MB recommended)
- Properly scaled (1 unit = 1 meter is standard)
- Textures embedded or included
- Low poly count for better performance (< 50k triangles recommended)

## Example
Place your model file as:
```
/public/models/vehicle.glb
```

The component will automatically load it. If no model is found, it will display a fallback geometric car shape.

