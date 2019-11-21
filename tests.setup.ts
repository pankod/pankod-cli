import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const { red, bold, bgBlue } = chalk;

const isDirectory = (...target: string[]) => {
    return fs.lstatSync(path.resolve('', ...target)).isDirectory();
};

const readDirectory = (...target: string[]) => {
    return fs.readdirSync(path.resolve('', ...target));
};

const removeRecursively = (...target: string[]) => {
    const contents = readDirectory(...target);

    contents.forEach(content => {
        if (isDirectory(...target, content)) {
            removeRecursively(...target, content);
        } else {
            console.log(
                bgBlue(' TEST SETUP '),
                red(`Removing ${bold(path.join('', ...target, content))}`)
            );
            fs.unlinkSync(path.resolve(...target, content))
        }
    });

    console.log(bgBlue(' TEST SETUP '), red(`Removing ${bold(path.join('', ...target))}`));
    fs.rmdirSync(path.resolve(...target));
};

removeRecursively('./__temp__');
