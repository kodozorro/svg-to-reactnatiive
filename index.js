#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { parse, stringify } = require('svgson');

// Получение аргументов командной строки
const args = process.argv.slice(2);
const sourceDir = path.resolve(process.cwd(), args[0]); // Абсолютный путь к исходной директории
const outputDir = sourceDir; // Абсолютный путь к директории для сохранения преобразованных файлов

if (!fs.existsSync(sourceDir)) {
    console.error('Указанная директория не существует:', sourceDir);
    process.exit(1);
}

fs.readdir(sourceDir, async (err, files) => {
    if (err) {
        console.error('Ошибка при чтении директории:', err);
        return;
    }

    for (const file of files) {
        const extname = path.extname(file);
        if (extname === '.svg' || extname === '.tsx') {
            const filePath = path.join(sourceDir, file);
            try {
                const data = await fs.promises.readFile(filePath, 'utf-8');

                let processedData;

                if (extname === '.svg') {
                    const json = await parse(data);
                    const convertedJson = convertSvgToReactNative(json);
                    processedData = stringifyReactNativeSvg(convertedJson);
                } else if (extname === '.tsx') {
                    processedData = convertTsxAttributes(data);
                }

                const formattedData = await prettier.format(processedData, {
                    parser: extname === '.svg' ? 'babel' : 'typescript',
                });

                const outputFilePath = path.join(
                    outputDir,
                    file.replace('.svg', '.js').replace('.tsx', '.tsx'),
                );
                await fs.promises.writeFile(outputFilePath, formattedData);
                console.log(`Файл успешно преобразован: ${outputFilePath}`);
            } catch (err) {
                console.error(`Ошибка при обработке файла ${file}:`, err);
            }
        }
    }
});

function convertSvgToReactNative(json) {
    json.name = convertTagName(json.name);
    if (json.attributes) {
        json.attributes = convertAttributes(json.attributes);
    }
    if (json.children) {
        json.children = json.children.map(convertSvgToReactNative);
    }
    return json;
}

function convertTagName(tag) {
    switch (tag) {
        case 'svg':
            return 'Svg';
        case 'rect':
            return 'Rect';
        case 'circle':
            return 'Circle';
        case 'ellipse':
            return 'Ellipse';
        case 'line':
            return 'Line';
        case 'polyline':
            return 'Polyline';
        case 'polygon':
            return 'Polygon';
        case 'path':
            return 'Path';
        case 'text':
            return 'Text';
        case 'g':
            return 'G';
        case 'defs':
            return 'Defs';
        case 'linearGradient':
            return 'LinearGradient';
        case 'radialGradient':
            return 'RadialGradient';
        case 'stop':
            return 'Stop';
        case 'clipPath':
            return 'ClipPath';
        case 'pattern':
            return 'Pattern';
        case 'mask':
            return 'Mask';
        case 'use':
            return 'Use';
        case 'symbol':
            return 'Symbol';
        case 'marker':
            return 'Marker';
        // Добавьте остальные преобразования тегов по необходимости
        default:
            return tag;
    }
}

function convertAttributes(attributes) {
    const converted = {};
    for (const key in attributes) {
        converted[convertAttributeName(key)] = attributes[key];
    }
    return converted;
}

function convertAttributeName(attribute) {
    switch (attribute) {
        case 'stroke-width':
            return 'strokeWidth';
        case 'stroke-linecap':
            return 'strokeLinecap';
        case 'stroke-linejoin':
            return 'strokeLinejoin';
        case 'fill-rule':
            return 'fillRule';
        case 'clip-rule':
            return 'clipRule';
        case 'viewBox':
            return 'viewBox';
        case 'preserveAspectRatio':
            return 'preserveAspectRatio';
        case 'href':
            return 'href';
        // Добавьте остальные преобразования атрибутов по необходимости
        default:
            return attribute;
    }
}

function convertTsxAttributes(data) {
    const attributeMap = {
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
        'fill-rule': 'fillRule',
        'clip-rule': 'clipRule',
        'viewBox': 'viewBox',
        'preserveAspectRatio': 'preserveAspectRatio',
        'href': 'href',
        // Добавьте остальные преобразования атрибутов по необходимости
    };

    return data.replace(
        /(\b(?:stroke-width|stroke-linecap|stroke-linejoin|fill-rule|clip-rule|viewBox|preserveAspectRatio|href)\b)/g,
        match => attributeMap[match] || match,
    );
}

function stringifyReactNativeSvg(json) {
    let result = `<${json.name}`;
    if (json.attributes) {
        for (const key in json.attributes) {
            result += ` ${key}="${json.attributes[key]}"`;
        }
    }
    result += '>';
    if (json.children) {
        result += json.children.map(stringifyReactNativeSvg).join('');
    }
    result += `</${json.name}>`;
    return result;
}
