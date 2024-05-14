# svg-to-reactnative
Help with converting SVG files to React Native SVG components

## Instalation

```bash
npm install svg-to-reactnative
```

## Usage

After installation, you can use the svg-to-rn command to convert SVG files to React Native compatible SVG components. Provide the path to the directory containing your SVG files as an argument:

```bash
svg-to-reactnative your/path/to/svg-icons
```

Replace path/to/svg-icons with the path to your directory containing SVG files.


## How it works 
The `svg-to-rn` command performs the following steps:

1. **Read Directory**: The script reads all files in the specified directory.
2. **File Type Check**: It checks each file to determine if it is an SVG (`.svg`) or TypeScript JSX (`.tsx`) file.
3. **Parse and Convert**:
    - **For SVG files**:
        - The script parses the SVG content into a JSON structure using `svgson`.
        - It then converts SVG tags and attributes into their React Native SVG equivalents.
        - The converted JSON is stringified back into a React Native component format.
    - **For TSX files**:
        - The script converts specific SVG attributes within the TSX content to React Native SVG attributes.
4. **Format**: The script formats the converted content using `prettier` to ensure consistent code style.
5. **Write Files**: The converted and formatted content is written back to files in the same directory, replacing the original files with `.js` for SVG files and maintaining `.tsx` for TSX files.

### Tag and Attribute Conversion

The script performs the following conversions:

**Tag Conversion:**
**Tag Conversion:**

| SVG Tag         | React Native SVG Tag |
| --------------- | --------------------- |
| `svg`           | `Svg`                 |
| `rect`          | `Rect`                |
| `circle`        | `Circle`              |
| `ellipse`       | `Ellipse`             |
| `line`          | `Line`                |
| `polyline`      | `Polyline`            |
| `polygon`       | `Polygon`             |
| `path`          | `Path`                |
| `text`          | `Text`                |
| `g`             | `G`                   |
| `defs`          | `Defs`                |
| `linearGradient`| `LinearGradient`      |
| `radialGradient`| `RadialGradient`      |
| `stop`          | `Stop`                |
| `clipPath`      | `ClipPath`            |
| `pattern`       | `Pattern`             |
| `mask`          | `Mask`                |
| `use`           | `Use`                 |
| `symbol`        | `Symbol`              |
| `marker`        | `Marker`              |



**Attribute Conversion:**

| SVG Attribute       | React Native SVG Attribute |
| ------------------- | --------------------------- |
| `stroke-width`      | `strokeWidth`               |
| `stroke-linecap`    | `strokeLinecap`             |
| `stroke-linejoin`   | `strokeLinejoin`            |
| `fill-rule`         | `fillRule`                  |
| `clip-rule`         | `clipRule`                  |
| `viewBox`           | `viewBox`                   |
| `preserveAspectRatio` | `preserveAspectRatio`     |
| `href`              | `href`                      |

