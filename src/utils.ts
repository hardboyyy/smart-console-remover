export function removeConsoleLogs(code: string, action: string): string {
    let regex: RegExp;
    if(action === 'Remove'){
        regex = /console\.(log|warn|error|debug|info)\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\);?/gs;
        return code.replace(regex, '').replace(/^\s*[\r\n]/gm, '');
    } else if(action === 'Comment Out') {
        regex = /^(\s*)(console\.(log|warn|error|debug|info)\(.*)/gm;
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