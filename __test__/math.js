function checkNumber(n){
    return !(Number(n) >= Number.MAX_SAFE_INTEGER);
}
function sum(a, b){
    if(!checkNumber(a) || !checkNumber(b)){
        return Infinity;
    }
    return Number(a) + Number(b);
}

describe('test for sum', () => {
    test('add 4 to 8 to expect 12', () => {  // () => {} - unlimited time
        expect(sum(4, 8)).toBe(12)
    });
    
    test('add 4:str to 8:str to expect 12', () => {
        expect(sum('4', '8')).toBe(12)
    });
    
    test('add MAX_SAFE_INTEGER to MAX_SAFE_INTEGER to expect Infinity', () => {
        expect(sum(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(Infinity)
    });
    
    test('add 1.2 to 2.3 to expect 3.5', () => {
        expect(sum(1.2, 2.3)).toBe(3.5)
    });
    
    test('add 0.1 to 0.2 to expect 0.3', () => {
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3)
    });
});