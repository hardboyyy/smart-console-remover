export function removeConsoleLogs(code: string, action: string, loggerPattern: string): string {
    let regex: RegExp;
    console.log("logger pattern", loggerPattern);
    if(action === 'Remove'){
        regex = new RegExp(`(${loggerPattern})\\.(log|warn|error|debug|info)\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\);?`, 'gs');
        // regex = new RegExp(`(${loggerPattern})\\.(log|warn|error|debug|info)\\(.*?\\);?`, 'gs');
    console.log("logger regex", regex);
    const matches = code.match(regex);
    console.log("Found matches:", matches);
        return code.replace(regex, '').replace(/^\s*[\r\n]/gm, '');
    } else if(action === 'Comment Out') {
        regex = new RegExp(/^(\s*)(console\.(log|warn|error|debug|info)\(.*)/gm);
        return code.replace(regex, '$1// $2');
    } else if(action === 'Uncomment') {
        regex = /^(\s*)\/\/\s*(console\.(log|warn|error|debug|info)\(.*)/gm;
        return code.replace(regex, '$1$2');
    }
    return code;
}

export const languageIds: string[] = [
    'javascript',
    'typescript',
];