const lucide = require('lucide-react');
const iconsToTest = [
  'Search', 'Replace', 'ReplaceAll', 'WrapText', 'AlignLeft', 'AlignJustify',
  'Code2', 'Code', 'Braces', 'FileCode2', 'FileCode', 'Save', 'Download',
  'FolderSync', 'History', 'RefreshCw'
];
console.log('Available icons in installed lucide-react:');
iconsToTest.forEach(icon => {
  console.log(`${icon}: ${typeof lucide[icon] !== 'undefined' ? 'YES' : 'NO'}`);
});
