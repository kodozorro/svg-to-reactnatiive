# svg-to-reactnative
Help with converting SVG files to React Native SVG components

## Instalation

```bash
npm install -g @kodozorro/svg-to-reactnative
```

## Usage

After installation, you can use the svg-to-rn command to convert SVG files to React Native compatible SVG components. Provide the path to the directory containing your SVG files as an argument:

```bash
svg-to-rn your/path/to/svg-icons
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

## Example

#### Before
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13L5 13C4.44771 13 4 12.5523 4 12C4 11.4477 4.44771 11 5 11L16.5858 11L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071Z" fill="#101828"/>
</svg>
```

#### After
```tsx
<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <Path fillRule="evenodd"
         clipRule="evenodd"
         d="M11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13L5 13C4.44771 13 4 12.5523 4 12C4 11.4477 4.44771 11 5 11L16.5858 11L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071Z"
         fill="#101828"
   />
</Svg>
```

### Tag and Attribute Conversion

The script performs the following conversions:

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

