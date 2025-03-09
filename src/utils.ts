export function removeConsoleLogs(code: string, action: string, loggerPattern: string): string {
    let regex: RegExp;
    if(action === 'Remove'){
        regex = new RegExp(`(${loggerPattern})\\.(log|warn|error|debug|info)\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\);?`, 'gs');
        return code.replace(regex, '').replace(/^\s*[\r\n]/gm, '');
    } else if(action === 'Comment Out') {
        regex = new RegExp(`(${loggerPattern})\\.(log|warn|error|debug|info)\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\);?`, 'gs');
        return code.replace(regex, match => {
            // Comment out each line of the matched block
            return match.split('\n').map(line => `// ${line}`).join('\n');
        });
    } else if(action === 'Uncomment') {
        regex = new RegExp(`^\\s*//\\s*(${loggerPattern})\\.(log|warn|error|debug|info)\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\);?`, 'gm');
        return code.replace(regex, match => {
            // Uncomment by removing "// " or "//"
            return match.replace(/^\s*\/\/\s*/, '');
        });
    }
    return code;
}