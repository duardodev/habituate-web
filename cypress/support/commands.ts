import { addClerkCommands } from '@clerk/testing/cypress';
addClerkCommands({ Cypress, cy });

export {};

let localStorageData: Record<string, string> = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    localStorageData[key] = localStorage.getItem(key) || '';
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(localStorageData).forEach(key => {
    localStorage.setItem(key, localStorageData[key]);
  });
});
