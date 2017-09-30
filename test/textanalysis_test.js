const textanalysis = require("../src/textanalysis");

var testLangeweile = "Mir ist langweilig";
var testIssues = "!showIssues bitte";
var testPing = "zeig dich";

test('isBored funktioniert', () => {
	expect(()=> isBored(testLangeweile)).toBeTruthy();
});
test('wantsIssues funktioniert', () => {
	expect(()=> wantsIssues(testIssues)).toBeTruthy();
});
test('wantsLifesign funktioniert', () => {
	expect(()=> wantsLifesign(testPing)).toBeTruthy();
});
