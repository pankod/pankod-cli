// !
// ! THIS IS GLOBAL SETUP & TEARDOWN
// !
// ! Runs before and after all tests
// !

import { cleanUp } from './tests.utils';

export default async (): Promise<void> => {
    cleanUp();
};
