export function removeConsoleLogs(code: string, type: string): string {
    const regex = type === 'All'
        ? /console\.(log|warn|error|debug|info)\([\s\S]*?\)\s*;?/g
        : new RegExp(`console\\.${type.split('.')[1]}\\([\\s\\S]*?\\)\\s*;?`, 'g');

    return code.replace(regex, '').replace(/^\s*[\r\n]/gm, '');
};